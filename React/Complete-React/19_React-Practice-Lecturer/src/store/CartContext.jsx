import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  // 업데이트된 상태를 반환.
  if (action.type === "ADD_ITEM") {
    // 상태를 업데이트해서 음식 메뉴 항목을 더함.
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); // 이미 상태 항목에 같은 아이디를 갖는 음식이 있다면 해당 음식의 인덱스를 저장. -> 차후에 해당 음식을 오버라이딩하는데 이용.

    const updatedItems = [...state.items]; // 이전 배열의 복사본

    if (existingCartItemIndex > -1) {
      // 없는 경우에는 -1을 리턴하기 때문에 해당 조건문은 해당 항목이 이미 배열에 있다는 의미이다.
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem; // 기존의 상품을 오버라이딩.
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    // 상태에서 음식 메뉴 항목을 지움
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    ); // 이미 상태 항목에 같은 아이디를 갖는 음식이 있다면 해당 음식의 인덱스를 저장. -> 차후에 해당 음식을 지우는데 이용

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      // 하나가 있다면 지웠을 때 장바구니에서 해당 음식이 지워져야함
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem; // 오버라이딩
    }
    return { ...state, items: updatedItems };
  }

  return state;
}

export function CartContextProvider({ children }) {
  // 더 복잡한 상태를 간단하게 다룰 수 있도록 함. 상태 관리 로직을 이 컴포넌트 함수 밖으로 내보내는 것이 쉬워짐.
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] }); // 리듀서 함수, 초기 상태값

  const cartContext = {
    items: cart.items,
    addItem: addItem,
    removeItem,
  };

  function addItem(item) {
    dispatchCartAction({
      type: "ADD_ITEM",
      item: item, // item으로해도 된다.
    });
  }

  function removeItem(id) {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id,
    });
  }

  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
