import Error from "./components/Error";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContext } from "./assets/context/cart-context";
import { useState } from "react";
import useFetch from "./store/useFetch";

function App() {
  const { mealDatas, error, isFetching } = useFetch();
  const [cartDatas, setCartDatas] = useState([]);

  const CartCtx = {
    items: mealDatas,
    onAddCart: handleAddCart,
    onDeleteCart: handleDeleteCart,
    cartItems: cartDatas,
  };

  if (error) {
    return (
      <Error title="상품을 불러오는데 실패했습니다." message={error.message} />
    );
  }

  function handleAddCart(item, cnt = 0) {
    setCartDatas(() => {
      return [
        ...cartDatas.filter((data) => data.id !== item.id),
        ((item["count"] = cnt + 1), item),
      ];
    });
  }

  function handleDeleteCart(item, cnt) {
    setCartDatas(() => {
      return [
        ...cartDatas.filter((data) => data.id !== item.id),
        ((item["count"] = cnt - 1), item),
      ];
    });
  }
  console.log(cartDatas);

  return (
    <CartContext.Provider value={CartCtx}>
      <Header />
      <Meals isFetching={isFetching} error={error} />
    </CartContext.Provider>
  );
}

export default App;
