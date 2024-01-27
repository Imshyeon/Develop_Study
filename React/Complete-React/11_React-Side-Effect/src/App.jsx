import { useRef, useState, useEffect } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";

import { sortPlacesByDistance } from "./loc.js";

// 앱이 업데이트 될때마다 실행될 필요가 없으므로 컴포넌트 밖에서 작성됨.
const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  // useEffect(() => {
  //   const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
  //   const storedPlaces = storedIds.map((id) =>
  //     AVAILABLE_PLACES.find((place) => place.id === id)
  //   );
  //   setPickedPlaces(storedPlaces);
  // }, []); // 초기에만 실행. => 불필요한 useEffect => navigator는 getCurrentPosition 함수의 특성상 약간의 시간차가 발생하지만 이 부수효과 코드는 시간차 없이 즉시 실행된다.

  useEffect(() => {
    // 부수효과 => 사용자의 위치가 이 앱에 필요하긴 하지만 컴포넌트 함수의 주 목적(JSX 렌더링)과는 직접적인 관계가 없다.
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvailablePlaces(sortedPlaces); // 앱 컴포넌트 재실행 -> 계속 사용자 위치 파악을 할 것이다 => 무한 루프.
    });
  }, []); // 값을 반환하지 않는다.
  // 첫번째 인수 : 부수효과 코드를 감쌀 함수
  // 두번째 인수 : dependency(의존성) 배열 => 현재 의존성이 비어있다 = 의존성이 없다 = 변화할 수 없다. => 리액트는 해당 Effect 함수를 재실행하지 않는다. 오직 처음으로 실행된 이후에만 딱 한번 실행된다.
  // 그렇다고 의존성 배열을 까먹고 작성하면 안된다. => 무한 루프가 됨.

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    // 부수 효과 -> useEffect로 코들르 묶을 필요가 없다.
    // 일단 이미 함수 안에 들어와있는 코드이다.(훅의 규칙 : 중첩된 함수나 if문 등에서 리액트 훅을 사용할 수 없다. => 컴포넌트의 root에서만 사용가능하다.)
    // 해당 부수효과의 실행 조건은 아이템을 클릭해야지 실행된다. && 상태를 업데이트하지 않으므로 무한 루프에 빠지지도 않는다.
    // 따라서 이 부수효과는 사용자 상호작용이 있어야만 작동을 하기에 설령 상태가 업데이트가 되더라도 무한 루프를 만들어내지 않는다. -> 모든 부수효과에 useEffect가 필요하지 않는다.
    // useEffect 훅이 필요한 경우는 무한 루프를 방지하기 위해서이거나 컴포넌트 함수가 최소 한번은 실행된 이후에 작동이 가능한 코드가 있을 때 뿐이다.
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    if (storedIds.indexOf(id) === -1) {
      // 이미 해당되는 장소가 있는지 확인(indexOf) -> 없다면..(-1)
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false)

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    ); // filter : 조건문이 만족되면 삭제하고자 하는 항목이 아니다 -> true 반환 => 항목을 그대로 유지
    // 조건문이 맞지 않다면(id가 매치되면) 삭제하고자 하는 항목이다 -> false 반환 => 항목에서 배제.
  }

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
