// client/src/api/auth.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Change this in production

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error.response.data;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem("token", response.data.token); // Store token
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error.response.data;
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("token"); // Remove token from local storage
};
