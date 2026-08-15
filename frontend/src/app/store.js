import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import usersReducer from "./users/userSlice";
import driverReducer from './drivers/driverSlice'
import vehicleReducer from './vehicles/vehicleSlice'
import customerReducer from './customers/customerSlice'
import bookingReducer from './bookings/bookingSlice'
import driverExpenseReducer from './expenses/driverExpense/driverExpenseSlice'
import vehicleExpenseReducer from './expenses/vehicleExpense/vehicleExpenseSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    drivers: driverReducer,
    vehicles : vehicleReducer,
    customers : customerReducer,
    bookings : bookingReducer,
    driverExpenses : driverExpenseReducer,
    vehicleExpenses : vehicleExpenseReducer
  },
});

