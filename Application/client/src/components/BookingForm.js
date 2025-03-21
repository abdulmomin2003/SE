import React, { useState, useEffect } from "react";
import "../styles/BookingForm.css";

function BookingForm({ onBookingSubmit, availableSlots = [] }) {
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    console.log("Received Available Slots in BookingForm:", availableSlots);
  }, [availableSlots]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }
    // Pass today's date (or modify as needed) along with the selected slot
    onBookingSubmit({
      date: new Date().toISOString().split("T")[0],
      timeSlot: selectedSlot,
    });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Select Time Slot:</label>
        <select
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          required
        >
          <option value="">Select a time slot</option>
          {availableSlots.length > 0 ? (
            availableSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))
          ) : (
            <option disabled>No slots available</option>
          )}
        </select>
      </div>
      <button type="submit" className="btn">
        Confirm Booking
      </button>
    </form>
  );
}

export default BookingForm;
