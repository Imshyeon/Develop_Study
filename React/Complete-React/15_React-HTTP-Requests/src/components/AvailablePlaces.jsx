import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsFetching(true); // fetchPlaces안에 작성해도 됨
    async function fetchPlaces() {
      try {
        const places = await fetchAvailablePlaces();

        // 여기선 async, await을 사용하지 않고 콜백함수를 사용.
        // setIsFetching 상태 업데이트 함수 위치를 변경해야한다. => 시간차로 인해서 이 상태 업데이트 함수가 더 일찍 실행될 수 있다.
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false); // 분류 후 표시가 끝난 뒤에 로딩 종료
        });
      } catch (error) {
        // 에러가 발생할 경우 실행해야할 코드 -> 앱 충돌을 막고 대신에 실행할 코드
        // react에서 catch는 에러에 대한 UI 업데이트
        setError({
          message:
            error.message || "Could not fetch places, plz try again later.",
        });

        setIsFetching(false); // 오류가 발생했다면 오류 상태 업데이트 후 로딩 종료
      }
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
