import { createSlice, configureStore } from "@reduxjs/toolkit";

const initailState = { counter: 0, showCounter: true };

// 전역 상태의 slice 미리 만들기
const counterSlice = createSlice({
  name: "counter",
  initialState: initailState,
  reducers: {
    increment(state) {
      // 바로 상태를 변경할 수 있다. => 그러나 상태를 직접 변경하는 것처럼 보일 뿐이다.
      // immer라는 내부 패키지를 이용해서 자동으로 원래있던 상태를 복제. -> 새로운 상태 객체를 생성하고 오버라이딩해준다.
      // 즉 보이기는 상태를 직접 변경하는 것처럼 보일 뿐 실제로 직접 변경하는 것은 아니다.
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.amount;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
// configureStore : createStore처럼 store를 만든다.
// 여러 개의 리듀서를 하나의 리듀서로 쉽게 합칠 수 있다.
// configureStore가 모든 리듀서를 하나의 큰 리듀서로 병합할 것이다.

export default store;
