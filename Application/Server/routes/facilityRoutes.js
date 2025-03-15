// server/routes/facilityRoutes.js
const express = require("express");
const router = express.Router();
const facilityController = require("../controllers/facilityController");
const { verifyToken } = require("../middleware/authMiddleware");

// Public route: List all facilities
router.get("/", facilityController.getAllFacilities);

// Protected routes: Create and update facility (accessible by authenticated users/owners)
router.post("/", verifyToken, facilityController.createFacility);
router.put("/:id", verifyToken, facilityController.updateFacility);

module.exports = router;
