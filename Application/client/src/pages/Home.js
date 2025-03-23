// client/src/pages/Home.js
import React, { useState, useEffect } from "react";
import { getFacilities } from "../api/facilities";
import FacilityCard from "../components/FacilityCard";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { sectorsList } from "../components/SectorsList";
import { sportsCategories } from "../components/SportsCategories";
import "../styles/Home.css";

function Home() {
  const [facilities, setFacilities] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSport, setSelectedSport] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    getFacilities()
      .then((data) => setFacilities(data))
      .catch((error) => console.error("Error fetching facilities:", error));
  }, []);

  // When a specific category is chosen, show only its sports; if "All", show all sports
  const sportsOptions =
    selectedCategory !== "All"
      ? sportsCategories[selectedCategory] || []
      : Object.values(sportsCategories).flat();

  const filteredFacilities = facilities.filter((facility) => {
    const matchesLocation =
      selectedLocation === "All" || facility.location === selectedLocation;
    const matchesCategory =
      selectedCategory === "All" || facility.category === selectedCategory;
    const matchesSport =
      selectedSport === "All" || facility.sportType === selectedSport;
    return matchesLocation && matchesCategory && matchesSport;
  });

  const handleBookNow = (facilityId) => {
    navigate(`/booking/${facilityId}`);
  };

  const categories = ["All", ...Object.keys(sportsCategories)];

  return (
    <>
      <Header />
      <div className="home">
        <h1>Available Sports Facilities</h1>

        {/* Location Filter */}
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

        {/* Category Filter */}
        <div className="filter-container">
          <label htmlFor="category-select">Filter by Category:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSport("All"); // Reset sport when category changes
            }}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sport Type Filter */}
        {selectedCategory !== "All" && (
          <div className="filter-container">
            <label htmlFor="sport-select">Filter by Sport:</label>
            <select
              id="sport-select"
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
            >
              <option value="All">All</option>
              {sportsOptions.map((sport, index) => (
                <option key={index} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>
        )}

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
    </>
  );
}

export default Home;
