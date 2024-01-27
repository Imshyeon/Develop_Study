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

- `useEffect`의 첫 인수인 함수가 리액트로 인해 실행되는 시점은 앱 컴포넌트가 실행되고 나서 즉시 실행되지 않는다. &rarr; 앱 컴포넌트 함수의 실행이 모두 완료가 된 이후에 실행된다!

  > JSX 코드가 반환된 이후의 시점에서야 `useEffect`에 전달한 Side Effect 함수가 실행된다. &rarr; 리액트는 컴포넌트 함수의 실행이 완료된 후에 부수 효과 함수를 실행한다.

- 의존성(배열)의 값이 변화했을 경우에 한해서 `useEffect` 함수를 재실행한다.

```jsx
// App.jsx

import { useRef, useState, useEffect } from "react";
import { sortPlacesByDistance } from "./loc.js";

function App() {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

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
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}
```

- `useEffect( 부수효과 코드를 감쌀 함수, dependency(의존성) 배열 )`

  - 값을 반환하지 않는다.
  - 현재 의존성이 `[]`로 비어있다. === 의존성이 없다 === 변화할 수 없다. &rarr; 리액트는 해당 Effect 함수를 재실행하지 않는다. 오직 처음으로 실행된 이후에만 딱 한번 실행된다.
  - 그렇다고 의존성 배열을 아예 작성하지 않으면 안된다. 무한루프가 실행됨.

- `<Places fallbackText="Sorting places by distance..."/>` : 아직 장소 정렬이 되지 않았을 때 사용자에게 보여 줄 fallback(대체) 텍스트이다.

#### 💎 결과

![결과1](./src/assets/readme/useEffect1.gif)
