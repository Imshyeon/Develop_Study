import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./layout.js";
import productReducer from "./product.js";

const store = configureStore({
  reducer: {
    layout: layoutReducer,
    product: productReducer,
  },
});

export default store;
