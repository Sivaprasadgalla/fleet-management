import { createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/user.service";

export const login = createAsyncThunk(
    '/user/login',
    async(payload,thunkApi) => {
        try {
            const response = await userService.login(payload);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const register  = createAsyncThunk(
    '/user/register',
    async(payload,thunkApi) => {
        try {
            const response = await userService.register(payload);
            return response.data;          
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const changePassword = createAsyncThunk(
    '/user/change-password',
    async(payload,thunkApi)=>{
        try {
            const response = await userService.changePassword(payload);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
)
export const createUser = createAsyncThunk(
    '/user/create',
    async(payload,thunkApi) => {
        try {
            const response = await userService.createUser(payload);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
)

export const getUsers = createAsyncThunk(
    '/user/all-users',
    async(_,thunkApi) => {
        try {
            const response = await userService.getUsers();
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
)

export const getUser = createAsyncThunk(
    '/user/get-profile',
    async(id,thunkApi) => {
        try {
            const response = await userService.getOneUser(id);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
)

export const updateUser = createAsyncThunk(
    '/user/update-profile',
    async(payload,thunkApi) =>{
       try {
        const response = await userService.updateUser(payload);
        return response.data;
       } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
       }
    }
) 

export const deleteUser = createAsyncThunk(
    '/user/delete-user',
    async(payload,thunkApi) =>{
       try {
        const id = typeof payload === "string" ? payload : payload.id;
        const response = await userService.deleteUser(id);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
) 

