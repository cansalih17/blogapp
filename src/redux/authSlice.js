import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    emailFunc(state, action) {
      state.email = action.payload;
    },
  },
});

export const { login, logout, emailFunc } = authSlice.actions;
export default authSlice.reducer;
