// client/src/pages/AddFacility.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFacility } from "../api/facilities";
import { sectorsList } from "../components/SectorsList"; // Import sorted sectors
import "../styles/AddFacility.css";

function AddFacility() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState(""); // Will be set via dropdown
  const [sportType, setSportType] = useState("");
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
    try {
      const facilityData = {
        name,
        location,
        sportType,
        description,
        pricing: Number(pricing),
        availableSlots, // Include available slots
      };
      await createFacility(facilityData, token);
      alert("Facility added successfully!");
      navigate("/owner-dashboard");
    } catch (error) {
      alert(error.message || "Failed to add facility");
    }
  };

  return (
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
        {/* Replace location input with dropdown */}
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
        <input
          type="text"
          placeholder="Sport Type"
          value={sportType}
          onChange={(e) => setSportType(e.target.value)}
          required
        />
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
  );
}

export default AddFacility;
