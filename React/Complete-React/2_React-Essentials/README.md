# React Essentials
[📌 Components](#-components)<br>
[📌 초기 프로젝트 구축하기](#-초기-프로젝트-구축하기)<br>
[📌 JSX와 리액트 컴포넌트](#-jsx와-리액트-컴포넌트)<br>
[📌 리액트의 컴포넌트 처리과정 & 컴포넌트 트리 생성법](#-리액트의-컴포넌트-처리과정--컴포넌트-트리-생성법)<br>
[📌 동적 값 출력 및 활용](#-동적-값-출력-및-활용)<br>
[📌 Prop(속성)으로 컴포넌트 재사용](#-prop속성으로-컴포넌트-재사용)<br>
[📌 이벤트 처리하기](#-이벤트-처리하기)<br>
[📌 UI를 업데이트하지 않는 법](#-ui를-업데이트하지-않는-법)<br>
[📌 State(상태) 관리 & Hooks(훅) 사용법](#-state상태-관리--hooks훅-사용법)<br>
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

## 📌 이벤트 처리하기

### 📖 이벤트 처리하기

- 리액트에선 이벤트 리스너를 요소에 추가하는 대신 해당 요소에 특별한 속성인 특별한 prop을 추가한다.
- 내장요소는 on으로 시작하는 prop을 많이 지원한다.(ctrl + space => 추천명령어(prop?)가 뜸..)
- 이벤트가 발생할 때 실행해야할 함수를 가리키고 싶기 때문에 `onClick={}`안에 함수를 삽입한다.

```jsx
// TabButton.jsx
export default function TabButton({ children }) {
  function handleClick() {
    console.log("clicked");
  }

  return (
    <li>
      <button onClick={handleClick}>{children}</button>
    </li>
  );
}
```

<br>

### 📖 함수를 Prop(속성)의 값으로 전달하기

```jsx
// App.jsx
function App() {
  function handleSelect() {
    console.log("selected");
  }
  return(
    <TabButton onSelect={handleSelect}>Components</TabButton>
    <TabButton onSelect={handleSelect}>JSX</TabButton>
    <TabButton onSelect={handleSelect}>Props</TabButton>
    <TabButton onSelect={handleSelect}>State</TabButton>
  )
}

// TabButton.jsx
export default function TabButton({ children, onSelect }) {
  return (
    <li>
      <button onClick={onSelect}>{children}</button>
    </li>
  );
}
```
- 함수를 속성값으로 전달했다.
    1. 버튼을 눌렀을 때, onSelect Prop으로 handleSelect 함수의 주소가 넘어간다.
    2. TabButton.jsx안의 버튼에 onClick Prop에 전달받은 handleSelect 함수 주소가 들어오고 이를 실행한다.
    3. App.jsx에서 선언된 handleSelect()가 실행된다.

<br>

### 📖 이벤트 함수에 커스텀 인자 전달하기

```jsx
// App.jsx
<TabButton onSelect={() => handleSelect("components")}>Components</TabButton>
<TabButton onSelect={() => handleSelect("jsx")}>JSX</TabButton>
<TabButton onSelect={() => handleSelect("props")}>Props</TabButton>
<TabButton onSelect={() => handleSelect("state")}>State</TabButton>
```
- 화살표 함수를 사용했기 때문에 당장 클릭을 했다고 해서 바로 실행되지는 않는다. &rarr; `onSelect={handleSelect()}`와는 다르게 동작한다.
- TabButton.jsx에 해당 화살표 함수가 전달되고 나서야 handleSelect 함수가 실행된다. &rarr; `onClick = () => handleSelect('components')`가 되니깐.
- 이것을 이용해서 handleSelect 함수에 어떤 요소를 클릭했는지 각 컴포넌트의 문자열 정보를 보낸다.

<br>

## 📌 UI를 업데이트하지 않는 법

```jsx
function App() {
  let tabContent = "Plz Click a button.";

  function handleSelect(selectedButton) {
    // selectedButton => 'components','jsx','props','state'
    tabContent = selectedButton;
    console.log(tabContent) 
  }
  
  return(
    {tabContent}
  )
}
```
- 버튼을 클릭해도 실제 브라우저에서는 클릭을 안한 것 처럼 보인다.(변화가 없다.)
- 실제 handleSelect안에서 확인을 해보니 tabContent에는 올바르게 'components','jsx','props','state'가 전달되고 있었다.
- 즉, 변수는 업데이트 되지만 UI는 업데이트 되지 않음.
> 리액트는 컴포넌트 함수를 코드 내에서 처음 발견했을 떄 한 번밖에 실행하지 않는다. 따라서 컴포넌트 함수가 재실행 되야한다는 것을 리액트에게 다시 알려야 한다.

<br>

## 📌 State(상태) 관리 & Hooks(훅) 사용법

### 📖 State(상태) 관리 & Hooks(훅) 사용법

- 리액트 프로젝트에서 'use'로 시작하는 모든 함수는 리액트 Hooks이다.
- 리액트 훅은 일반 함수이지만 특별한 점은 리액트 컴포넌트 함수 또는 다른 리액트 훅 안에서 호출되어야 한다는 것이다.
> useState Hook은 일부 컴포넌트에 연결된 상태르 관리하게 한다. 이는 리액트에 의해 저장된 일부 데이터일 뿐이며 데이터가 변경되면 이 훅이 자신이 속한 컴포넌트 함수를 활성화하여 리액트에 의해 재검토된다.
- useState의 인수 : 기본적으로 컴포넌트가 처음 렌더링될 떄 사용되길 원하는 기본값.
- useState가 반환하는 값은 배열이고 이 배열의 요소에는 항상 2가지가 있다.
    1. 첫번째 요소 : 해당 컴포넌트 실행 주기의 현재 데이터 스냅샷이다. 컴포넌트 함수가 처음 실행될 때 초기값이 첫번째 요소에 저장. 다시 실행될 때에는 업데이트된 값이 저장된다.
    2. 두번쨰 요소 : 항상 함수이다. 리액트에서 제공되고, 상태를 업데이트하기 위해 실행되어 저장된 값을 업데이트한다.

```jsx
// App.jsx
import { useState } from "react";
// useState : 리액트 훅.

function App() {
  let [selectedTopic, setSelectedTopic] = useState("Plz click a button"); // Hook 함수는 이런 식으로 컴포넌트 함수 안에서 바로 호출되어야 하고 다른 코드 안에 중첩되면 안된다.

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
    console.log(selectedTopic);
  }
  
  return(
    {selectedTopic};
  )
}
```

**console.log(selectedTopic)**
    1. console => Plz click a button || 화면 => components
    2. console => components || 화면 => jsx
    3. console => jsx || 화면 => props
    4. console => state || 화면 => props

    - 버튼을 누를 때마다 App, TabButton 컴포넌트가 재실행.
    - 버튼을 눌러서 상태를 업데이트 했어도 로그를 출력하면 업데이트하기 이전 값이 출력된다.

- 상태를 업데이트하는 함수(setSelectedTopic)를 부를 때 리액트는 상태 업데이트의 스케줄을 조정하며 해당 컴포넌트 함수(App)를 재실행한다.
- 그래서 App 컴포넌트 함수를 다시 실행하고 나서야 업데이트된 값을 사용할 수 있다. 그제서야 새로운 값을 사용하므로, 업데이트의 스케줄이 조장되자마자 로그를 출력하면 보이지 않는다.