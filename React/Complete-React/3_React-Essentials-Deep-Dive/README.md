# React Essentials - Deep Dive
[📌 JSX를 꼭 사용하지 않아도 되는 이유](#-jsx를-꼭-사용하지-않아도-되는-이유)<br>
[📌 Components](#-components)<br>
<br>

## 📌 JSX를 꼭 사용하지 않아도 되는 이유

1. 빌드 과정
- React Code &rarr; Build Process &rarr; Deployable Files
- Build Process
    - 코드를 변경 및 최적화하여 브라우저에서 동작이 가능하도록 함.

<br>

- JSX
    - 빌드 프로세스와 코드 변환이 필요하다.
    - JSX를 사용하는 접근 방식이 더 사용하기 쉽고 코드 가독성이 좋다. 

```jsx
<div id="content">
  <p>Hello world!</p>
</div>
```

- JavaScript
    - 리액트에서 노출한 createElement(요소 생성) 메서드를 사용한다.
    - `React.createElement(Component Type, Props Object, Child Component)`
    - 특별한 빌드 프로세스와 변환 없이 사용 가능하다.
    - JSX에 비해서 상대적으로 장황하고 코드 가독성이 좋지 않다.

```javascript
React.createElement(
    'div',
    {id:'content'},
    React.createElement(
        'p',
        null,
        'Hello world'
    )
)
```
    
<br>

- 적용

```javascript
// index.jsx
import React from 'react';

// ReactDOM.createRoot(entryPoint).render(<App />);
ReactDOM.createRoot(entryPoint).render(React.createElement(App));
```
이런 식으로 고칠 수 있다!

<br>

### 📖 Fragments(프래그먼트)

```jsx
// App.jsx
return(
  <div>
    <Header />
    <main>
    </main>
  </div>
)
```

- index.css에 `<div>`와 관련된 설정값도 없어서 굳이 `<div>`를 써 놓을 필요가 없었다.
- 그럼에도 `<div>`를 넣은 이유는 이것을 지우는 순간 오류가 발생하기 때문!
- **JSX 표현식은 하나의 상위 혹은 부모 요소를 가지고 있어야 한다.**
그러면 실제로 브라우저에서는 다음과 같은 DOM 구조를 갖게 된다.
```HTML
<div id="root">
  <div>
    <header></header>
    <main></main>
  </div>
</div>
```

> 이러한 것들의 대안으로 나온 것이 Fragment

<br>

- Fragment : 리액트 자체적으로 내장되어있는 컴포넌트

```jsx
import {useState, Fragment} from 'react';

return (
    <Fragment>
      <Header />
      <main>
      </main>
    </Fragment>
  );
```

이렇게하면 다음과 같은 DOM 구조가 나온다.

```html
<div id="root">
  <header></header>
  <main></main>
</div>
```

&rarr; 최신에는 이렇게도 사용할 수 있다.

```jsx
// import도 안해도 됨

return(
    <>
      <Header />
      <main>...
      </main>
    </>
)
```

<br>

## 📌 Components

### 📖 컴포넌트를 분리해야할 때는 언제인가?

- 단 하나의 컴포넌트를 가지고 다양한 요소를 관리한다면 더 작은 단위의 하위 컴포넌트를 여러 개로 나누는 것이 좋다.
- State가 해당 컴포넌트를 계속해서 재실행하므로, 변화가 일어나지 않았으면 해도 하나의 컴포넌트로 이루어져 있다면 필연적으로 재실행이 되어 변화가 될 수 있다!

<br>

### 📖 Feature(피처) 및 State(상태)로 컴포넌트 분리하기

1. src/components/CoreConcepts.jsx, src/components/Examples.jsx 파일 생성
2. 컴포넌트 분리하기

#### App.jsx
```jsx
import Header from "./components/Header/Header.jsx";
import CoreConcepts from "./components/CoreConcepts.jsx";
import Examples from "./components/Examples.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </>
  );
}

export default App;
```

#### CoreConcepts.jsx
```jsx
import CoreConcept from "./CoreConcept.jsx";
import { CORE_CONCEPTS } from "../data";

export default function CoreConcepts() {
  return (
    <section id="core-concepts">
      <h2>Core Concepts</h2>
      <ul>
        {CORE_CONCEPTS.map((conceptItem) => (
          <CoreConcept key={conceptItem.title} {...conceptItem} />
        ))}
      </ul>
    </section>
  );
}
```

#### Examples.jsx
```jsx
import { useState } from "react";

import TabButton from "./TabButton.jsx";
import { EXAMPLES } from "../data.js";

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton) {
    // selectedButton => 'components', 'jsx', 'props', 'state'
    setSelectedTopic(selectedButton);
  }

  let tabContent = <p>Please select a topic.</p>;

  if (selectedTopic) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div>
    );
  }
  return (
    <section id="examples">
      ...
    </section>
  );
}
```

🚨분리할 때, jsx 부분을 return으로 감싸는 것 잊지 않기!🚨

🔗 [레파지토리에서 보기](https://github.com/Imshyeon/Develop_Study/tree/882aa7648edef2b132e940f36609c2be05ec2fc3/React/Complete-React/3_React-Essentials-Deep-Dive/src)

<br>

### 📖 Section.jsx를 만들기

```jsx
// CoreConcepts.jsx
export default function CoreConcepts() {
  return (
    <section id="core-concepts">
      <h2>Core Concepts</h2>
      <ul>
      </ul>
    </section>
  );
}

// Examples.jsx
export default function Examples() {
    return(
     <section id="examples">
       <h2>Examples</h2>
       <menu>
       </menu>
     </section>
    );
}
```
- 두 컴포넌트 모두 `<section>-제목-내용` 순으로 이뤄져 있다. 이것을 이용해 Section.jsx 컴포넌트를 생성

```jsx
// Section.jsx
export default function Section({ title, id, children }) {
  return (
    <section id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```
- `<section id="example">`과 같은 prop들은 커스텀 컴포넌트에 설정할 때 자동으로 적용되거나 해당 컴포넌트 속 JSX 코드로 넘어가지 않는다. **Props are not forwarded automatically.**
- 리액트에서는 요소에 대한 props가 개발자가 설정하는대로만 적용된다.
- 따라서 위에서도 `Section({id})`를 이용하여 속성값을 전달했다.

🚨 하지만 이런 방식을 사용한다면 개발자는 속성을 계속해서 설정을 해야한다..! &rarr; 비효율적 🚨<br>
> 따라서 forwarded props(전달 속성), proxy props(대리 속성)을 사용한다.

<br>

### 📖 Forwarded Props(Proxy Props)

```jsx
export default function Section({ title, children, ...props }){
  return (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```
- `Section({...props})` : 자바스크립트의 내장문법. title과 children을 제외한 모든 다른 props를 모아서 props object로 병합한다. 이 경우에는 데이터를 객체로 모으기 위해 사용.
- `<section {...props}>` : 데이터, 즉 값의 집합을 펼쳐서 다른 요소에 보내기 위함.

#### TabButton.jsx에 적용하기

```jsx
// TabButton.jsx
export default function TabButton({ children, isSelected, ...props }) {
  console.log("TABBUTTON COMPONENT EXECUTING");
  return (
    <li>
      <button className={isSelected ? "active" : undefined} {...props}> 
        {children}
      </button>
    </li>
  );
}

// Examples.jsx
<TabButton
isSelected={selectedTopic === "components"}
onClick={() => handleSelect("components")}
>
```
- TabButton.jsx에서 `{...props}`를 이용하여 onClick 동작시킨다.

<br>

### 📖 여러 JSX 슬롯 활용법

1. src/components/Tabs.jsx 생성
2. Tabs.jsx 코드 작성
```jsx
export default function Tabs({ children, buttons }) {
  return (
    <>
      <menu>{buttons}</menu>
      {children}
    </>
  );
}
```

3. Examples.jsx 코드 작성
```jsx
export default function Examples(){
 return (
    <Section id="examples" title="Examples">
      <Tabs
        buttons={
          <>
            <TabButton
              isSelected={selectedTopic === "components"}
              onClick={() => handleSelect("components")}
            >
              Components
            </TabButton>
            <TabButton
              isSelected={selectedTopic === "jsx"}
              onClick={() => handleSelect("jsx")}
            >
              JSX
            </TabButton>
            <TabButton
              isSelected={selectedTopic === "props"}
              onClick={() => handleSelect("props")}
            >
              Props
            </TabButton>
            <TabButton
              isSelected={selectedTopic === "state"}
              onClick={() => handleSelect("state")}
            >
              State
            </TabButton>
          </>
        }
      >
        {tabContent}
      </Tabs>
    </Section>
  );
}
```

- Tabs라는 컴포넌트 안에 buttons라는 props를 생성한 뒤, 해당 props안에 넣고자하는 모든 버튼들을 넣는다. 이때, 하나의 루트를 통해서 전달하는 것처럼 fragment로 감싼 뒤, 버튼을 전달한다.
- Tabs 컴포넌트 안의 내용(children)도 전달하여 결과값인 tabContent를 표현하게끔 한다.

<br>

### 📖 컴포넌트 타입 동적으로 설정하기

- button을 감싸는 요소(태그)를 개발자가 설정하고 싶은 경우가 있다.
- 이 패턴은 컴포넌트 식별자를 속성의 값으로 보내고, 이 식별자가 해당 컴포넌트(여기서는 Tabs)에 속해있기 때문에 다양한 HTML 요소를 동적으로 렌더링할 수 있다.

```jsx
// Tabs.jsx
export default function Tabs({ children, buttons, buttonsContainer }) {
  const ButtonsContainer = buttonsContainer; // 커스텀 컴포넌트로서 사용되서 대문자로 시작.
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}

// Examples.jsx
<Tabs
    // buttonsContainer={Section}
    buttonsContainer="menu"
    buttons={}>...</Tabs>
```

- Examples.jsx에서 `buttonsContainer={Section}` : 커스텀 컴포넌트는 동적값으로 설정. 내장요소는 단순히 문자열로 전달.

```jsx
// Tabs.jsx
export default function Tabs({ children, buttons, ButtonsContainer }) {
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}

// Examples.jsx
<Tabs
    ButtonsContainer="menu"
></Tabs>
```
- 속성을 한 상수에 새로 설정하는 대신 처음부터 대문자로 시작하는 상수를 받도록 설정하여 할 수도 있다.

> 1. 속성(`ButtonsContainer`)이 반드시 받는 쪽 컴포넌트(`Tabs`)에서 커스텀 컴포넌트로서 사용 가능해야 한다.
> 2. 식별자에는 문자열 이름(`menu, ul, div..`)을 사용하는데 만약 커스텀 컴포넌트(`{Section}`)를 사용하고 싶다면 컴포넌트 함수를 사용해야만 적용 가능하다.

<br>

### 📖 기본 Prop(속성) 값 설정

```jsx
// Tabs.jsx
export default function Tabs({ children, buttons, ButtonsContainer = "menu" }) {
  //   const ButtonsContainer = buttonsContainer; // 커스텀 컴포넌트로서 사용되서 대문자로 시작.
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}

// Examples.jsx
<Tabs buttons={}>
</Tabs>
```
- 기본 props를 설정함으로써 위에서 `<Tabs ButtonsContainer="menu" buttons={}>`에서 ButtonsContainer 속성을 삭제했다.