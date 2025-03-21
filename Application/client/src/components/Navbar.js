// client/src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Retrieve role from local storage

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">SFBP</Link>
      </div>
      <ul className="navbar-menu">
        {token ? (
          <>
            {userRole === "owner" ? (
              // Owner-specific navigation: hide Home and Book Facility
              <>
                <li>
                  <Link to="/owner-dashboard">Home</Link>
                </li>
                <li>
                  <Link to="/add-facility">Add New Facility</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              // Regular user navigation
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/booking">Book Facility</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            )}
          </>
        ) : (
          // Navigation for not logged in users
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
