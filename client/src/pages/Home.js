// client/src/pages/Home.js
import React from "react";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Sports Facility Booking</h1>
      <p>Find and book sports grounds, courts, and play areas with ease!</p>
      <a href="/booking" className="btn">
        Book Now
      </a>
    </div>
  );
}

export default Home;
