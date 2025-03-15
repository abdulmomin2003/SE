// client/src/api/facilities.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/facilities";

// Get all facilities
export const getFacilities = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching facilities:", error);
    throw error.response.data;
  }
};

// Create a new facility (for owners)
export const createFacility = async (facilityData, token) => {
  try {
    const response = await axios.post(API_URL, facilityData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating facility:", error);
    throw error.response.data;
  }
};

// Update facility information
export const updateFacility = async (facilityId, updatedData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${facilityId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating facility:", error);
    throw error.response.data;
  }
};
