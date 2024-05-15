import { createSlice } from "@reduxjs/toolkit";
import defaultData from "data/bills.json";

const billSlice = createSlice({
  name: "category",
  initialState: {
    data: defaultData.reverse(),
    nextId: defaultData.length + 1,
  },
  reducers: {
    createBill: (state, action) => {
      let newBill = action.payload;
      newBill.id = state.nextId++;
      state.data.unshift(newBill);
    },
    updateBill: (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.payload?.id) {
          item = action.payload;
        }
        return item;
      });
    },
    deleteBill: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { createBill, updateBill, deleteBill } = billSlice.actions;

export default billSlice.reducer;
