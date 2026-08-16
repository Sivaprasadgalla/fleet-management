import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  createBooking,
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
} from "./bookingAction";

const initialState = {
  bookings: [],
  selectedBooking: null,
  loading: false,
  error: null,
  message: null,
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookings.fulfilled, (State, action) => {
        state.loading = false;
        state.bookings = action.payload.data;
      })
      .addCase(getBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBooking = action.payload.data;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload.data);
        state.message = "Booking Created Successfully";
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookings.findIndex(
          booking._id === action.payload._id,
        );
        if (index !== -1) {
          state.bookings[index] = action.payload.data;
        }
        state.message = "Booking Updated Successfully";
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.filter(
          booking._id === action.payload._id,
        );
        state.message = "Booking Deleted Successfully";
      })

      .addMatcher(isPending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })

      .addMatcher(isRejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.payload.message;
        state.message = null;
      });
  },
});

export default bookingSlice.reducer;
