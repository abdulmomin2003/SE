// server/controllers/bookingController.js
const Booking = require("../models/Booking");
const Facility = require("../models/Facility");
const { sendEmail } = require("../utils/email");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { facilityId, bookingDate, timeSlot } = req.body;
    const userId = req.user.userId; // Assumes auth middleware sets req.user.userId
    const userEmail = req.user.email; // Assumes req.user.email is set for all users

    // Check if facility exists
    const facility = await Facility.findById(facilityId);
    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }

    // Validate bookingDate
    const date = new Date(bookingDate);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: "Invalid booking date" });
    }

    // Check if the requested time slot is already booked
    const existingBooking = await Booking.findOne({
      facility: facilityId,
      bookingDate: date,
      timeSlot: timeSlot,
      status: "booked",
    });
    if (existingBooking) {
      return res.status(400).json({
        message: "Time slot already booked. Please select another slot.",
      });
    }

    // Create new booking
    const booking = new Booking({
      user: userId,
      facility: facilityId,
      bookingDate: date,
      timeSlot,
      status: "booked",
    });
    await booking.save();

    // Send booking confirmation email to the user who made the booking
    if (userEmail) {
      const mailOptions = {
        to: userEmail,
        subject: "Facility Booked",
        text: `Dear user,

Your booking for facility "${
          facility.name
        }" on ${date.toLocaleDateString()} at ${timeSlot} has been booked. Pending the owner's approval.

Thank you for using our service!

Best regards,
Sports Space Booking Team`,
        html: `<p>Dear user,</p>
<p>Your booking for facility "<strong>${
          facility.name
        }</strong>" on <strong>${date.toLocaleDateString()}</strong> at <strong>${timeSlot}</strong> has been booked.Pending the owner's approval</p>
<p>Thank you for using our service!</p>
<p>Best regards,<br/>Sports Space Booking Team</p>`,
      };
      try {
        await sendEmail(mailOptions);
        console.log("Booking confirmation email sent to", userEmail);
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
      }
    }

    res.status(201).json({ message: "Booking confirmed!", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch bookings for the logged-in user
exports.getUserBookings = async (req, res) => {
  try {
    const user = req.user.userId;
    const bookings = await Booking.find({ user }).populate("facility");
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update booking status (for owner/admin use)
exports.updateBookingStatus = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Generate time slots (9 AM - 9 PM, 1-hour each)
function generateTimeSlots() {
  const slots = [];
  for (let hour = 9; hour < 21; hour++) {
    const start = `${hour.toString().padStart(2, "0")}:00`;
    const end = `${(hour + 1).toString().padStart(2, "0")}:00`;
    slots.push(`${start} - ${end}`);
  }
  return slots;
}

// Get available time slots for a facility on a given date
const getAvailableTimeSlots = async (req, res) => {
  try {
    const { facilityId, bookingDate } = req.query;
    if (!facilityId || !bookingDate) {
      return res
        .status(400)
        .json({ message: "Facility ID and booking date are required." });
    }
    const facility = await Facility.findById(facilityId);
    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }
    const today = new Date();
    const requestedDate = new Date(bookingDate);
    if (requestedDate < today.setHours(0, 0, 0, 0)) {
      return res.status(400).json({ message: "Cannot book past dates." });
    }
    // Fetch already booked slots for the requested date
    const bookedSlots = await Booking.find({
      facility: facilityId,
      bookingDate: bookingDate,
    }).select("timeSlot");
    const bookedTimeSlots = bookedSlots.map((slot) => slot.timeSlot);
    // Generate all time slots (9 AM - 9 PM)
    const allTimeSlots = generateTimeSlots();
    const currentTime = new Date();
    const filteredSlots = allTimeSlots.filter((slot) => {
      const [hours, minutes] = slot.split(":").map(Number);
      const slotTime = new Date();
      slotTime.setHours(hours, minutes, 0, 0);
      return (
        !bookedTimeSlots.includes(slot) &&
        (requestedDate > new Date(today) || slotTime > currentTime)
      );
    });
    res.json(filteredSlots);
  } catch (error) {
    console.error("Error fetching available time slots:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAvailableSlots = getAvailableTimeSlots;

// Confirm a booking (owner confirmation) and send email notification to the booking's user
exports.confirmBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { confirmationStatus } = req.body;
    if (
      !confirmationStatus ||
      !["confirmed", "cancelled"].includes(confirmationStatus)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid confirmation status provided." });
    }
    // Populate both facility and user details so we have the user's email
    const booking = await Booking.findById(bookingId)
      .populate("facility")
      .populate("user");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    // Verify that the requester is the owner of the facility
    if (
      req.user.role !== "owner" ||
      booking.facility.owner.toString() !== req.user.userId
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized to confirm booking." });
    }
    // Update the booking status
    booking.status = confirmationStatus;
    await booking.save();

    // Prepare email content based on confirmation status
    let subject, text, html;
    if (confirmationStatus === "confirmed") {
      subject = "Booking Confirmed";
      text = `Dear user,

Your booking for facility "${booking.facility.name}" on ${new Date(
        booking.bookingDate
      ).toLocaleDateString()} at ${
        booking.timeSlot
      } has been confirmed by the facility owner.

Thank you for using our service!
      
Best regards,
Sports Space Booking Team`;
      html = `<p>Dear user,</p>
<p>Your booking for facility "<strong>${
        booking.facility.name
      }</strong>" on <strong>${new Date(
        booking.bookingDate
      ).toLocaleDateString()}</strong> at <strong>${
        booking.timeSlot
      }</strong> has been confirmed by the facility owner.</p>
<p>Thank you for using our service!</p>
<p>Best regards,<br/>Sports Space Booking Team</p>`;
    } else if (confirmationStatus === "cancelled") {
      subject = "Booking Cancelled";
      text = `Dear user,

Your booking for facility "${booking.facility.name}" on ${new Date(
        booking.bookingDate
      ).toLocaleDateString()} at ${
        booking.timeSlot
      } has been cancelled by the facility owner.

If you have any questions, please contact the facility.
      
Best regards,
Sports Space Booking Team`;
      html = `<p>Dear user,</p>
<p>Your booking for facility "<strong>${
        booking.facility.name
      }</strong>" on <strong>${new Date(
        booking.bookingDate
      ).toLocaleDateString()}</strong> at <strong>${
        booking.timeSlot
      }</strong> has been cancelled by the facility owner.</p>
<p>If you have any questions, please contact the facility.</p>
<p>Best regards,<br/>Sports Space Booking Team</p>`;
    }

    // Send email to the booking's user
    if (booking.user && booking.user.email) {
      const mailOptions = {
        to: booking.user.email,
        subject,
        text,
        html,
      };
      try {
        await sendEmail(mailOptions);
        console.log("Confirmation email sent to", booking.user.email);
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
      }
    } else {
      console.warn("Booking user's email not available.");
    }

    res.json({ message: `Booking ${confirmationStatus}!`, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch bookings for facilities owned by the current owner
exports.getOwnerBookingsForOwner = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    // Find all facilities that belong to this owner
    const facilities = await Facility.find({ owner: ownerId });
    if (!facilities || facilities.length === 0) {
      return res.json([]);
    }
    // Collect their IDs
    const facilityIds = facilities.map((f) => f._id);
    // Fetch bookings for these facilities
    const bookings = await Booking.find({
      facility: { $in: facilityIds },
    }).populate("facility");
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching owner bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
};
