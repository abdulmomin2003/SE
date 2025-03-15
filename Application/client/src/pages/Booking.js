// client/src/pages/Booking.js
import React, { useState } from "react";
import { createBooking } from "../api/bookings";
import BookingForm from "../components/BookingForm";
import "../styles/Booking.css";

function Booking() {
  const [facilityId] = useState("exampleFacilityId"); // Replace with facility selection logic
  const token = localStorage.getItem("token");

  const handleBookingSubmit = async ({ date, timeSlot }) => {
    // Prepare booking data; adjust keys according to your backend requirements
    const bookingData = {
      facilityId,
      bookingDate: date,
      timeSlot,
    };

    try {
      const data = await createBooking(bookingData, token);
      alert("Booking successful!");
      console.log("Booking data:", data);
    } catch (error) {
      alert(error.message || "Booking failed");
    }
  };

  return (
    <div className="booking-page">
      <h2>Book a Facility</h2>
      <BookingForm onBookingSubmit={handleBookingSubmit} />
    </div>
  );
}

export default Booking;
