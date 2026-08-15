import { createAsyncThunk } from "@reduxjs/toolkit";
import driverExpenseService from "../../../services/driver.expense.service";

export const createExpense =createAsyncThunk (
    '/expense/driver/create',
    async(payload,thunkApi)=>{
        try {
            const response = await driverExpenseService.createExpense(payload);
            return response.data;
        } catch (error) {
            thunkApi.rejectWithValue(error.response.data);
        }
    }
)

export const getExpenses = createAsyncThunk (
    '/expesne/driver/get-expenses',
    async(payload,thunkApi)=>{
        try {
            const response = await driverExpenseService.getExpenses();
            return response.data;
        } catch (error) {
            thunkApi.rejectWithValue(error.response.data);
        }
    }
)

export const updateExpense = createAsyncThunk(
    '/expense/driver/update-expense',
    async(id,payload,thunkApi)=>{
        try {
            const response = await driverExpenseService.updateExpense(id,payload);
            return response.data;
        } catch (error) {
            thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const deleteExpense = createAsyncThunk(
    'expense/driver/delete-expense',
    async(id,thunkApi)=>{
        try {
            const response = await driverExpenseService.deleteExpense(id);
            return response.data
        } catch (error) {
           thunkApi.rejectWithValue(error.response.data)            
        }
    }
)