// client/src/pages/Home.js
import React, { useState, useEffect } from "react";
import { getFacilities } from "../api/facilities";
import FacilityCard from "../components/FacilityCard";
import { useNavigate } from "react-router-dom";
import { sectorsList } from "../components/SectorsList"; // Import sorted sectors
import "../styles/Home.css";

function Home() {
  const [facilities, setFacilities] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const navigate = useNavigate();

  // Fetch all facilities on mount
  useEffect(() => {
    getFacilities()
      .then((data) => setFacilities(data))
      .catch((error) => console.error("Error fetching facilities:", error));
  }, []);

  // Filter facilities based on selected location
  const filteredFacilities =
    selectedLocation === "All"
      ? facilities
      : facilities.filter((facility) => facility.location === selectedLocation);

  const handleBookNow = (facilityId) => {
    navigate(`/booking/${facilityId}`);
  };

  return (
    <div className="home">
      <h1>Available Sports Facilities</h1>
      <div className="filter-container">
        <label htmlFor="location-select">Filter by Location:</label>
        <select
          id="location-select"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="All">All</option>
          {sectorsList.map((sector, index) => (
            <option key={index} value={sector}>
              {sector}
            </option>
          ))}
        </select>
      </div>
      <div className="facility-list">
        {filteredFacilities.length > 0 ? (
          filteredFacilities.map((facility) => (
            <FacilityCard
              key={facility._id}
              facility={facility}
              onBookNow={() => handleBookNow(facility._id)}
            />
          ))
        ) : (
          <p>No facilities available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
