# Events

[📌 이벤트](#📌-이벤트)<br>
[📌 preventDefault()로 작업하기](#📌-preventdefault로-작업하기)<br>
[📌 캡쳐링 & 버블링](#📌-캡쳐링--버블링)<br>
[📌 이벤트 전파 & stopPropagation()](#📌-이벤트-전파--stoppropagation)<br>
[📌 이벤트 위임 사용하기](#📌-이벤트-위임-사용하기)<br>
[📌 프로그래밍적으로 DOM 요소 트리거하기](#📌-프로그래밍적으로-dom-요소-트리거하기)<br>
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

3. `stopPropagation()` : button 클릭 &rarr; CLICKED BUTTON => (다른 요소에 대해) 다른 이벤트 핸들러가 동일한 이벤트를 처리하지 못하도록 한다.

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

## 📌 이벤트 위임 사용하기

```css
.highlight {
  background-color: red;
  color: white;
}
```

<br>

### 📖 이벤트 위임 -1

```html
<body>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
    <li>Item 4</li>
    <li>Item 5</li>
  </ul>
</body>
```

```javascript
const listItems = document.querySelectorAll("li");
listItems.forEach((listItem) => {
  listItem.addEventListener("click", (e) => {
    e.target.classList.toggle("highlight");
  });
});
```

이런식으로 하면 이벤트 리스너가 너무 많아서 성능, 메모리 측면에서 좋지 않다. 따라서 위임 패턴을 써보자!

```javascript
const list = document.querySelector("ul");

list.addEventListener("click", (e) => {
  e.target.classList.toggle("highlight");
});
```

리스너가 목록(ul)으로 등록되어도 `e.target`은 클릭이 되어진 실제 타겟을 참조한다.

<br>

### 📖 이벤트 위임 -2

이벤트 위임의 경우, 조금만 복잡해지면 쓰기가 애매해진다. `e.target`이 클릭한 DOM의 요소이자 가장 하위의 요소이기 때문이다.

```html
<ul>
  <li>
    <h2>Item 1</h2>
    <p>text</p>
  </li>
  <li>
    <h2>Item 2</h2>
    <p>text</p>
  </li>
  <li>
    <h2>Item 3</h2>
    <p>text</p>
  </li>
  <li>
    <h2>Item 4</h2>
    <p>text</p>
  </li>
  <li>
    <h2>Item 5</h2>
    <p>text</p>
  </li>
</ul>
```

이 경우 li, h2, p를 클릭했을 때 각각 요소의 `.highlight`가 토글이 된다.

```javascript
list.addEventListener("click", (e) => {
  console.log(e.currentTarget); // ul
  // e.target.classList.toggle('highlight');
  e.target.closest("li").classList.toggle("highlight");
});
```

- `e.currentTarget` : 클릭할 수 있는 실제 요소가 아니라 그 위에 **리스너를 추가한 요소**이다
- `closest()` : 모든 DOM 객체에 존재하고 조상 트리를 위쪽으로 탐색. 가장 가까운 li 를 찾는다. => 이 메서드는 자신을 호출하는 요소 자체도 포함한다.

<br>

## 📌 프로그래밍적으로 DOM 요소 트리거하기

```javascript
list.addEventListener("click", (e) => {
  e.target.closest("li").classList.toggle("highlight");
  form.querySelector("button").click();
});
```

<br>

## 📌 이벤트 핸들러 함수 & this

```javascript
button.addEventListener("click", function (e) {
  event.stopPropagation();
  console.log("BUTTON CLICKED");
  console.log(e);
  console.log(this); // <button>Click me</button>  ==> 클릭했던 명확한 대상이 아니라 이벤트 리스너가 등록된 요소를 가리킨다.
});
```

<br><br><br>

# Drag & Drop

[📌 Drag & Drop 이론](#📌-drag--drop-이론)<br>
[📌 Drag & Drop 구현하기](#📌-drag--drop-구현하기)<br>
<br>

## 📌 Drag & Drop 이론

1. Mark Elements as "draggable"
2. Listen to "dragstart" Event
3. Accept Drop via "dragenter" & "dragover" Events &rarr; preventDefault() : 기본값은 드롭 작업을 취소하기 때문에!
4. (Optional : Listen to "dravleave" Event) &rarr; 스타일 변경
5. Listen to "drop" Event & Update Data/UI
6. (Optional : Listen to "dragend" Event & Update Data/UI) &rarr; 드래그된 요소 자체에서 가능하다.

<br>

## 📌 Drag & Drop 구현하기

### 📖 드래깅 가능한 요소 구성하기

1. HTML

```html
<li
  id="p1"
  data-extra-info="Got lifetime access, but would be nice to finish it soon!"
  class="card"
  draggable="true"
></li>
```

2. JavaScript

```javascript
class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
    this.connectDrag();
  }

  connectDrag() {
    document.getElementById(this.id).addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", this.id);
      e.dataTransfer.effectAllowed = "move"; // 어떤 종류의 드래그 앤 드롭 작업이 처리되는지를 설명한다.
    });
  }
}
```

<br>

### 📖 드롭 구간 만들기

1. JavaScript

```javascript
class ProjectList {

  constructor(type) {
    ...
    this.connectDroppable();
  }

  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`); // 리스트 요소에 대한 엑세스

    list.addEventListener("dragenter", (e) => {
      if (e.dataTransfer.types[0] === "text/plain") {
        list.parentElement.classList.add("droppable");
        e.preventDefault();
      }
    });

    list.addEventListener("dragover", (e) => {
      if (e.dataTransfer.types[0] === "text/plain") {
        e.preventDefault();
      }
    });

    list.addEventListener("dragleave", (e) => {
      // 리스트와 일치하지 않으면 리스트 안에 있지 않는 것.
      if (e.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove("droppable");
      }
    });
  }
}
```

2. CSS

```css
.droppable {
  background-color: #f9ccdd;
}
```

<br>

### 📖 데이터 + 요소 드롭핑 & 이동

```javascript
class ProjectList {
  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`); // 리스트 요소에 대한 엑세스

    list.addEventListener("drop", (e) => {
      const prjId = e.dataTransfer.getData("text/plain");
      if (this.projects.find((p) => p.id === prjId)) {
        return;
      }
      document
        .getElementById(prjId)
        .querySelector("button:last-of-type")
        .click();
      list.parentElement.classList.remove("droppable");
      e.preventDefault(); // 필수는 아니다..
    });
  }
}

class ProjectItem {
  connectDrag() {
    const item = document.getElementById(this.id);
    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", this.id);
      e.dataTransfer.effectAllowed = "move"; // 어떤 종류의 드래그 앤 드롭 작업이 처리되는지를 설명한다.
    });

    item.addEventListener("dragend", (e) => {
      console.log(e);
    });
  }
}
```

<br>

### 더 알아보기

🔗 [Event](https://developer.mozilla.org/ko/docs/Web/API/Event)
