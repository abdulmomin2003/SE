// server/routes/authRoutes.js
const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");

// Local authentication routes
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
    // Successful authentication; you can redirect to a protected page.
    res.redirect("/profile");
  }
);

module.exports = router;
