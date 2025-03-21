// client/src/components/FacilityCard.js
import React from "react";
import "../styles/FacilityCard.css";

function FacilityCard({ facility, onBookNow }) {
  return (
    <div className="facility-card">
      <h2>{facility.name}</h2>
      <p>
        <strong>Location:</strong> {facility.location}
      </p>
      <p>
        <strong>Sport Type:</strong> {facility.sportType}
      </p>
      <p>
        <strong>Pricing:</strong> ${facility.pricing}
      </p>
      <p>{facility.description || "Available 24/7"}</p>
      <button className="book-now-btn" onClick={onBookNow}>
        Book Now
      </button>{" "}
      {/* ✅ Button inside the card */}
    </div>
  );
}

export default FacilityCard;
