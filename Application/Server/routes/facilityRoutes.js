// server/routes/facilityRoutes.js
const express = require("express");
const router = express.Router();
const facilityController = require("../controllers/facilityController");
const { verifyToken } = require("../middleware/authMiddleware");

// Get all facilities
router.get("/", facilityController.getAllFacilities);

// ✅ Get facilities for the logged-in owner
router.get("/owner", verifyToken, facilityController.getOwnerFacilities);

// Create facility (Only owners)
router.post("/", verifyToken, facilityController.createFacility);

// Update facility details (Only owner)
router.put("/:id", verifyToken, facilityController.updateFacility);

module.exports = router;
