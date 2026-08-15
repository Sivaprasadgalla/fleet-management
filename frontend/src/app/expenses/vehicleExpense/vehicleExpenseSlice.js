import { createSlice, isPending, isRejected } from "@reduxjs/toolkit"
import { createExpense, deleteExpense, getExpenses, updateExpense } from "./vehicleExpenseAction"

const initialState ={
    vehicleExpesnes :[],
    loading:false,
    error:null,
    message:null 
}

const vehicleExpenseSlice = createSlice({
    name: "vehicleExpenses",
    initialState,
    reducers:{},
    extraReducers : (builder)=>{
        builder 
        .addCase(getExpenses.fulfilled, (state,action)=>{
            state.loading = false;
            state.vehicleExpesnes = action.payload;
        })
        .addCase(createExpense.fulfilled , (state,action)=>{
            state.loading = false;
            state.vehicleExpesnes.push(action.payload);
            state.message = "Vehicle Expenses Created Successfully"
        })
        .addCase(updateExpense.fulfilled, (state,action)=>{
            state.loading = false;
            const index = state.vehicleExpesnes.findIndex(expesne._id === action.payload._id);
            if(index){
                state.vehicleExpesnes[index] = action.payload;
            }
            state.message = "Vehicle Expenses Updated Successfully"
        })
        .addCase(deleteExpense.fulfilled, (state,action)=>{
            state.loading = false;
            state.vehicleExpesnes = state.vehicleExpesnes.filter(expense._id !== action.payload._id);
            state.message = "Vehicle Expense Deleted Successfully"
        })

        .addMatcher(isPending, (state)=>{
            state.loading = true;
            state.message=null;
            state.error = null;
        })

        .addMatcher(isRejected, (state,action)=>{
            state.loading = false;
            state.message = null;
            state.error = action.payload || action.payload.message;
        })
    }
})

export default vehicleExpenseSlice.reducer