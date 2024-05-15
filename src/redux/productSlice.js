import { createSlice } from "@reduxjs/toolkit";
import defaultData from "data/products.json";

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: defaultData.reverse(),
    nextId: defaultData.length + 1,
  },
  reducers: {
    createProduct: (state, action) => {
      let newProduct = action.payload;
      newProduct.id = state.nextId++;
      state.data.unshift(newProduct);
    },
    updateProduct: (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.payload?.id) {
          item = action.payload;
        }
        return item;
      });
    },
    deleteProduct: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { createProduct, updateProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
