import { createAsyncThunk } from "@reduxjs/toolkit";
import vehicleExpenseService from "../../../services/vehicle.expense.service";

export const createExpense =createAsyncThunk (
    '/expense/vehicle/create',
    async(payload,thunkApi)=>{
        try {
            const response = await vehicleExpenseService.createExpense(payload);
            return response.data;
        } catch (error) {
            thunkApi.rejectWithValue(error.response.data);
        }
    }
)

export const getExpenses = createAsyncThunk (
    '/expesne/vehicle/get-expenses',
    async(payload,thunkApi)=>{
        try {
            const response = await vehicleExpenseService.getExpenses();
            return response.data;
        } catch (error) {
            thunkApi.rejectWithValue(error.response.data);
        }
    }
)

export const updateExpense = createAsyncThunk(
    '/expense/vehicle/update-expense',
    async(id,payload,thunkApi)=>{
        try {
            const response = await vehicleExpenseService.updateExpense(id,payload);
            return response.data;
        } catch (error) {
            thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const deleteExpense = createAsyncThunk(
    'expense/vehicle/delete-expense',
    async(id,thunkApi)=>{
        try {
            const response = await vehicleExpenseService.deleteExpense(id);
            return response.data
        } catch (error) {
           thunkApi.rejectWithValue(error.response.data)            
        }
    }
)