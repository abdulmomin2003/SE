// client/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import OwnerDashboard from "./pages/OwnerDashboard";
import AddFacility from "./pages/AddFacility";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/add-facility" element={<AddFacility />} />
      </Routes>
    </Router>
  );
}

export default App;
