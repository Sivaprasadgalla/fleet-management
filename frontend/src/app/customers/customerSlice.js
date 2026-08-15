import { createSlice, isPending, isRejected } from "@reduxjs/toolkit"
import { createCustomer, deleteCustomer, getCustomer, getCustomers, updateCustomer } from "./customerAction"

const initialState ={
    customers : [],
    selectedCustomer : null,
    loading: false,
    error: null,
    message: null 
}

const customerSlice = createSlice({
    name : "customers",
    initialState,
    reducers : {},
    extraReducers : (builder)=> {
        builder
        .addCase(getCustomers.fulfilled, (state, action)=> {
            state.loading= false;
            state.customers = action.payload.data
        })
        .addCase(getCustomer.fulfilled, (state,action)=>{
            state.loading = false;
            state.selectedCustomer = action.payload.data
        })
        .addCase(createCustomer.fulfilled, (state,action)=>{
            state.loading = false;
            state.customers.push(action.payload.data)
             state.message ="Customer Created Successfully"
        })
        .addCase(updateCustomer.fulfilled, (state,action)=>{
            state.loading = false;
            const index= state.customers.findIndex((customer) => customer._id === action.payload.data?._id);
            if(index !== -1){
                state.customers[index] = action.payload.data;
            }
             state.message ="Customer Updated Successfully"
        })
        .addCase(deleteCustomer.fulfilled, (state,action)=> {
            state.loading = false;
            state.customers = state.customers.filter((customer) => customer._id !== action.meta.arg.id);
             state.message ="Customer Deleted Successfully"
        })

        .addMatcher(isPending, (state)=>{
            state.loading = true;
            state.error= null;
            state.message =null;
        })

        .addMatcher(isRejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload || action.payload.message;
            state.message =null;
        })
    }
})

export default customerSlice.reducer
