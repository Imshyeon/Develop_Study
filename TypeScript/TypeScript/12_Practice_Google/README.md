# 장소 선택 및 공유 앱 만들기 - Google 맵 이용

[📌 장소 선택 및 공유 앱 만들기](#-장소-선택-및-공유-앱-만들기)<br>
<br>

## 📌 장소 선택 및 공유 앱 만들기

### 📖 사용자 입력 받기

```ts
// app.ts
const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // Google API
}

form.addEventListener("submit", searchAddressHandler);
```

<br>

### 📖 [Axios](https://axios-http.com/kr/docs/intro)를 이용해서 입력된 주소의 좌표 가져오기

- 설치 : `npm install --save axios`

🔗 [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/start?hl=ko&_gl=1*j68qba*_up*MQ..*_ga*MjAzMzQzNTg5MS4xNzEwMzk3MTYy*_ga_NRWSTWS78N*MTcxMDM5NzE2MS4xLjAuMTcxMDM5NzE2MS4wLjAuMA..)

```ts
import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "";

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // Google API
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status != "OK") {
        throw new Error("데이터를 가져올 수 없다.");
      }
      const coordinates = response.data.results[0].geometry.location;
      console.log(coordinates);
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
```

<br>

### 📖 Google 지도로 지도 렌더링

🔗 [Google Map API](https://developers.google.com/maps/documentation/javascript/overview?hl=ko&_gl=1*1ildyg8*_up*MQ..*_ga*NTc0NDgwOTA1LjE3MTAzOTg0MDU.*_ga_NRWSTWS78N*MTcxMDM5ODQwNS4xLjAuMTcxMDM5ODQwNS4wLjAuMA..#maps_map_simple-typescript)

🔗 [@types/google.maps](https://www.npmjs.com/package/@types/google.maps)

- 설치 : `npm install --save-dev @types/google.maps`

```ts
// app.ts

import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "";

type GoogleGeocodingResponse = {
  results: {
    geometry: { location: { lat: number; lng: number } };
    formatted_address: string;
  }[];
  status: "OK" | "ZERO_RESULTS";
};

// declare var google: any;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // Google API
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status != "OK") {
        throw new Error("데이터를 가져올 수 없다.");
      }
      const coordinates = response.data.results[0].geometry.location;
      const title = response.data.results[0].formatted_address;
      console.log(coordinates);

      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: coordinates,
          zoom: 8,
        }
      );

      new google.maps.Marker({
        map: map,
        position: coordinates,
        title: title,
      });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
```

![result](./googleMap.gif)
