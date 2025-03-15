// client/src/api/bookings.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/bookings";

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

// Get bookings for the logged-in user
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

// Update booking status (for owners/admin)
export const updateBookingStatus = async (bookingId, status, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/${bookingId}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error.response.data;
  }
};
