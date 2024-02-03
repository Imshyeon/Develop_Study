import { useContext } from "react";
import MealItem from "./MealItem";
import { CartContext } from "../assets/context/cart-context";

export default function Meals({ isFetching, error }) {
  const { items: mealDatas, onAddCart: handleAddCart } =
    useContext(CartContext);

  return (
    <div id="meals">
      {isFetching && <p>상품을 불러오는 중입니다.</p>}
      {!isFetching &&
        !error &&
        mealDatas.map((mealItem) => {
          return (
            <MealItem
              key={mealItem.id}
              id={mealItem.id}
              image={mealItem.image}
              name={mealItem.name}
              price={mealItem.price}
              description={mealItem.description}
              onAddCart={handleAddCart}
            />
          );
        })}
      ;
    </div>
  );
}
