import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter.js";
import authReducer from "./auth.js";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});
// configureStore : createStore처럼 store를 만든다.
// 여러 개의 리듀서를 하나의 리듀서로 쉽게 합칠 수 있다.
// configureStore가 모든 리듀서를 하나의 큰 리듀서로 병합할 것이다.

export default store;
