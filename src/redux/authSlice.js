import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    user: {},
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
      localStorage.setItem("userId", action.payload.id);
    },
    logout: (state, action) => {
      state.isLogin = false;
      localStorage.removeItem("userId");
    },
  },
});

export const { login, logout } = cartSlice.actions;

export default cartSlice.reducer;
