// client/src/pages/Profile.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { getUserBookings } from "../api/bookings";
import Header from "../components/Header";
import "../styles/Profile.css";
import { jwtDecode } from "jwt-decode";

function Profile() {
  const [bookings, setBookings] = useState([]);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const tokenFromStorage = localStorage.getItem("token");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      try {
        const decoded = jwtDecode(token);
        setUserData(decoded);
      } catch (err) {
        console.error("Error decoding token:", err);
      }
      navigate("/profile", { replace: true });
    } else if (tokenFromStorage) {
      try {
        const decoded = jwtDecode(tokenFromStorage);
        setUserData(decoded);
      } catch (err) {
        console.error("Error decoding token from storage:", err);
      }
    }
  }, [location, navigate, tokenFromStorage]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserBookings(token)
        .then((data) => setBookings(data))
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, []);

  return (
    <>
      <Header />
      <div className="profile-page">
        <h2>Your Profile</h2>
        {userData ? (
          <div className="user-info">
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Role:</strong> {userData.role}
            </p>
            <p>
              <Link to="/change-password" className="change-password-link">
                Change Password
              </Link>
            </p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <h3>Your Bookings</h3>
        {bookings.length > 0 ? (
          <ul className="booking-list">
            {bookings.map((booking) => (
              <li key={booking._id}>
                <p>
                  <strong>Facility:</strong> {booking.facility.name} <br />
                  <strong>Date:</strong>{" "}
                  {new Date(booking.bookingDate).toLocaleDateString()} <br />
                  <strong>Time Slot:</strong> {booking.timeSlot} <br />
                  <strong>Status:</strong> {booking.status}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no bookings yet.</p>
        )}
      </div>
    </>
  );
}

export default Profile;
