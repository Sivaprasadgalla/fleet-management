import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  changePassword,
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "./userActions";

const initialState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  message: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Password Updated Successfully";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })

      //getUser

      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload.data;
      })

      //create user

      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.message = "User Created Successfully";
      })

      //update user
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id,
        );

        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.message = "User Updated Successfully";
      })

      //delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id,
        );
        state.message = "User Deleted Successfully";
      })

      .addMatcher(isPending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addMatcher(isRejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload || action.payload.message;
      });
  },
});

export default usersSlice.reducer;
