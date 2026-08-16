import { createSlice, isPending, isRejected } from "@reduxjs/toolkit"
import { createDriver, deleteDriver, getDriver, getDrivers, updateDriver } from "./driverAction"

const initialState = {
    drivers : [],
    selectedDriver : null,
    loading :false,
    error:null,
    message:null
}

const driverSlice = createSlice({
    name:"drivers",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder 
        .addCase(getDrivers.fulfilled, (state,action) => {
            state.loading = false;
            state.drivers = action.payload.data
        })
        .addCase(createDriver.fulfilled, (state,action)=> {
            state.loading = false;
            state.drivers.push(action.payload.data);
            state.message = "Driver Created Successfully";
        })
        .addCase(getDriver.fulfilled, (state,action)=>{
            state.loading = false;
            state.selectedDriver = action.payload.data
        })
        .addCase(updateDriver.fulfilled, (state,action)=> {
            state.loading = false;
            const index = state.drivers.findIndex((driver) => driver._id === action.payload.data?._id);
            if(index !== -1){
                state.drivers[index] = action.payload.data
            }
            state.message = "Driver Updated Successfully";
        })
        .addCase(deleteDriver.fulfilled, (state,action) => {
            state.loading = false;
            state.drivers = state.drivers.filter(driver => driver._id !== action.meta.arg.id)
             state.message = "Driver Deleted Successfully";
        })

        .addMatcher(
            (action) => action.type.startsWith("/driver/") && action.type.endsWith("/pending"),
            (state) => { state.loading = true; }
        )
        .addMatcher(
            (action) => action.type.startsWith("/driver/") && action.type.endsWith("/rejected"),
            (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error;
            }
        )
    }
})

export default driverSlice.reducer
