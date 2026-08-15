import { createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "../../services/customer.service";

export const createCustomer = createAsyncThunk(
    '/customer/create',
    async(payload,thunkApi)=>{
        try {
            const response = await customerService.createCustomer(payload);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const getCustomers = createAsyncThunk(
    '/customer/get-customers',
    async(userId,thunkApi)=>{
        try {
            const response = await customerService.getCustomers(userId);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const getCustomer = createAsyncThunk(
    '/customer/get-customer',
    async(id,thunkApi)=> {
        try {
            const response = await customerService.getCustomer(id);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const updateCustomer = createAsyncThunk(
    '/customer/update-customer',
    async({ id, ...payload },thunkApi)=> {
        try {
            const response = await customerService.updateCustomer(id,payload);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const deleteCustomer = createAsyncThunk(
    '/customer/delete-customer',
    async({ id, userId },thunkApi)=> {
        try {
            const response = await customerService.deleteCustomer(id, userId);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)
