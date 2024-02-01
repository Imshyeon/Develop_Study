import { useState, useEffect } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    async function fetchPlaces() {
      const response = await fetch("http://localhost:3000/places");
      const resData = await response.json();
      setAvailablePlaces(resData.places);
      setIsFetching(false); // 데이터를 다 받아온 경우
    }

    fetchPlaces(); // 정의 후 생성한 함수 실행
  }, []);

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
