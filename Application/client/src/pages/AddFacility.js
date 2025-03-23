// client/src/pages/AddFacility.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFacility } from "../api/facilities";
import { sectorsList } from "../components/SectorsList"; // Location options
import { sportsCategories } from "../components/SportsCategories"; // Category mapping
import Header from "../components/Header";
import "../styles/AddFacility.css";

function AddFacility() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState(""); // from sectorsList
  const [category, setCategory] = useState(""); // sports category
  const [sportType, setSportType] = useState(""); // specific sport type
  const [description, setDescription] = useState("");
  const [pricing, setPricing] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Predefined time slots (9 AM - 9 PM, 1-hour each)
  const allSlots = Array.from({ length: 12 }, (_, i) => {
    const start = `${(9 + i).toString().padStart(2, "0")}:00`;
    const end = `${(10 + i).toString().padStart(2, "0")}:00`;
    return `${start} - ${end}`;
  });

  // When category changes, reset sportType
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSportType("");
  };

  // Available sport options for the selected category
  const sportOptions =
    category && sportsCategories[category] ? sportsCategories[category] : [];

  // Handle slot selection (toggle button)
  const toggleSlot = (slot) => {
    setAvailableSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      alert("Please select a location.");
      return;
    }
    if (!category) {
      alert("Please select a sports category.");
      return;
    }
    if (!sportType) {
      alert("Please select a specific sport.");
      return;
    }
    try {
      const facilityData = {
        name,
        location,
        sportType, // specific sport
        category, // category field
        description,
        pricing: Number(pricing),
        availableSlots,
      };
      await createFacility(facilityData, token);
      alert("Facility added successfully!");
      navigate("/owner-dashboard");
    } catch (error) {
      alert(error.message || "Failed to add facility");
    }
  };

  // List of categories (keys of sportsCategories)
  const categories = Object.keys(sportsCategories);

  return (
    <>
      <Header />
      <div className="add-facility-page">
        <h2>Add New Facility</h2>
        <form onSubmit={handleSubmit} className="add-facility-form">
          <input
            type="text"
            placeholder="Facility Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* Location dropdown */}
          <div className="form-group">
            <label htmlFor="location-select">Location:</label>
            <select
              id="location-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            >
              <option value="">Select Location</option>
              {sectorsList.map((sector, index) => (
                <option key={index} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>
          {/* Category dropdown */}
          <div className="form-group">
            <label htmlFor="category-select">Sports Category:</label>
            <select
              id="category-select"
              value={category}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          {/* Sport Type dropdown */}
          <div className="form-group">
            <label htmlFor="sport-select">Specific Sport:</label>
            <select
              id="sport-select"
              value={sportType}
              onChange={(e) => setSportType(e.target.value)}
              required
            >
              <option value="">Select Sport</option>
              {sportOptions.map((sport, index) => (
                <option key={index} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <input
            type="number"
            placeholder="Pricing"
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
            required
          />

          <h4>Select Available Time Slots:</h4>
          <div className="slot-selection">
            {allSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                className={availableSlots.includes(slot) ? "selected" : ""}
                onClick={() => toggleSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>

          <button type="submit" className="btn">
            Add Facility
          </button>
        </form>
      </div>
    </>
  );
}

export default AddFacility;
