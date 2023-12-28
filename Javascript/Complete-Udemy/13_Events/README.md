# Events

[📌 이벤트](#📌-이벤트)<br>
[📌 preventDefault()로 작업하기](#📌-preventdefault로-작업하기)<br>
[📌 캡쳐링 & 버블링](#📌-캡쳐링--버블링)<br>
[📌 이벤트 전파 & stopPropagation()](#📌-이벤트-전파--stoppropagation)<br>
[📌 이벤트 위임 사용하기](#📌-이벤트-위임-사용하기)<br>
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

### 📖 무한 스크롤링

```javascript
let curElementNumber = 0;

function scrollHandler() {
  const pageBottom = document.body.getBoundingClientRect().bottom;

  if (pageBottom < document.documentElement.clientHeight + 150) {
    const newDataElement = document.createElement("div");
    curElementNumber++;
    newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
    document.body.append(newDataElement);
  }
}

window.addEventListener("scroll", scrollHandler);
```

- pageBottom 변수에 뷰포트(현재 보고 있는 페이지의 왼쪽 상단 모서리)와 (단순히 현재 보이는 영역 사이의 총 길이가 아닌) 페이지 끝 사이의 총 길이를 측정하여 저장.
- 콘텐츠의 하단까지의 길이(pageBottom)과 창 높이 + 특정 임계값을 비교. &rarr; `document.documentElement.clientHeight`는 잠재적인 스크롤바도 고려하므로 `window.innerHeight`보다 선호된다.

<br>

## 📌 `preventDefault()`로 작업하기

```html
<form action="">
  <label for="title">Title</label>
  <input type="text" id="title" />
  <button type="submit">Submit</button>
</form>
```

```javascript
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
});
```

- submit 이벤트는 form 요소에만 존재하는 이벤트이다. &rarr; submit은 해당 서식을 서버에 전달.
- `preventDefault()` : submit 이벤트 외에도 JavaScript의 모든 이벤트 객체에서 볼 수 있는 메서드. 메서드의 사용 없이는 브라우저가 적용했을 기본 동작을 방지한다. 이때 기본 동작은 이벤트의 동작에 따라서 달라진다.

<br>

## 📌 캡쳐링 & 버블링

1. 이벤트 리스너 트리거 단계
   1. 캡쳐링 : 외부 &rarr; 내부.
   2. 버블링 : 내부 &rarr; 외부.

<br>

## 📌 이벤트 전파 & `stopPropagation()`

1. 버블링 : 버튼 클릭 &rarr; CLICKED BUTTON &rarr; CLICKED DIV

```javascript
const button = document.querySelector("button");

const div = document.querySelector("div");

div.addEventListener("click", (e) => {
  console.log("CLICKED DIV");
  console.log(e);
});

button.addEventListener("click", (e) => {
  console.log("CLICKED BUTTON");
  console.log(e);
});
```

2. 캡쳐링 : CLICKED DIV &rarr; CLICKED BUTTON

```javascript
const button = document.querySelector("button");

const div = document.querySelector("div");

div.addEventListener(
  "click",
  (e) => {
    console.log("CLICKED DIV");
    console.log(e);
  },
  true
); // true : 캡쳐링 단계의 일부임.

button.addEventListener("click", (e) => {
  console.log("CLICKED BUTTON");
  console.log(e);
});
```

3. `stopPropagation()` : button 클릭 &rarr; CLICKED BUTTON

```javascript
button.addEventListener("click", (e) => {
  e.stopPropagation(); // button의 클릭 이벤트가 전파하지 않도록 만듦.
  e.stopImmediatePropagation(); // 같은 요소에 이벤트 리스너가 여럿 있을 때 유용. 즉, 버튼에 더 많은 이벤트 리스너가 있을 경우
  console.log("CLICKED BUTTON");
  console.log(e);
});
```

**만약 event 프로퍼티에서 bubbles 속성이 false라면 버블링해서 올라가지 않는다는 것을 의미한다. &rarr; 전파가 없다.**
<br>

### 📌 이벤트 위임 사용하기








<br>

### 더 알아보기

🔗 [Event](https://developer.mozilla.org/ko/docs/Web/API/Event)
