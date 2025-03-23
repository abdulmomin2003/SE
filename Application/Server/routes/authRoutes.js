// server/routes/authRoutes.js
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");

// Local auth routes (register, login)
const authController = require("../controllers/authController");
router.post("/register", authController.register);
router.post("/login", authController.login);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Option: Generate JWT token and redirect to frontend
    const token = jwt.sign(
      { userId: req.user._id, email: req.user.email, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // Redirect to your frontend's profile route with token in query string
    res.redirect(`http://localhost:3000/profile?token=${token}`);
  }
);

// New route: Change password (local users)
router.put("/change-password", verifyToken, authController.changePassword);

module.exports = router;
