import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../users/userActions";

export const getPersistedUser = () => {
  try { return JSON.parse(localStorage.getItem("fleetUser")) || null; }
  catch { localStorage.removeItem("fleetUser"); return null; }
};

const savedUser = getPersistedUser();

const initialState = {
  user: savedUser,
  accessToken: localStorage.getItem("accessToken"),
  loading: false,
  error: null,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateUser(state, action) {
      const persistedUser = action.payload || getPersistedUser();
      if (persistedUser) state.user = persistedUser;
    },
    updateLoggedInUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("fleetUser", JSON.stringify(action.payload));
    },
    logOut(state) {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("fleetUser");
    },
  },
  extraReducers: (builder) => {
    builder

      //login actions
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.message = "User Logged In Successfully";
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("fleetUser", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false, 
        state.error = action.payload;
      })

      //register actions

      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.message = "User Registered Successfully";
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {hydrateUser, logOut, updateLoggedInUser} = authSlice.actions
export default authSlice.reducer
