import { Map } from "./UI/Map.js";

class LoadedPlace {
  constructor(coordinates, address) {
    new Map(coordinates);
    const headerTitleEl = document.querySelector("header h1");
    headerTitleEl.textContent = address;
  }
}

const url = new URL(location.href); // location.href -> 브라우저에서 로드된 현재 위치. 현재 url
const queryParams = url.searchParams; // ?뒤에 있는 값들을 키-값 형식으로 queryParams에 저장.
const coords = {
  lat: parseFloat(queryParams.get("lat")),
  lng: +queryParams.get("lng"),
};
const address = queryParams.get("address");
new LoadedPlace(coords, address);
