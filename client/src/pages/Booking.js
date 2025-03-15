// client/src/pages/Booking.js
import React, { useState } from "react";
import "../styles/Booking.css";

function Booking() {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const handleBooking = () => {
    alert(`Booking confirmed for ${date} at ${timeSlot}`);
  };

  return (
    <div className="booking">
      <h2>Book a Sports Facility</h2>
      <input type="date" onChange={(e) => setDate(e.target.value)} required />
      <input
        type="time"
        onChange={(e) => setTimeSlot(e.target.value)}
        required
      />
      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}

export default Booking;
