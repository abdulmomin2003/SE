// client/src/pages/ChangePassword.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/ChangePassword.css";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }
    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/change-password",
        { oldPassword, newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);
      navigate("/profile");
    } catch (error) {
      console.error("Error updating password:", error);
      alert(error.response?.data?.message || "Error updating password");
    }
  };

  return (
    <>
      <Header />
      <div className="change-password-page">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit} className="change-password-form">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn">
            Update Password
          </button>
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
