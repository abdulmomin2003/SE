// client/src/api/bookings.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/bookings";

// Fetch available slots for a facility on a specific date
export const getAvailableSlots = async (facilityId, bookingDate) => {
  try {
    const response = await axios.get(`${API_URL}/available-slots`, {
      params: { facilityId, bookingDate },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching available slots:", error);
    throw error.response.data;
  }
};

// Create a new booking
export const createBooking = async (bookingData, token) => {
  try {
    const response = await axios.post(API_URL, bookingData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error.response.data;
  }
};

// Fetch bookings for the logged-in user
export const getUserBookings = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    throw error.response.data;
  }
};

// Fetch bookings for the owner
export const getOwnerBookings = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/owner`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching owner bookings:", error);
    throw error.response.data;
  }
};

// Confirm or reject a booking (owner confirmation)
export const confirmBooking = async (bookingId, confirmationStatus, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/${bookingId}/confirm`,
      { confirmationStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error confirming booking:", error);
    throw error.response.data;
  }
};
