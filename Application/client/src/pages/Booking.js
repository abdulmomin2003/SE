import { createBooking } from "../api/bookings";

const handleBooking = async () => {
  const bookingData = { facilityId, bookingDate, timeSlot };
  const token = localStorage.getItem("token");

  try {
    const booking = await createBooking(bookingData, token);
    alert("Booking successful!");
  } catch (error) {
    alert(error.message || "Booking failed");
  }
};
