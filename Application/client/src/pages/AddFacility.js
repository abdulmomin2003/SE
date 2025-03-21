// client/src/pages/AddFacility.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFacility } from "../api/facilities";
import "../styles/AddFacility.css";

function AddFacility() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [sportType, setSportType] = useState("");
  const [description, setDescription] = useState("");
  const [pricing, setPricing] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const facilityData = {
        name,
        location,
        sportType,
        description,
        pricing: Number(pricing),
        availableSlots: [], // you can extend this later to add slots
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
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
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
        <button type="submit" className="btn">
          Add Facility
        </button>
      </form>
    </div>
  );
}

export default AddFacility;
