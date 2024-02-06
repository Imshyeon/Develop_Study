import { createSlice } from "@reduxjs/toolkit";

const initalProductState = { quantity: 0, price: 6 };

const productSlice = createSlice({
  name: "product",
  initialState: initalProductState,
  reducers: {
    addQty(state) {
      state.quantity++;
      console.log(state.quantity);
    },
    removeQty(state) {
      state.quantity--;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
