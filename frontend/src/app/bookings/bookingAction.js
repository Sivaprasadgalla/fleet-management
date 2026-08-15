import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "../../services/booking.service";

export const createBooking = createAsyncThunk(
    '/booking/create',
    async(payload,thunkApi)=>{
        try {
            const response = await bookingService.createBooking(payload);
            return response.data;
        } catch (error) {
            thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const getBookings = createAsyncThunk(
    '/booking/get-bookings',
    async(payload,thunkApi)=>{
        try {
            const response = await bookingService.getBookings();
            return response.data
        } catch (error) {
            thunkApi.rejectWithValue(error.response.data)            
        }
    }
)

export const getBooking = createAsyncThunk(
    '/booking/get-booking',
    async(id,thunkAPi)=>{
          try {
            const response = await bookingService.getBooking(id);
            return response.data 
          } catch (error) {
            thunkAPi.rejectWithValue(error.response.data)
          }
    }
)

export const updateBooking = createAsyncThunk(
    '/booking/update-booking',
    async(id,payload,thunkApi)=>{
        try {
            const response= await bookingService.updateBooking(id,payload);
            return response.data;
        } catch (error) {
            thunkApi.rejectWithValue(error.response.data);
        }
    }
)

export const deleteBooking = createAsyncThunk(
    '/booking/delete-booking',
    async(id,thunkAPi) => {
        try {
            const response = await bookingService.deleteBooking(id);
            return response.data
        } catch (error) {
            thunkAPi.rejectWithValue(error.response.data)
        }
    }
)
