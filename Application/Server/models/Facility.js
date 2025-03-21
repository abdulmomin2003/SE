// server/models/Facility.js
const mongoose = require("mongoose");

const FacilitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    sportType: { type: String, required: true },
    description: { type: String },
    availableSlots: { type: [String], default: [] }, // Store available slots
    pricing: { type: Number, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Facility", FacilitySchema);
