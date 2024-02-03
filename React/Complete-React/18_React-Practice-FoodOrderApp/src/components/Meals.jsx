import { useEffect, useState, useRef } from "react";
import MealItem from "./MealItem";
import MessageModal from "./MessageModal";

export default function Meals() {
  const [mealDatas, setMealDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  const dialog = useRef();

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
      <MessageModal
        ref={dialog}
        title="오류가 발생했습니다🥲"
        message={error.message}
      />
    );
  }

  return (
    <div id="meals">
      {isFetching && (
        <MessageModal
          ref={dialog}
          title="상품을 불러오는 중입니다."
          message="상품을 불러오는 중이니 조금만 기다려 주십시오."
        />
      )}
      {mealDatas.map((mealItem) => {
        return (
          <MealItem
            key={mealItem.id}
            image={mealItem.image}
            name={mealItem.name}
            price={mealItem.price}
            description={mealItem.description}
          />
        );
      })}
      ;
    </div>
  );
}
