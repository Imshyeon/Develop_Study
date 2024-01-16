# React Essentials
[📌 Components](#-components)<br>
[📌 초기 프로젝트 구축하기](#-초기-프로젝트-구축하기)<br>
[📌 JSX와 리액트 컴포넌트](#-jsx와-리액트-컴포넌트)<br>
[📌 리액트의 컴포넌트 처리과정 & 컴포넌트 트리 생성법](#-리액트의-컴포넌트-처리과정--컴포넌트-트리-생성법)<br>
[📌 동적 값 출력 및 활용](#-동적-값-출력-및-활용)<br>
<br>

## 📌 Components

- 컴포넌트는 잠재적으로 재사용이 가능한 구성 요소. 리액트 개발자가 생성할 수 있고 차후에 혼합하여 전반적인 UI를 구축할 수 있다.
- 결국 리액트 어플리케이션은 컴포넌트를 결합하여 만들어 지는 것이다.
- 컴포넌트가 없다면 HTML에 많은 것들이 작성되어 가독성에 좋지 않고 유지/보수를 하기 쉽지 않다. &rarr; 컴포넌트는 이와 반대로 작은 블록들을 생성하고 재사용에 가능하다.
- 비슷한 코드는 함께 저장이 된다. 어떤 한 요소를 만드는데 그에 필요한 HTML, CSS, JS가 대체로 함께 묶여있어서 개발 과정이 단순해진다.
- 디자인과 개발 원칙을 따른다. 즉, 관심사가 분리.

<br>

## 📌 초기 프로젝트 구축하기

1. `npm install`
2. `npm run dev`

<br>

## 📌 JSX와 리액트 컴포넌트

### 📖 JSX와 리액트 컴포넌트

#### 1. JSX
- jsx : 비표준의 자바스크립트 문법을 사용한다. 
- JSX(JavaScript Syntax eXtension)라는 자바스크립트 문법을 사용한다. 이 확장자는 개발자가 자바스크립트 파일 내에 HTML 마크업 코드를 작성하여 HTML 요소를 설명하고 생성할 수 있게 한다.
- 브라우저에는 사용이 불가하다. 따라서 브라우저에 도달하기 전에 개발 서버에서 변환이 되야 한다.
> 이 확장자는 개발 서버가 실행될 때 백그라운드에서 실행되는 빌드 프로세스에게 해당 파일이 JSX 코드를 포함하고 있다는 것을 알려준다.(이 역시 브라우저에선 지원이 안됨) &rarr; 이 확장자를 처리하는 것은 빌드 프로세스뿐!
- `.jsx`대신 `.js`만 사용하는 리액트 프로젝트를 찾을 수 있고, `.js`파일 내에서도 JSX 코드를 찾을 수 있다. 이는 파일의 빌드 프로세스에 따라 JSX 구문을 사용할 때 어떤 확장자가 예상될 지 결정된다.

#### 2. 리액트 컴포넌트
- 리액트의 컴포넌트는 자바스크립트 함수와 같다.
- 리액트 컴포넌트가 따라야 할 규칙
    1. 함수의 제목이 대문자로 시작한다.
        - 이름 충돌 가능성을 방지
        - 내장된 컴포넌트와 사용자가 만든 커스텀 컴포넌트의 충돌 방지(ex. `<header>, <div>, ...`) &rarr; 리액트가 컴포넌트를 관리하는 방식이 바뀔 수도 있기 때문이다.
    2. 함수에서 렌더링 가능한 값이 반환되어야 한다.

<br>

### 📖 첫 커스텀 컴포넌트 생성 및 활용

#### 이전
```jsx
function App() {
  return (
    <div>
      <header>
        <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
        <h1>React Essentials</h1>
        <p>
            Fundamental React concepts you will need for almost any app you are
            going to build!
        </p>
      </header>
      <main>
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;
```

#### 이후

```jsx
function Header() {
  return (
    <header>
      <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        Fundamental React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

function App() {
  return (
    <div>
      {/* 이곳에 헤더를 추가하고 싶다.. */}
      <Header />
      <main>
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;
```

<br>

## 📌 리액트의 컴포넌트 처리과정 & 컴포넌트 트리 생성법

#### index.jsx
```jsx
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<App />);
```

- `<App />` 이 JSX 코드는 함수로 전환이 되지 않는 것이다. 대신 값으로 사용되고 있어 호출된 다른 메서드(`render(<App />)`)의 인수로 쓰인다.
- index.jsx는 HTML 파일에서 가장 먼저 로딩되는 파일로 리액트 앱의 주요 입구로 작용한다. 이 위치에서 리액트 앱이 부팅된다. 
- 이곳(index.jsx)에 불러들인 전반적인 리액트 라이브러리에 속한 `ReactDOM`이 있고 이로 인해 앱 컴포넌트가 결과적으로 렌더링 된다.
> index.jsx는 앱 컴포넌트의 내용을 화면에 출력하는 것을 담당한다.
<br>

- `createRoot()` 메서드는 기존의 HTML 요소. 즉, 리액트에서 생성된 것이 아니고 index.html 파일의 한 부분인 요소를 입력값으로 설정한다. 이 경우, `id="root"`로 되어있는 `<div>`이며 `getElementById`를 통해 선택했음을 알 수 있다.
- 리액트 프로젝트의 경로로 그 요소(`<div id="root"></div>`)가 사용되면, 리액트가 리액트 컴포넌트를 삽입한다. &rarr; `<div>`안으로 렌더링.
<br>

**🚨 이를 통해서 중첩된 컴포넌트가 있을 수 있음을 충분히 유추할 수 있다! &rarr; 컴포넌트 계층구조 설립(컴포넌트 트리)🚨**

<br>

## 📌 동적 값 출력 및 활용

- 리액트에서 자주 실행하는 작업. `{}`을 사용한다.
- HTML 태그 안의 값이나 HTML의 속성값 등으로 사용할 수 있다.
- 중괄호 안에는 if, for, function 등 block statements를 사용할 수 없다. 오직 직접적으로 값을 만들어내는 표현식만 가능!

```jsx
const reactDescriptions = ["Fundamental", "Crucial", "Core"]; // index-max:2

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
} // 무작위로 숫자 생성

function Header() {
  return (
    <header>
      <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {reactDescriptions[getRandomInt(2)]} React concepts you will need for
        almost any app you are going to build!
      </p>
    </header>
  );
}
```

- 페이지를 새로 고침할 때마다 reactDescriptions 배열 안의 값이 {} 안에 표현됨.

```jsx
  const description = reactDescriptions[getRandomInt(2)];
  return (
    <header>
      <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for
        almost any app you are going to build!
      </p>
    </header>
  )
```
위의 방법처럼 따로 빼는 방법이 가독성이 좋다!
<br>

### 📖 동적 HTML Attributes(속성) 설정 & 이미지 파일 로딩

```jsx
import reactImg from "./assets/react-core-concepts.png";

function Header() {
    return(
      <img src={reactImg} alt="Stylized atom" />
    )
}
```