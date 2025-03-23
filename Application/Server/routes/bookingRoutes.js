// server/routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { verifyToken } = require("../middleware/authMiddleware");

// Create a new booking
router.post("/", verifyToken, bookingController.createBooking);

// Get bookings for the logged-in user
router.get("/", verifyToken, bookingController.getUserBookings);

// Get available slots for a facility
router.get("/available-slots", bookingController.getAvailableSlots);

// Update booking status (for owner/admin use)
router.put("/:id", verifyToken, bookingController.updateBookingStatus);

// Owner confirms booking (confirmation)
router.put("/:id/confirm", verifyToken, bookingController.confirmBooking);

// Fetch bookings for facilities owned by the current owner
router.get("/owner", verifyToken, bookingController.getOwnerBookingsForOwner);

module.exports = router;
