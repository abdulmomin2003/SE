// server/controllers/facilityController.js
const Facility = require("../models/Facility");

exports.createFacility = async (req, res) => {
  try {
    const { name, location, sportType, description, availableSlots, pricing } =
      req.body;
    const owner = req.user.userId; // Owner ID from authentication middleware

    // Validate available slots
    if (!Array.isArray(availableSlots) || availableSlots.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide available time slots." });
    }

    const facility = new Facility({
      name,
      location,
      sportType,
      description,
      availableSlots,
      pricing,
      owner,
    });

    await facility.save();
    res
      .status(201)
      .json({ message: "Facility created successfully", facility });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Add this function
exports.updateFacility = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the facility
    const updatedFacility = await Facility.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedFacility) {
      return res.status(404).json({ message: "Facility not found" });
    }

    res.json(updatedFacility);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all facilities belonging to the logged-in owner
exports.getOwnerFacilities = async (req, res) => {
  try {
    const ownerId = req.user.userId; // Extract owner ID from authenticated user

    const facilities = await Facility.find({ owner: ownerId });

    if (!facilities || facilities.length === 0) {
      return res
        .status(404)
        .json({ message: "No facilities found for this owner." });
    }

    res.json(facilities);
  } catch (err) {
    console.error("Error fetching owner's facilities:", err);
    res.status(500).json({ message: "Server error" });
  }
};
