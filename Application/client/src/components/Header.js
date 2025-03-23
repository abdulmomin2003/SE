// client/src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import HeroCarousel from "./HeroCarousel";
import "../styles/Header.css";

function Header() {
  return (
    <header className="site-header">
      <HeroCarousel />
      <div className="header-nav-container">
        <div className="header-nav">
          <Link to="/" className="logo">
            Sports Space
          </Link>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="hero-content">
        <h1>Discover the Best Sports Facilities</h1>
        <p>Book the perfect facility for your game or training session</p>
      </div>
    </header>
  );
}

export default Header;
