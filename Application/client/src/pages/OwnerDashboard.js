// client/src/pages/OwnerDashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/OwnerDashboard.css";

function OwnerDashboard() {
  const [facilities, setFacilities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // If the user is not an owner, redirect them.
  useEffect(() => {
    if (userRole !== "owner") {
      alert("Access Denied: You are not authorized to view this page.");
      navigate("/");
    }
  }, [userRole, navigate]);

  // Fetch owner facilities and bookings
  useEffect(() => {
    const fetchOwnerFacilities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/facilities/owner",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFacilities(response.data);
      } catch (error) {
        console.error("Error fetching owner facilities", error);
      }
    };

    const fetchOwnerBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/bookings/owner",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching owner bookings", error);
      }
    };

    fetchOwnerFacilities();
    fetchOwnerBookings();
  }, [token]);

  return (
    <div className="owner-dashboard">
      <h2>Owner Dashboard</h2>
      <div className="add-facility-btn-container">
        <Link to="/add-facility" className="btn add-facility-btn">
          Add New Facility
        </Link>
      </div>
      <section className="facilities-section">
        <h3>Your Facilities</h3>
        {facilities.length > 0 ? (
          facilities.map((facility) => (
            <div key={facility._id} className="facility-item">
              <h4>{facility.name}</h4>
              <p>
                <strong>Location:</strong> {facility.location}
              </p>
              <p>
                <strong>Sport Type:</strong> {facility.sportType}
              </p>
              <button>Edit Facility</button>
            </div>
          ))
        ) : (
          <p>You haven't added any facilities yet.</p>
        )}
      </section>
      <section className="bookings-section">
        <h3>Bookings Requiring Manual Update</h3>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="booking-item">
              <p>
                <strong>Facility:</strong> {booking.facility.name} <br />
                <strong>Date:</strong>{" "}
                {new Date(booking.bookingDate).toLocaleDateString()} <br />
                <strong>Time:</strong> {booking.timeSlot} <br />
                <strong>Status:</strong> {booking.status}
              </p>
              <button>Update Status</button>
            </div>
          ))
        ) : (
          <p>No bookings require manual update at this time.</p>
        )}
      </section>
    </div>
  );
}

export default OwnerDashboard;
