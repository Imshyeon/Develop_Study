import { createSlice } from "@reduxjs/toolkit";

const initialLayoutState = { isClicked: false };
const layoutSlice = createSlice({
  name: "layout",
  initialState: initialLayoutState,
  reducers: {
    show(state) {
      state.isClicked = true;
    },
    notShow(state) {
      state.isClicked = false;
    },
  },
});

export const layoutActions = layoutSlice.actions;
export default layoutSlice.reducer;
