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
    cartItems: cartDatas,
  };

  if (error) {
    return (
      <Error title="상품을 불러오는데 실패했습니다." message={error.message} />
    );
  }

  function handleAddCart(item) {
    setCartDatas((prevCart) => {
      return [...prevCart, item];
    });
  }

  return (
    <CartContext.Provider value={CartCtx}>
      <Header />
      <Meals isFetching={isFetching} error={error} />
    </CartContext.Provider>
  );
}

export default App;
