import { createSlice } from "@reduxjs/toolkit";
import defaultData from "data/users.json";

const productSlice = createSlice({
  name: "user",
  initialState: {
    data: defaultData.reverse(),
    nextId: defaultData.length + 1,
  },
  reducers: {
    createUser: (state, action) => {
      let newUser = action.payload;
      newUser.id = state.nextId++;
      state.data.unshift(newUser);
    },
    updateUser: (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.payload?.id) {
          item = action.payload;
        }
        return item;
      });
    },
    deleteUser: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { createUser, updateUser, deleteUser } = productSlice.actions;

export default productSlice.reducer;
