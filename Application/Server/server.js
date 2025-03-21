// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express-session middleware (use a proper store in production)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_session_secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and load configuration
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport"); // Ensure your Passport configuration is loaded

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/authRoutes");
const facilityRoutes = require("./routes/facilityRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/bookings", bookingRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Sports Facility Booking API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
