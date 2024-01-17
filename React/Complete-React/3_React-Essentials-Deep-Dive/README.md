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

🔗 [레파지토리에서 보기](https://github.com/Imshyeon/Develop_Study/commit/882aa7648edef2b132e940f36609c2be05ec2fc3)