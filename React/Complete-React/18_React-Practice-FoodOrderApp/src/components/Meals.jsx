import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  const [mealDatas, setMealDatas] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");
      const resData = await response.json();
      setMealDatas(resData);
    }

    fetchMeals();
  }, []);

  return (
    <div id="meals">
      {mealDatas.map((mealItem) => {
        // console.log(mealItem);
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
    </div>
  );
}
