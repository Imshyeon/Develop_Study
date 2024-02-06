// import { Component } from "react";
import classes from "./Counter.module.css";
import { useSelector, useDispatch, connect } from "react-redux";
// useSelector : react-redux 팀이 만든 커스텀 훅으로 저장소가 관리하는 상태 부분을 우리가 자동으로 선택할 수 있다.
// useStore도 있으나 useSelector가 사용하기 더 편하다.
// 만약 함수형 컴포넌트가 아닌 클래스 기반 컴포넌트를 사용한다면 useSelector 대신 connect를 사용할 수 있다.

const Counter = () => {
  // 해당 함수를 react-redux가 수행. 이 컴포넌트에 필요로 하는 상태 부분을 받아온다.
  // useSelector를 사용할 때 react-redux는 이 컴포넌트를 위해 리덕스 저장소에 자동으로 구독을 설정함.
  // 이제 이 컴포넌트는 리덕스 저장소에서 데이터가 변경될 때마다 자동으로 업데이트되고 최신 카운터를 받는다.
  const counter = useSelector((state) => state.counter);
  const show = useSelector((state) => state.showCounter);

  const dispatch = useDispatch(); // 실행할 수 있는 dispatch function을 반환한다.
  // -> 반환된 dispatch 함수는 redux store에 대한 action을 보낸다.

  const incrementHandler = () => {
    dispatch({ type: "increment" });
  };

  const increseHandler = () => {
    dispatch({ type: "increase", amount: 5 });
  };

  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };

  const toggleCounterHandler = () => {
    dispatch({ type: "toggle" });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div className="counter">
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increseHandler}>Increse by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// class Counter extends Component {
//   incrementHandler() {
//     this.props.increment();
//   }

//   decrementHandler() {
//     this.props.decrement();
//   }

//   toggleCounterHandler() {}
//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div className="counter">
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler.bind(this)}>
//           Toggle Counter
//         </button>
//       </main>
//     );
//   }
// }

// // 리덕스 상태를 받는 함수 => useSelector와 비슷
// const mapStateToProps = (state) => {
//   return {
//     counter: state.counter,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch({ type: "increment" }),
//     decrement: () => dispatch({ type: "decrement" }),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
// // 커넥트가 실행되면 새로운 함수를 그 값으로 리턴한다.
