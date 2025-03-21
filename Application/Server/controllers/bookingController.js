// server/controllers/bookingController.js
const Booking = require("../models/Booking");
const Facility = require("../models/Facility");

exports.createBooking = async (req, res) => {
  try {
    const { facilityId, bookingDate, timeSlot } = req.body;
    const user = req.user.userId;

    // Check if facility exists
    const facility = await Facility.findById(facilityId);
    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }

    // Ensure bookingDate is valid
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

    // Create a new booking
    const booking = new Booking({
      user,
      facility: facilityId,
      bookingDate: date,
      timeSlot,
      status: "booked",
    });

    await booking.save();
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

// Allow owner/admin to update booking status
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
// Add this function in server/controllers/bookingController.js

// Function to generate time slots (9 AM - 9 PM, 1-hour each)
function generateTimeSlots() {
  const slots = [];
  for (let hour = 9; hour < 21; hour++) {
    // 9 AM to 9 PM
    const start = `${hour.toString().padStart(2, "0")}:00`;
    const end = `${(hour + 1).toString().padStart(2, "0")}:00`;
    slots.push(`${start} - ${end}`);
  }
  return slots;
}
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

    // ✅ Prevent past dates
    if (requestedDate < today.setHours(0, 0, 0, 0)) {
      return res.status(400).json({ message: "Cannot book past dates." });
    }

    // Fetch already booked slots for the facility on the requested date
    const bookedSlots = await Booking.find({
      facility: facilityId,
      bookingDate: bookingDate,
    }).select("timeSlot");

    const bookedTimeSlots = bookedSlots.map((slot) => slot.timeSlot);

    // Generate time slots (Assuming slots are in HH:mm format)
    const allTimeSlots = generateTimeSlots(
      facility.openingTime,
      facility.closingTime
    );

    // ✅ Filter out past time slots for today
    const currentTime = new Date();
    const filteredSlots = allTimeSlots.filter((slot) => {
      const [hours, minutes] = slot.split(":").map(Number);
      const slotTime = new Date();
      slotTime.setHours(hours, minutes, 0, 0);

      return (
        !bookedTimeSlots.includes(slot) && // Exclude already booked slots
        (requestedDate > today || slotTime > currentTime) // Exclude past times for today
      );
    });

    res.json(filteredSlots);
  } catch (error) {
    console.error("Error fetching available time slots:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAvailableSlots = getAvailableTimeSlots;
