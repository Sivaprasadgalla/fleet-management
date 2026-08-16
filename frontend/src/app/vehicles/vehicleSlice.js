import { createSlice, isAnyOf, isPending, isRejected } from "@reduxjs/toolkit"
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
            const index = state.vehicles.findIndex(
                (vehicle) => vehicle._id === action.payload.data?._id,
            );
            if(index !== -1){
                state.vehicles[index] = action.payload.data
            }
            state.message ="Vehicle Updated Successfully"
        })
        .addCase(deleteVehicle.fulfilled, (state,action)=>{
            state.loading = false;
            state.vehicles = state.vehicles.filter(
                (vehicle) => vehicle._id !== action.payload.data?._id,
            );
            state.message ="Vehicle Deleted Successfully"
        })

        .addMatcher(
            isPending(createVehicle, deleteVehicle, getVehicle, getVehicles, updateVehicle),
            (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            },
        )
        .addMatcher(
            isRejected(createVehicle, deleteVehicle, getVehicle, getVehicles, updateVehicle),
            (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.error?.message || "Request failed";
                state.message = null;
            },
        )
        .addMatcher(
            isAnyOf(
                createVehicle.fulfilled,
                deleteVehicle.fulfilled,
                getVehicle.fulfilled,
                getVehicles.fulfilled,
                updateVehicle.fulfilled,
            ),
            (state) => {
                state.loading = false;
            },
        )
    }
})

export default vehicleSlice.reducer
