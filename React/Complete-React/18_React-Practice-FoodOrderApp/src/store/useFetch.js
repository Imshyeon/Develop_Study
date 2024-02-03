import { useEffect, useState } from "react";

export default function useFetch() {
  const [mealDatas, setMealDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

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

  return {
    isFetching,
    mealDatas,
    error,
  };
}
