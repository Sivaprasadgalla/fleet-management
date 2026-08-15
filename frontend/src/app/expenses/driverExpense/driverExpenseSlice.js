import { createSlice, isPending, isRejected } from "@reduxjs/toolkit"
import { createExpense, deleteExpense, getExpenses, updateExpense } from "./driverExpenseAction"

const initialState ={
    driverExpesnes :[],
    loading:false,
    error:null,
    message:null 
}

const driverExpenseSlice = createSlice({
    name: "driverExpenses",
    initialState,
    reducers:{},
    extraReducers : (builder)=>{
        builder 
        .addCase(getExpenses.fulfilled, (state,action)=>{
            state.loading = false;
            state.driverExpesnes = action.payload;
        })
        .addCase(createExpense.fulfilled , (state,action)=>{
            state.loading = false;
            state.driverExpesnes.push(action.payload);
            state.message = "Driver Expenses Created Successfully"
        })
        .addCase(updateExpense.fulfilled, (state,action)=>{
            state.loading = false;
            const index = state.driverExpesnes.findIndex(expesne._id === action.payload._id);
            if(index){
                state.driverExpesnes[index] = action.payload;
            }
            state.message = "Driver Expenses Updated Successfully"
        })
        .addCase(deleteExpense.fulfilled, (state,action)=>{
            state.loading = false;
            state.driverExpesnes = state.driverExpesnes.filter(expense._id !== action.payload._id);
            state.message = "Driver Expense Deleted Successfully"
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

export default driverExpenseSlice.reducer