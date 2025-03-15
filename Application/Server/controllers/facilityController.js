// server/controllers/facilityController.js
const Facility = require("../models/Facility");

exports.getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find().populate("owner", "name email");
    res.json(facilities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createFacility = async (req, res) => {
  try {
    const { name, location, sportType, description, availableSlots, pricing } =
      req.body;
    const owner = req.user.userId; // Assuming req.user is set by authentication middleware
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
    res.status(201).json(facility);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateFacility = async (req, res) => {
  try {
    const facilityId = req.params.id;
    const facility = await Facility.findById(facilityId);
    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }
    if (facility.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const updatedData = req.body;
    const updatedFacility = await Facility.findByIdAndUpdate(
      facilityId,
      updatedData,
      { new: true }
    );
    res.json(updatedFacility);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
