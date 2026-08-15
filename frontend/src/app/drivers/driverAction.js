import { createAsyncThunk } from "@reduxjs/toolkit";
import driverService from "../../services/driver.service";

export const createDriver = createAsyncThunk(
    '/driver/create',
    async(payload,thunkApi) => {
        try {
            const response = await driverService.createDriver(payload);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
)

export const getDrivers = createAsyncThunk(
    '/driver/get-drivers',
    async(_,thunkApi)=> {
        try {
            const response = await driverService.getDrivers();
            return response.data 
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const getDriver = createAsyncThunk(
    '/driver/get-driver',
    async(id,thunkAPi) => {
        try {
            const response = await driverService.getDriver(id);
            return response.data
        } catch (error) {
            return thunkAPi.rejectWithValue(error.response.data)
        }
    }
)

export const updateDriver = createAsyncThunk(
    '/driver/update-driver',
    async(id,payload,thunkApi) =>{
           try {
             const response = await driverService.updateDriver(id,payload);
             return response.data
           } catch (error) {
             return thunkApi.rejectWithValue(error.response.data)
           }
    }
)

export const deleteDriver = createAsyncThunk(
    '/driver/delete-driver',
    async(id,thunkApi) => {
        try {
            const response = await driverService.deleteDriver(id);
            return response.data
        } catch (error) {
           return thunkApi.rejectWithValue(error.response.data)            
        }
    }
)

