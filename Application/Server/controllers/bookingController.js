// server/controllers/bookingController.js
const Booking = require("../models/Booking");
const Facility = require("../models/Facility");

exports.createBooking = async (req, res) => {
  try {
    const { facilityId, bookingDate, timeSlot } = req.body;
    const user = req.user.userId; // Provided by authentication middleware
    const facility = await Facility.findById(facilityId);
    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }
    const booking = new Booking({
      user,
      facility: facilityId,
      bookingDate,
      timeSlot,
      status: "booked",
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

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

exports.updateBookingStatus = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    // Authorization should be checked (e.g., only owner or admin can update status)
    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
