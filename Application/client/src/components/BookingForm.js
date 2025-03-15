// client/src/components/BookingForm.js
import React, { useState } from "react";
import "../styles/BookingForm.css";

function BookingForm({ onBookingSubmit }) {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onBookingSubmit({ date, timeSlot });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="date">Select Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="timeSlot">Select Time Slot:</label>
        <input
          type="time"
          id="timeSlot"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn">
        Confirm Booking
      </button>
    </form>
  );
}

export default BookingForm;
