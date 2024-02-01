import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsFetching(true); // fetchPlaces안에 작성해도 됨
    async function fetchPlaces() {
      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        if (!response.ok) {
          // 성공적인 응답(200,300 응답코드)
          // 실패 = 400, 500
          throw new Error("Failded to fetch places"); // 이렇게 하면 앱 충돌
        }

        setAvailablePlaces(resData.places);
      } catch (error) {
        // 에러가 발생할 경우 실행해야할 코드 -> 앱 충돌을 막고 대신에 실행할 코드
        // react에서 catch는 에러에 대한 UI 업데이트
        setError({
          message:
            error.message || "Could not fetch places, plz try again later.",
        });
      }

      setIsFetching(false); // 데이터를 다 받아온 경우 => 에러가 나든 안나든 로딩은 끝낼 거임<div className=""></div>
    }

    fetchPlaces(); // 정의 후 생성한 함수 실행
  }, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
