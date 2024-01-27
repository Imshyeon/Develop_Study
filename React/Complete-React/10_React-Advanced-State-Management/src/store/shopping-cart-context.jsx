import { createContext } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {}, // 실제로 사용되진 않지만 자동완성 기능에 도움을 주는 용도로 가짜 함수 추가.
}); // 컨텍스트 값 생성.
// 초기값으로 사용할 특정 값을 createContext에 전달하여 리액트 앱에서 이 컨텍스트로 감쌀 모든 컴포넌트에 해당 값이 전달되도록 할 수도 있다.
// 숫자, 문자열, 객체, 배열 모두 가능하다.

// 외부에서도 사용가능하도록 export
