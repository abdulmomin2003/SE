import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBooking } from "../api/bookings";
import BookingForm from "../components/BookingForm";
import "../styles/Booking.css";

function Booking() {
  const { facilityId } = useParams(); // Get facilityId from URL
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (selectedDate && facilityId) {
      const fetchAvailableSlots = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/bookings/available-slots?facilityId=${facilityId}&bookingDate=${selectedDate}`
          );
          const data = await response.json();
          console.log("Fetched Available Slots:", data);
          // Check if the response is an array
          if (Array.isArray(data)) {
            setAvailableSlots([...data]);
          } else {
            setAvailableSlots([]);
          }
        } catch (error) {
          console.error("Error fetching slots:", error);
          setAvailableSlots([]);
        }
      };
      fetchAvailableSlots();
    }
  }, [selectedDate, facilityId]);

  useEffect(() => {
    console.log("Updated Available Slots in Booking:", availableSlots);
  }, [availableSlots]);

  const handleBookingSubmit = async ({ date, timeSlot }) => {
    try {
      const bookingData = { facilityId, bookingDate: date, timeSlot };
      await createBooking(bookingData, token);
      alert("Booking successful!");
      navigate("/profile");
    } catch (error) {
      alert(error.message || "Booking failed");
    }
  };

  return (
    <div className="booking-page">
      <h2>Book a Facility</h2>
      <label>Select Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <BookingForm
        onBookingSubmit={handleBookingSubmit}
        availableSlots={availableSlots}
      />
    </div>
  );
}

export default Booking;
