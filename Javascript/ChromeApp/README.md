# Nomad Coders - 바닐라 JS로 크롬 앱 만들기

**INDEX**<br>
[❤️‍🔥 greeting.js](#-greetingjs)<br>
[❤️‍🔥 clock.js](#-clockjs)<br>
[❤️‍🔥 quotes.js](#-quotesjs)<br>
[❤️‍🔥 todo.js](#-todojs)<br>
<br>

## ❤️‍🔥 greeting.js

- input을 통해 유저의 이름을 받아오고 해당 데이터를 localStorage에 저장
- 만약 localStorage에 유저 이름에 대한 데이터가 있다면 input은 숨기고 유저의 이름을 화면에 표시하는 기능을 구현했다.

```javascript
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

const loginForm = document.getElementById("login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const savedUserName = localStorage.getItem(USERNAME_KEY);

const paintGreetings = (userName) => {
  greeting.textContent = `Hello ${userName}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
};

const loginFormSubmitHandler = (e) => {
  e.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
};

if (savedUserName === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", loginFormSubmitHandler);
} else {
  paintGreetings(savedUserName);
}
```

<br>

## ❤️‍🔥 clock.js

- `"1".padStart(2,0) // 01` &rarr; 2자릴 채우고 싶은데 2자리가 아니라면 0을 앞에 붙이겠다! 라는 의미

```javascript
const clock = document.getElementById("clock");

const getClock = () => {
  const date = new Date();
  const hour = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");
  clock.textContent = `${hour}:${minutes}:${second}`;
};

getClock(); // 처음부터 볼 수 있도록!
setInterval(() => {
  getClock();
}, 1000);
```

<br>

## ❤️‍🔥 quotes.js

```javascript
const quotes = [...];

const quote = document.querySelector('#quote span:first-child');
const author = document.querySelector('#quote span:last-child');

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];


quote.innerText = todaysQuote.quote
author.innerText = todaysQuote.author
```

<br>

## ❤️‍🔥 todo.js

```javascript
const TODOS_KEY = "toDos";

const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

let toDos = [];

const saveToDosHandler = () => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); // array -> string
};

const showToDosHandler = () => {
  const savedToDos = localStorage.getItem(TODOS_KEY);
  const parsedToDos = JSON.parse(savedToDos); // string -> object

  if (!parsedToDos) {
    return;
  }
  toDos = parsedToDos;
  parsedToDos.forEach(addToDoElementHandler);
};

const toDoSumbitHandler = (e) => {
  e.preventDefault();
  const newToDo = toDoInput.value; // input의 값을 새로운 변수에 복사
  toDoInput.value = "";
  const newTodoObj = {
    text: newToDo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  addToDoElementHandler(newTodoObj);
  saveToDosHandler();
};

const addToDoElementHandler = (toDo) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  span.textContent = toDo.text;
  button.textContent = "❌";
  li.id = toDo.id;
  li.append(span);
  li.append(button);
  toDoList.append(li);

  button.addEventListener("click", deleteToDoElementHandler);
};

const deleteToDoElementHandler = (toDo) => {
  console.log(toDo.target.parentElement, toDo);
  const target = toDo.target.parentElement;
  target.remove();
  toDos = toDos.filter((t) => t.id !== parseInt(target.id));
  saveToDosHandler(toDos);
};

toDoForm.addEventListener("submit", toDoSumbitHandler);

showToDosHandler();
```

<br>

## ❤️‍🔥 weather.js

```javascript
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
```