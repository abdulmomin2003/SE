// client/src/components/FacilityCard.js
import React from "react";
import "../styles/FacilityCard.css";

function FacilityCard({ facility, onBookNow }) {
  return (
    <div className="facility-card">
      <img
        src={facility.imageUrl || "/images/default-facility.jpg"}
        alt={facility.name}
      />
      <div className="facility-info">
        <h3>{facility.name}</h3>
        <p>{facility.description || "Available 24/7"}</p>
        <p>
          <strong>Location:</strong> {facility.location}
        </p>
        <p>
          <strong>Sport:</strong> {facility.sportType}
        </p>
        <p>
          <strong>Category:</strong> {facility.category}
        </p>
        <p>
          <strong>Pricing:</strong> ${facility.pricing}
        </p>
        <button className="btn" onClick={onBookNow}>
          Book Now
        </button>
      </div>
    </div>
  );
}

export default FacilityCard;
