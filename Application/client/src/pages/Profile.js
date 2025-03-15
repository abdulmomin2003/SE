// client/src/pages/Profile.js
import React, { useState, useEffect } from "react";
import { getUserBookings } from "../api/bookings";
import "../styles/Profile.css";

function Profile() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getUserBookings(token)
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [token]);

  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
      <h3>Your Bookings</h3>
      {bookings.length > 0 ? (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <li key={booking._id}>
              <p>
                Facility: {booking.facility.name} <br />
                Date: {new Date(booking.bookingDate).toLocaleDateString()}{" "}
                <br />
                Time Slot: {booking.timeSlot} <br />
                Status: {booking.status}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no bookings yet.</p>
      )}
    </div>
  );
}

export default Profile;
