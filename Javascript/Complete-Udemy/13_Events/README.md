# Events

[📌 이벤트](#📌-이벤트)<br>
<br>

## 📌 이벤트

### 📖 이벤트를 리스닝하는 다양한 방법

1. 1번째 방법 : 권장하지 않는 방법

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Events!</title>
    <link rel="stylesheet" href="assets/styles/events.css" />
    <script src="assets/scripts/events.js" defer></script>
  </head>
  <body>
    <div>
      <h2>Events in JavaScript</h2>
      <button onclick="alert('hello there!')">Click me</button>
    </div>
  </body>
</html>
```

<br>

2. 2번째 방법 : 권장하지 않는 방법.. 하나의 이벤트만 사용 가능

```javascript
const button = document.querySelector("button");

const buttonClickHandler = () => {
  alert("button was clicked");
};

button.onclick = buttonClickHandler;
```

<br>

3. 3번째 방법

```javascript
const button = document.querySelector("button");

button.addEventListener("click", () => console.log("button clicked!"));
```

<br>

### 📖 이벤트 리스너 제거하기

```javascript
const button = document.querySelector("button");

const buttonClickHandler = () => {
  alert("button was clicked");
};

button.addEventListener("click", buttonClickHandler);
setTimeout(() => {
  button.removeEventListener("click", buttonClickHandler);
}, 2000);
```

<br>

### 📖 Event 객체

```javascript
// 예제 1
const button = document.querySelector("button");

const buttonClickHandler = (e) => {
  console.log(e);
};

button.addEventListener("click", buttonClickHandler);
setTimeout(() => {
  button.removeEventListener("click", buttonClickHandler);
}, 2000);

// PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}

// 예제 2
const buttons = document.querySelectorAll("button");

const buttonClickHandler = (e) => {
  e.target.disabled = true;
  console.log(e);
};

buttons.forEach((btn) => {
  btn.addEventListener("click", buttonClickHandler);
});
```

- PointerEvent
  - `altKey` : 클릭하는 동안 Alt 키를 눌렀는지의 여부를 알 수 있다.
  - `button` : 0이면 왼쪽 마우스 클릭, 2이면 오른쪽 마우스 클릭
  - `clientX`, `clientY` : 마우스 커서 위치의 좌표
  - `target` : 어떤 요소가 이벤트의 원인이 되는지를 설명하는 프로퍼티
  - `relatedTarget` : 만약 이벤트가 `mouseenter`등 이었을 때, 해당 프로퍼티는 마우스가 들어가고 나가는데에 관련이 있다. 이를 통해 마우스가 이벤트 트리거에 들어가기 전에 커서가 어떤 요소의 위에 있는지 알 수 있도록 한다. 즉, 어떤 요소에서 들어오는지를 알 수 있다.

<br>

### 📖 지원되는 이벤트 유형

- mouseenter : 마우스 또는 커서가 요소 위로 지나가는 경우
- scroll : 페이지를 스클로 하는 경우
- 거의 모든 DOM 요소는 모든 이벤트를 지원한다.
<br>

### 더 알아보기

🔗 [Event](https://developer.mozilla.org/ko/docs/Web/API/Event)
