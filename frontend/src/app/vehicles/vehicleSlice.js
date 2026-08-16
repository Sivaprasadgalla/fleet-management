import { createSlice, isPending, isRejected } from "@reduxjs/toolkit"
import { createVehicle, deleteVehicle, getVehicle, getVehicles, updateVehicle } from "./vehicleActions"

const initialState ={
    vehicles :[],
    selectedVehicle :null,
    loading:false,
    error:null,
    message:null
}

const vehicleSlice = createSlice({
    name:"vehicles",
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder
        .addCase(getVehicles.fulfilled, (state,action)=> {
            state.loading = false;
            state.vehicles = action.payload.data;
        })
        .addCase(getVehicle.fulfilled, (state,action)=>{
            state.loading = false;
            state.selectedVehicle = action.payload.data;
        })
        .addCase(createVehicle.fulfilled, (state,action)=>{
            state.loading = false;
            state.vehicles.push(action.payload.data);
            state.message ="Vehicle Created Successfully"
        })
        .addCase(updateVehicle.fulfilled, (state,action)=>{
            state.loading = false;
            const index = state.vehicles.findIndex(vehicle._id === action.payload._id);
            if(index !== -1){
                state.vehicles[index] = action.payload.data
            }
            state.message ="Vehicle Updated Successfully"
        })
        .addCase(deleteVehicle.fulfilled, (state,action)=>{
            state.loading = false;
            state.vehicles = state.vehicles.filter(vehicle._id !== action.payload._id);
            state.message ="Vehicle Deleted Successfully"
        })

        .addMatcher(isPending, (state)=>{
            state.loading = true;
            state.error = null;
            state.message =null;
        })
        .addMatcher(isRejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload || action.payload.message;
            state.message =null;
        })
    }
})

export default vehicleSlice.reducer