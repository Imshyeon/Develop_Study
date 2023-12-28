# Advanced DOM Interactions

[📌 Dataset 사용하기](#📌-dataset-사용하기)<br>
[📌 요소](#📌-요소)<br>
[📌 툴팁 위치시키기](#📌-툴팁-위치시키기)<br>
[📌 스크롤 다루기](#📌-스크롤-다루기)<br>
[📌 스크립트 동적으로 로딩하기](#📌-스크립트-동적으로-로딩하기)<br>
[📌 타이머 & 간격 설정하기](#📌-타이머--간격-설정하기)<br>
[📌 location, history, navigator 객체](#📌-location-history-navigator-객체)<br>
<br>

## 📌 Dataset 사용하기

- `data-` 속성은 일반적으로 어떤 종류의 데이터든지 첨부가 가능하도록 자체 요소에 추가할 수 있는 특수한 속성

```javascript
class ProjectItem {
  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    console.log(projectElement.dataset);
    // DOMStringMap {extraInfo: 'Got lifetime access, but would be nice to finish it soon!'}
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(() => {
      this.hasActiveTooltip = false;
    }, tooltipText);
    tooltip.attach();
    this.hasActiveTooltip = true;
  }
}
```

`projectElement.dataset` : `data-` 속성은 데이터셋 특성에서 모두 병합된다.

```javascript
class Tooltip extends Component {
  constructor(closeNotifierFunction, text) {
    super();
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  create() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    tooltipElement.textContent = this.text;
    tooltipElement.addEventListener("click", this.closeTooltip);
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    console.log(projectElement.dataset);
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(() => {
      this.hasActiveTooltip = false;
    }, tooltipText);
    tooltip.attach();
    this.hasActiveTooltip = true;
  }
}
```

<br>

## 📌 요소

```javascript
// 브라우저에서 main-box를 선택한 후
$0.getBoundingClientRect();
$0.offsetTop; // 100
$0.clientTop; // 15
$0.clientLeft; // 15

$0.offsetWidth; // 300
$0.offsetHeight; // 200
$0.clientWidth; // 270
$0.clientHeight; // 170

$0.scrollHeight; // 410
$0.scrollTop; // 0

window.innerWidth; // 941
window.innerHeight; // 945
document.documentElement.clientWidth;
document.documentElement.clientHeight;
```

- `offsetTop` : 최상단 지점에서의 거리. `offsetTop`뿐만 아니라 Left, Right 등도 있다.
  - `offset`은 외부의 위치를 지정. 즉, 좌표 상 박스의 위치.
- `client` : 내부 위치를 지정. CSS에서 border를 15px로 설정했기 때문에 `clientTop`과 `clientLeft`의 값이 15이다.
  <br><br>

- `offsetWidth` : 박스의 전체 너비. 테두리와 스크롤바 포함
- `offsetHeight` : 박스의 전체 높이. 테두리와 스크롤바 포함
- `clientWidth` : 테두리와 스크롤바를 제외한 내부 너비. 300 - 15 \* 2 = 270
- `clientHeight` : 테두리와 스크롤바를 제외한 내부 높이
  <br><br>

- `scrollHeight` : 콘텐츠의 전체 높이. 현재 보이지 않는 콘텐츠도 포함한 높이이다.
- `scrollTop` : 박스 안에서 콘텐츠를 얼마나 스크롤 하느냐에 따라 달라진다. 따라서 스크롤을 끝까지 내렸을 때에는 255.5이라는 결과가 나온다. &rarr; 255.5 픽셀만큰 스크롤을 내렸기 때문
  <br><br>

- `window.innerWidth` : 너비
- `window.innerHeight` : 높이. window~를 사용하면 스크롤바도 포함하여 나타나기 때문에 실제로 사용 가능한 범위보다 더 많이 제공.
- `document.documentElement.clientWidth` : 스크롤바를 제외한 너비를 리턴. 현재 문서에는 스크롤이 없기 때문에 window~와 동일한 결과값을 리턴한다.
- `document.documentElement.clientHeight`
  <br><br>

## 📌 툴팁 위치시키기

```javascript
class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  create() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    tooltipElement.textContent = this.text;
    // console.log(this.hostElement.getBoundingClientRect());
    console.log(this.hostElement); // this.hostElement 는 li
    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop;
    const x = hostElPosLeft + 20; // pixel
    const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;

    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = x + 'px';
    tooltipElement.style.top = y + 'px';

    tooltipElement.addEventListener("click", this.closeTooltip);
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    console.log(projectElement.dataset);
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(
      () => {
        this.hasActiveTooltip = false;
      },
      tooltipText,
      this.id
    );
    tooltip.attach();
    this.hasActiveTooltip = true;
  }
  ...
}
```

<br>

## 📌 스크롤 다루기

```javascript
// ul 선택
$0.scrollTo(0, 50); // y 축으로 50 픽셀만큼 이동 (절대)
$0.scrollBy(0, 50); // y 축으로 50 픽셀만큼 이동 (상대) -> 다시한번 scollBy(0,50)을 하면 스크롤된 위치에서 50만큼 아래로 스크롤됨.
$0.scrollTo({ top: 50, behavior: "smooth" });
$0.scrollBy({ top: 50, behavior: "smooth" });
```

```javascript
class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
    // element.scrollIntoView(); // 애니메이션 없이 즉시 이동.
    element.scrollIntoView({ behavior: "smooth" }); // 약간의 애니메이션.
  }
}
```

- `scrollIntoView` : 자동으로 해당 뷰로 스크롤 이동.

<br>

## 📌 `<template>` 태그로 작업하기

- 기본 콘텐츠가 렌더링되지 않아도 DOM에 포함된다.

```html
<body>
  <template id="tooltip">
    <h2>More Info</h2>
    <p></p>
  </template>
</body>
```

```javascript
const tooltipTemplate = document.getElementById("tooltip");
const tooltipBody = document.importNode(tooltipTemplate.content, true); // template 태그의 콘텐츠를 제공. - h2, p 태그
tooltipBody.querySelector("p").textContent = this.text;
tooltipElement.append(tooltipBody);
```

<br>

## 📌 스크립트 동적으로 로딩하기

1. `document.createElement`를 이용해서 script 만들기

```javascript
class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );

    const someScript = document.createElement("script");
    someScript.textContent = 'alert("Hi there")';
    document.head.append(someScript);
  }
}
```

1. `document.createElement`를 이용해서 script 만들기

```javascript
class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );

    const someScript = document.createElement("script");
    someScript.textContent = 'alert("Hi there")';
    document.head.append(someScript);
  }
}
```

2. 다른 스크립트 파일을 특정 시간에 다운로드 할 수 있게 하기.

```html
<body>
  <footer>
    <button id="start-analytics-btn">Start Analytics</button>
  </footer>
</body>
```

```javascript
class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );

    document
      .getElementById("start-analytics-btn")
      .addEventListener("click", this.startAnalytics);
  }
  static startAnalytics() {
    const analyticsScript = document.createElement("script");
    analyticsScript.src = "assets/scripts/analytics.js";
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}
```

<br>

## 📌 타이머 & 간격 설정하기

1. timer 1

```javascript
setTimeout(this.startAnalytics, 3000); // 3초 뒤 startAnalytics를 실행한다.
```

- `setTimeout` : 스크립트 실행을 중지하지 않지만 브라우저가 스크립트가 계속 작동하도록 관리.
  <br><br>

2. timer 2

```javascript
setInterval(() => {
  console.log("sending analytics data...");
}, 2000); // 2초마다 console에 문장 출력.
```

<br>

3. timer 중지

```javascript
//timer 1
const timerId = setTimeout(this.startAnalytics, 3000); // 3초 뒤 startAnalytics를 실행한다.

document.getElementById("stop-analytics-btn").addEventListener("click", () => {
  clearTimeout(timerId);
});

// timer 2
const intervalId = setInterval(() => {
  console.log("sending analytics data...");
}, 2000); // 2초마다 console에 문장 출력.

document.getElementById("stop-analytics-btn").addEventListener("click", () => {
  clearInterval(intervalId);
});
```

<br>

## 📌 location, history, navigator 객체

1. location 객체

```javascript
location;
// Location {ancestorOrigins: DOMStringList, href: 'http://127.0.0.1:5500/Javascript/Complete-Udemy/12_Advanced_DOM/index.html', origin: 'http://127.0.0.1:5500', protocol: 'http:', host: '127.0.0.1:5500', …}
//ancestorOrigins: DOMStringList {length: 0}
//assign: ƒ assign()
//hash: ""host: "127.0.0.1:5500"
//hostname: "127.0.0.1"
//href: "http://127.0.0.1:5500/Javascript/Complete-Udemy/12_Advanced_DOM/index.html"
//origin: "http://127.0.0.1:5500"
//pathname: "/Javascript/Complete-Udemy/12_Advanced_DOM/index.html"
//port: "5500"
//protocol: "http:"
//reload: ƒ reload()
//replace: ƒ replace()
//search: ""
//toString: ƒ toString()
//valueOf: ƒ valueOf()
//Symbol(Symbol.toPrimitive): undefined
//[[Prototype]]: Location

location.href = "https://google.com";
location.replace(""); // Replace로 이동할 경우, 이동 저의 페이지로 되돌아갈 수 없다.
location.assign(""); // href와 같다.
location.host; // "" => 우리는 로컬에서 하고 있어서 따로 뭐 받지는 않는다.

// udemy
location.host; // "www.udemy.com"
location.origin; // "https://www.udemy.com"
location.pathname; // "/course/javascript-zw/learn/lecture/30291526" => 도메인의 뒷 부분.
```

- `location` : 사용자를 이동시킬 수 있다.
  <br><br>

2. history 객체

```javascript
history;
// History {length: 2, scrollRestoration: 'auto', state: null}
// length: 2
// scrollRestoration: "auto"
// state: null
// [[Prototype]]: History

history.back(); // 이전 페이지, 뒤로 감.
history.forward(); // 앞 페이지로 감
history.length(); // 사용자가 브라우저의 이 탭에서 몇 개의 단계를 거쳤는지, 새 페이지로 얼마나 자주 이동했는지와 얼마나 자주 뒤로 갔는지를 알 수 있다.
history.go(5); // 5단계 이전 페이지로 돌아감.
```

- `history` : 기록과 상호작용.

<br>

3. navigator 객체

```javascript
navigator;
navigator.userAgent; // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
navigator.geolocation.getCurrentPosition((data) => console.log(data)); // 사용자 위치.
```

- `navigator` : 유저의 운영체제와 상호작용이 가능하도록 함.
  - `navigator.userAgent` : 사용 기록. 과거의 브라우저 업체들이 웹사이트가 스크립트에서 사용하는 모든 기능에 대한 액세스를 갖는 다는 것을 확실히 하기 위해서 이것을 조작함.
