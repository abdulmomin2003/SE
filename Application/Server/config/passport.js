// server/config/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const crypto = require("crypto"); // Import crypto to generate a random password
const User = require("../models/User");
const validator = require("validator");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract the verified email from Google
        const email = profile.emails[0].value;
        if (!validator.isEmail(email)) {
          return done(new Error("Invalid email address"), null);
        }

        // Check if a user with this email exists; if not, create a new user.
        let user = await User.findOne({ email });
        if (!user) {
          // Generate a random password (16 bytes converted to hex)
          const randomPassword = crypto.randomBytes(16).toString("hex");
          user = await User.create({
            name: profile.displayName,
            email: email,
            googleId: profile.id,
            password: randomPassword, // Set a random password to satisfy the schema requirement
            role: "user", // or "owner" if you want to differentiate
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
