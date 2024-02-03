import Error from "./components/Error";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContext } from "./assets/context/cart-context";
import { useState, useEffect, useContext } from "react";

function App() {
  const [mealDatas, setMealDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  const CartCtx = {
    items: mealDatas,
    onAddCart: handleAddCart,
  };

  useEffect(() => {
    setIsFetching(true);
    async function fetchMeals() {
      try {
        const response = await fetch("http://localhost:3000/meals");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("상품을 불러오는데 실패했습니다.");
        }
        setMealDatas(resData);
      } catch (error) {
        setError({
          message: error.message || "상품을 불러오는데 실패했습니다.",
        });
      }

      setIsFetching(false);
    }

    fetchMeals();
  }, []);

  if (error) {
    return (
      <Error title="상품을 불러오는데 실패했습니다." message={error.message} />
    );
  }

  function handleAddCart(itemId, itemInfo) {
    console.log(`Add to Cart button : ${itemId} - ${itemInfo}`);
  }

  return (
    <CartContext.Provider value={CartCtx}>
      <Header />
      <Meals isFetching={isFetching} error={error} />
    </CartContext.Provider>
  );
}

export default App;
