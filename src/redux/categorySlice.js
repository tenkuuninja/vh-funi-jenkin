import { createSlice } from "@reduxjs/toolkit";
import defaultData from "data/categories.json";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: defaultData.reverse(),
    nextId: defaultData.length + 1,
  },
  reducers: {
    createCategory: (state, action) => {
      let newCategory = action.payload;
      newCategory.id = state.nextId++;
      state.data.unshift(newCategory);
    },
    updateCategory: (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.payload?.id) {
          item = action.payload;
        }
        return item;
      });
    },
    deleteCategory: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { createCategory, updateCategory, deleteCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
