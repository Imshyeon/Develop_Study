import { useState, useEffect } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");

      if (!response.ok) {
        //...
      }

      const meals = await response.json();
      setLoadedMeals(meals);
    }

    fetchMeals();
  }, []); // 외부 속성이나 상태 혹은 렌더링 도중 변화를 가져올 만한 값을 사용하지 않았기 때문에 의존성이 없다.
  // 외부 상태를 사용한 것은 setLoadedMeals인데 이는 리액트에서 자동으로 설정해준다.

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
