import { createSlice } from "@reduxjs/toolkit";

const initialLayoutState = { cartIsVisible: false };
const uiSlice = createSlice({
  name: "ui",
  initialState: initialLayoutState,
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
