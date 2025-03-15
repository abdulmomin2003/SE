// client/src/pages/Home.js
import React, { useState, useEffect } from "react";
import { getFacilities } from "../api/facilities";
import FacilityCard from "../components/FacilityCard";
import "../styles/Home.css";

function Home() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    getFacilities()
      .then((data) => setFacilities(data))
      .catch((error) => console.error("Error fetching facilities:", error));
  }, []);

  return (
    <div className="home">
      <h1>Available Sports Facilities</h1>
      <div className="facility-list">
        {facilities.length > 0 ? (
          facilities.map((facility) => (
            <FacilityCard key={facility._id} facility={facility} />
          ))
        ) : (
          <p>No facilities available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
