// client/src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import OwnerDashboard from "./pages/OwnerDashboard";
import AddFacility from "./pages/AddFacility";
import ChangePassword from "./pages/ChangePassword";
import "./styles/App.css";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.5); // Trigger effect after scrolling past half of viewport
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <Navbar />
      <div className={`main-content ${isScrolled ? "scrolled" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking/:facilityId" element={<Booking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/add-facility" element={<AddFacility />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
