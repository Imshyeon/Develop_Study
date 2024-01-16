# React Essentials
[📌 Components](#-components)<br>
[📌 초기 프로젝트 구축하기](#-초기-프로젝트-구축하기)<br>
[📌 JSX와 리액트 컴포넌트](#-jsx와-리액트-컴포넌트)<br>
[📌 리액트의 컴포넌트 처리과정 & 컴포넌트 트리 생성법](#-리액트의-컴포넌트-처리과정--컴포넌트-트리-생성법)<br>
[📌 동적 값 출력 및 활용](#-동적-값-출력-및-활용)<br>
[📌 Prop(속성)으로 컴포넌트 재사용](#-prop속성으로-컴포넌트-재사용)<br>
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

<br>

## 📌 Prop(속성)으로 컴포넌트 재사용

### 📖 Prop(속성)으로 컴포넌트 재사용하기

- props : 컴포넌트를 설정하는 개념. 데이터를 컴포넌트로 전달하고 그 데이터를 그곳에 사용할 수 있다. **리액트 컴포넌트의 재사용성을 높인다.**
- 커스텀 컴포넌트에 커스텀 속성을 추가할 수 있다. 또한 커스텀이니까 속성 이름도 개발자 마음대로 만들 수 있다.
- 리액트는 props 매개변수에 대한 값을 전달하고, 리액트에 의해 함수에 전달되는 값은 객체가 되어 모든 키-값을 보유하는 객체가 된다.
    - 커스텀 속성은 key로, 속성의 값은 value로 그룹화된다. 

```jsx
import componentImg from "./assets/components.png";

function CoreConcept(props) {
  return (
    <li>
      <img src={props.image} alt={props.title} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </li>
  );
}

function App() {
  return (
    <div>
      {/* 이곳에 헤더를 추가하고 싶다.. */}
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcept
              title="Components"
              description="The core UI building block."
              image={componentImg}
            />
            <CoreConcept />
            <CoreConcept />
            <CoreConcept />
          </ul>
        </section>
      </main>
    </div>
  );
}
```

<br>

### 📖 Props(속성) 대체 문법

- data.js에 삽입하고자 하는 데이터에 대한 정보를 입력한 후, App.jsx에서 다음과 같이 작성할 수 있다.

```jsx
<CoreConcept
    title={CORE_CONCEPTS[0].title}
    description={CORE_CONCEPTS[0].description}
    image={CORE_CONCEPTS[0].image}
/>
```
그러나 이 방법 또한 효율적이진 않음!

- 만약 객체의 props 이름과 data.js에서 설정한 속성 이름이 비슷한 경우, 다음의 방법을 쓸 수 있다.
```jsx
 <CoreConcept {...CORE_CONCEPTS[1]}
```

또한 CoreConcepts도 단순화할 수 있다.
```jsx
function CoreConcept({ image, title, description }) {
  // 디스트럭처링을 사용하는 대신, props로 설정하는 것과 이름을 동일하게 해야한다.
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}
```

<br>

### 📖 컴포넌트 분리하기

1. src/components 폴더 생성
2. 컴포넌트 이름과 동일하게 새로운 jsx 파일 생성
3. 해당 컴포넌트에 해당하는 코드를 옮기는데, import하는 파일 위치를 수정해야한다면 수정한다.
4. 해당 컴포넌트 파일에는 export(리액트에선 주로 export default를 한다.), App.jsx에서는 import를 한다.

<br>

### 📖 컴포넌트 옆에 컴포넌트 스타일 파일 저장하기

1. 해당 컴포넌트에 대한 css를 옮겨 적는다.(보통 컴포넌트이름.css로 설정)
2. 해당 컴포넌트.jsx에서 css를 import한다.

**이렇게 분리하는 것은 CSS 변경이 용이하기 때문인데, 이렇게 분리해도 자동적으로 해당 컴포넌트에만 적용이 되도록 한정되는 것은 아니다!**

<br>

### 📖 컴포넌트 구성 : "children" Prop

- 속성을 설정한 것이 아니더라도 리액트에서 속성 객체를 준다. 단, 거의 빈 객체로 준다.
- 하지만 완전히 비워진 것은 아니고 항상 받는 속성이 있는데 그것이 바로 `children` 속성이다.
- children : 특별한 내장 children prop. 리액트에서 설정한 prop으로 어느 특정한 속성에 의해 설정된 prop이 아니다.
> children prop은 컴포넌트 텍스트 사이 내용을 의미한다.
- 컴포넌트 텍스트 사이의 내용은 텍스트일 수도 있고 필요에 따라 복잡한 JSX 구조가 될 수도 있다.

```jsx
// 1. 방법 1
export default function TabButton(props) {
  return (
    <li>
      <button>{props.children}</button>
    </li>
  );
}

// 2. 방법 2
export default function TabButton({children}) {
  return (
    <li>
      <button>{children}</button>
    </li>
  );
}
```

- 컴포넌트가 다른 컴포넌트나 내용을 감싸서 `<TabButton>Components</TabButton>`같이 컴포넌트를 구축하는 것을 **컴포넌트 합성**이라고 한다.

다음과 같이 작성할 수 있다.

```jsx
// 1. 방법 1
// TabButton.jsx
export default function TabButton({ label }) {
  return (
    <li>
      <button>{label}</button>
    </li>
  );
}
// App.jsx
<TabButton label="Components"></TabButton>


// 2. 방법 2
// TabButton.jsx
export default function TabButton({ children }) {
  return (
    <li>
      <button>{children}</button>
    </li>
  );
}
// App.jsx
<TabButton>Components</TabButton>
```

<br>

