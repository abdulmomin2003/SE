// server/models/Booking.js
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    facility: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility",
      required: true,
    },
    bookingDate: { type: Date, required: true },
    timeSlot: { type: String, required: true, enum: generateTimeSlots() }, // Ensure only valid slots
    status: {
      type: String,
      enum: ["booked", "cancelled", "completed", "confirmed"],
      default: "booked",
    },
  },
  { timestamps: true }
);

// Generate a list of 1-hour time slots (e.g., "09:00 - 10:00")
function generateTimeSlots() {
  const slots = [];
  for (let hour = 9; hour <= 21; hour++) {
    // Example: 9 AM - 9 PM
    const start = `${hour.toString().padStart(2, "0")}:00`;
    const end = `${(hour + 1).toString().padStart(2, "0")}:00`;
    slots.push(`${start} - ${end}`);
  }
  return slots;
}

module.exports = mongoose.model("Booking", BookingSchema);
