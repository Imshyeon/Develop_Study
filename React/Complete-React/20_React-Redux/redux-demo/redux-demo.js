const redux = require("redux");

// 초기에 실행될 때 초기 상태값을 지정
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};
// 리듀서 함수
// 표준 자바스크립트 함수이지만 리덕스 라이브러리에 의해 호출될 것
// 항상 2개의 입력(파라미터)를 받는다. 기존의 상태 + 발송된 액션
// 항상 새로운 상태 객체를 리턴해야 한다.
// -> 리듀서 함수는 순수한 함수여야 한다.동일한 입력 값을 넣으면 동일한 출력을 내보내야 한다.

const store = redux.createStore(counterReducer); // 저장소는 어떤 리듀서가 그 저장소를 변경하는지 알아야 한다.

// 구독자
const counterSubscriber = () => {
  const latestState = store.getState(); // createStore()로 생성된 저장소에서 업데이트 된 이후의 최신 상태 스냅샷을 제공
  console.log(latestState);
};

store.subscribe(counterSubscriber);

// 액션
store.dispatch({ type: "increment" }); // 액션(js Object로 식별자 역할을 하는 type 프로퍼티를 가진다.)을 발송하는 메서드
// node redux-demo.js => { counter: 2 } (초기 값은 counter:1 )

store.dispatch({ type: "decrement" });
