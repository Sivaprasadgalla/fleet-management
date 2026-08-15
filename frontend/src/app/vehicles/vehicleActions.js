import { createAsyncThunk } from "@reduxjs/toolkit";
import vehicleService from "../../services/vehicle.service";

export const createVehicle = createAsyncThunk(
    '/vehicle/create',
    async(payload,thunkApi)=>{
        try {
            const repsonse = await vehicleService.createVehicle(payload);
            return repsonse.data;
        } catch (error) {
            thunkApi.rejectWithValue(error.repsonse.data)
        }
    }
)

export const getVehicles = createAsyncThunk(
    '/vehicle/get-vehicles',
    async(payload,thunkApi)=>{
        try {
            const response = await vehicleService.getVehicles(payload);
            return response.data;
        } catch (error) {
            thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const getVehicle = createAsyncThunk(
    '/vehicle/get-vehicle',
    async(id,thunkApi)=>{
        try {
            const response = await vehicleService.getVehicle(id);
            return response.data;
        } catch (error) {
            thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const updateVehicle = createAsyncThunk(
    '/vehicle/update-vehicle',
    async(id,payload,thunkApi)=>{
        try {
            const response = await vehicleService.updateVehicle(id,payload);
            return response.data
        } catch (error) {
            thunkApi.rejectWithValue(error.repsonse.data)
        }
    }
)

export const deleteVehicle = createAsyncThunk(
    '/vehicle/delete-vehicle',
    async(id,thunkApi)=>{
        try {
            const response = await vehicleService.deleteVehicle(id);
            return response.data;
        } catch (error) {
            thunkApi.rejectWithValue(error.response.data)
        }
    }
)