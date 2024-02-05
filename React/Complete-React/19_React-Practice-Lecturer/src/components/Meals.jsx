import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);
  // 그냥 {}으로 config를 설정하지만 해당 객체는 계속해서 재생성되는 객체이다.
  // 따라서 해당 컴포넌트 밖에서 requestConfig를 설정하여 빈 객체를 전달

  console.log(loadedMeals);

  if (isLoading) {
    return <p>Fetching Meals...</p>;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
