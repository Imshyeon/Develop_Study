import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn(); // useEffect로 정의되지 않는 외부 데이터. -> 의존성 추가
        setFetchedData(data);
      } catch (error) {
        setError({
          message: error.message || "Failed to fetch data.",
        });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  }; // 상태 값 반환
}
