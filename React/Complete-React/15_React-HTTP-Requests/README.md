# Data Fetching & HTTP Requests

[📌 데이터베이스 연결/해지하는 방법](#-데이터베이스-연결해지하는-방법)<br>
[📌 초기 프로젝트 & 임시 백엔드 API 사용하기](#-초기-프로젝트--임시-백엔드-api-사용하기)<br>
[📌 리액트 앱 - 백엔드 앱 연결하기](#-리액트-앱---백엔드-앱-연결하기)<br>
<br>

## 📌 리액트 앱과 데이터베이스 연결/해지하는 방법

- 직접적으로는 하지 않는다. 직접하면 보안 상의 이슈가 있기 때문!
- 데이터베이스나 공유된 데이터를 담은 파일 시스템에 직접 접근하는 것보다 백엔드 서버와 소통하는 것이 좋다.
- 프론트와 백엔드를 연결하기 위해선 HTTP Request를 통해야 한다.
- HTTP 요청을 보낼 때 백엔드가 허용하거나 수락한 것만 보낼 수 있다. 백엔드가 특정 요청을 거부한다면 해당 요청은 불가능하다.

## 📌 초기 프로젝트 & 임시 백엔드 API 사용하기

1. `npm install`
2. `npm run dev`
3. backend/app.js

```javascript
import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/places", async (req, res) => {
  const fileContent = await fs.readFile("./data/places.json");

  const placesData = JSON.parse(fileContent);

  res.status(200).json({ places: placesData });
});

app.get("/user-places", async (req, res) => {
  const fileContent = await fs.readFile("./data/user-places.json");

  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

app.put("/user-places", async (req, res) => {
  const places = req.body.places;

  await fs.writeFile("./data/user-places.json", JSON.stringify(places));

  res.status(200).json({ message: "User places updated!" });
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
```

🔗 [HTTP 개요](https://developer.mozilla.org/ko/docs/Web/HTTP/Overview)<br>
🔗 [GET 메서드](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/GET)<br>
🔗 [POST 메서드](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/POST)

<br>

## 📌 리액트 앱 - 백엔드 앱 연결하기

### 📖 앱의 데이터 Fetching을 위한 준비

`npm run dev`를 한 터미널 이외에 다른 터미널은 연 뒤 다음의 명령어 실행

1. `cd ./backend`
2. `node app.js` : 백엔드 서버 시작

이렇게 실행 중이 두 프로세스 모두 백엔드에 연결해야 한다.

#### 💎 Available Places를 Fetching 하기

- 리액트 코드 내에서 HTTP 요청을 백엔드 코드로 보내서 데이터 목록을 가져올 것이다.
  <br>

- localStorage는 동기적으로 데이터를 바로 받아올 수 있다. 하지만 백엔드를 이렇게 데이터를 받을 수 없다.
- 인터넷을 통해서(HTTP 요청) 오기 때문에 약간의 시간차가 발생한다. &rarr; 동기적으로는 안되고 비동기적으로 처리해야한다.

```jsx
// src/component/AvailablePlaces.jsx
import { useState } from "react";
import Places from "./Places.jsx";

const places = localStorage.getItem("places");

export default function AvailablePlaces({ onSelectPlace }) {
  //const [availablePlaces, setAvailablePlaces] = useState(places); // 로컬 사용하는 경우
  // 비동기적으로 사용한다 = 데이터를 가져오고 나서야 상태를 업데이트 하겠다. 라는 의미
  const [availablePlaces, setAvailablePlaces] = useState([]);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
```

<br>

### 📖 HTTP 요청을 보내기

```js
// backend/app.js
app.get("/places", async (req, res) => {
  const fileContent = await fs.readFile("./data/places.json");

  const placesData = JSON.parse(fileContent);

  res.status(200).json({ places: placesData });
});

// src/component/AvailablePlaces.jsx
import { useState } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  // 1. then을 이용하는 방법 - await/async를 사용하는 방법도 있다.
  fetch("http://localhost:3000/places")
    .then((response) => {
      return response.json(); // json 형식의 데이터를 뽑아온다. => 이 메서드는 또다른 프로미스를 반환
    })
    .then((resData) => {
      setAvailablePlaces(resData.places);
    }); // 브라우저 제공 : HTTP 요청을 다른 서버들로 보낸다.
  // fetch를 프로미스를 반환. Promise가 response 객체를 감싼다.

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
```

- 그러나 위처럼 코드를 작성하면 무한루프에 빠진다. &rarr; 컴포넌트 함수에 직접적으로 fetch를 써서 불러오면, 컴포넌트 함수가 실행될 때마다 계속 실행될 것이다.
- 따라서 useEffect를 사용해서 무한 루프를 방지할 수 있다.

<br>

### 📖 useEffect로 HTTP 요청(GET 요청) 전송하기

#### 💎 AvailablePlaces.jsx

```jsx
// src/components/AvailablePlaces.jsx
import { useState, useEffect } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/places")
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setAvailablePlaces(resData.places);
      });
  }, []); // 컴포넌트가 실행된 이후에 실행한다. 의존성은 비어있어야 한다. 딱 한번 처음에 실행된다.

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
```

#### 💎 이미지 처리하기

```json
// backend/data/places.json
[
  {
    "id": "p1",
    "title": "Forest Waterfall",
    "image": {
      "src": "forest-waterfall.jpg",
      "alt": "A tranquil forest with a cascading waterfall amidst greenery."
    },
    "lat": 44.5588,
    "lon": -80.344
  },...
]
```

- 이 데이터에서 보면 image의 src는 단순히 이미지 파일의 이름만을 담고있다.
- 이미지를 사용할 때 단순히 이미지 폴더로 직접 요청해서 보낼 수 없다.
- 왜냐하면 기본적으로 모든 백엔드 프로젝트 코드와 파일 구조는 이용자가 접근할 수 없기 때문이다.

```jsx
// src/components/Places.jsx
export default function Places({ title, places, fallbackText, onSelectPlace }) {
  console.log(places);
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                {/* src={place.img.src}에서 다음과 같이 변경 */}
                <img
                  src={`http://localhost:3000/${place.image.src}`}
                  alt={place.image.alt}
                />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
```

- localhost:3000으로 백엔드를 가리키는 URL을 작성한 뒤 place.image.src로 파일이름을 지정하면 이미지가 정상적으로 파일 요청을 보내고 받을 것이다.

#### 💎 결과

![결과1](./src/assets/fetch.gif)

<br>

### 📖 `async / await` 사용하기

#### 💎 AvailablePlaces.jsx

```jsx
import { useState, useEffect } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      const response = await fetch("http://localhost:3000/places");
      const resData = await response.json();
      setAvailablePlaces(resData.places);
    }

    fetchPlaces(); // 정의 후 생성한 함수 실행
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
```

<br>

### 📖 로딩 State 다루기

- 어떤 이유로 인해 데이터를 패칭하는데 오래 걸린다면 사용자에게 좋은 경험을 주지 않는다. 따라서 오래 걸릴 경우를 대비해 로딩을 추가하여 사용자에게 프로그램이 동작하고 있음을 보여주자.

#### 💎 AvailablePlaces.jsx

```jsx
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
```

#### 💎 Places.jsx

```jsx
export default function Places({
  title,
  places,
  fallbackText,
  onSelectPlace,
  isLoading,
  loadingText,
}) {
  console.log(places);
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {/* 로딩과 관련된 조건 및 출력값 설정 */}
      {isLoading && <p className="fallback-text">{loadingText}</p>}
      {!isLoading && places.length === 0 && (
        <p className="fallback-text">{fallbackText}</p>
      )}
      {!isLoading && places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <img
                  src={`http://localhost:3000/${place.image.src}`}
                  alt={place.image.alt}
                />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
```

#### 💎 결과

![로딩](./src/assets/loading.gif)

- 로딩되는 동안 로딩 텍스트가 나온 것을 확인할 수 있다.
