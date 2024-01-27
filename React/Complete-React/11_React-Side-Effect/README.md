# Dealing with Side Effect | 부수 효과 다루기, `useEffect` 훅 사용하기

[📌 Side Effect(부수 효과)](#-side-effect부수-효과)<br>
[📌 `useEffect`](#📌-useeffect)<br>
<br>

## 📌 Side Effect(부수 효과)

### 📖 Side Effect(부수 효과)란 무엇인가?

- 앱이 제대로 동작하기 위해 실행되어야 하지만 현재의 컴포넌트 렌더링 과정에 직접적인 영향을 미치지는 않는 "작업"이다.

#### 💎 App.jsx | 유저의 위치 정보 받아오기

```jsx
import { sortPlacesByDistance } from "./loc.js";

function App() {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  // 부수효과 => 사용자의 위치가 이 앱에 필요하긴 하지만 컴포넌트 함수의 주 목적(JSX 렌더링)과는 직접적인 관계가 없다.
  navigator.geolocation.getCurrentPosition((position) => {
    const sortedPlaces = sortPlacesByDistance(
      AVAILABLE_PLACES,
      position.coords.latitude,
      position.coords.longitude
    );
    setAvailablePlaces(sortedPlaces); // 앱 컴포넌트 재실행 -> 계속 사용자 위치 파악을 할 것이다 => 무한 루프.
  });

  return (
    <>
      {/* ... */}
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={AVAILABLE_PLACES}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}
```

- 주석에서 설명했듯이, 사용자의 위치 정보를 받아오면 `useState`에 의해서 상태가 업데이트가 되고 앱 컴포넌트가 재실행된다. 컴포넌트가 재실행되면 또다시 사용자 위치 정보를 받게 되면서 무한 루프에 빠지게 된다.
- 이러한 부수 효과의 문제점을 해결하기 위해서 `useEffect` 훅을 배울 것이다.

<br>

## 📌 `useEffect`

### 📖 `useEffect`를 사용하는 Side Effect(부수 효과)

#### 💎 App.jsx

