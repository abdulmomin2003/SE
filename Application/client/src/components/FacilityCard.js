// client/src/components/FacilityCard.js
import React from "react";
import "../styles/FacilityCard.css";

function FacilityCard({ facility }) {
  return (
    <div className="facility-card">
      <h3>{facility.name}</h3>
      <p>
        <strong>Location:</strong> {facility.location}
      </p>
      <p>
        <strong>Sport Type:</strong> {facility.sportType}
      </p>
      <p>
        <strong>Pricing:</strong> ${facility.pricing}
      </p>
      {facility.description && <p>{facility.description}</p>}
      <a href="/booking" className="btn">
        Book Now
      </a>
    </div>
  );
}

export default FacilityCard;
