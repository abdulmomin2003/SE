// server/routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { verifyToken } = require("../middleware/authMiddleware");

// Create a new booking
router.post("/", verifyToken, bookingController.createBooking);

// Get bookings for the logged-in user
router.get("/", verifyToken, bookingController.getUserBookings);

// Update booking status (for owner/admin use)
router.put("/:id", verifyToken, bookingController.updateBookingStatus);

module.exports = router;
