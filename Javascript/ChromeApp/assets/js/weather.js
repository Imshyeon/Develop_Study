const API_KEY = "YOUR_KEY";
const onGeoSuccess = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  // daily - summary, daily-weather-main & description, temp-min/max
  fetch(url)
    .then((response) => {
      return response.json(); // response를 json으로 받아오기 **return을 꼭 해야한다!**
    })
    .then((data) => {
      if (!data) {
        return "there is no data";
      }
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      weather.textContent = `${data.current.weather[0].main} - 현재온도: ${data.current.temp}`;
      city.textContent = data.timezone;
    });
};
const onGeoFail = () => {
  throw new Error("위치를 찾을 수 없습니다.");
};

console.log(navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail));