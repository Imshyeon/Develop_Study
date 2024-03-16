# React 복습하기

[📌 React 복습하기](#-react-복습하기)<br>
<br>

## 📌 React 복습하기

### 📖 리액트 프로젝트 생성하기

- 설치 : `npx create-react-app .`

### 📖 리액트와 컴포넌트

#### 💎 커스텀 컴포넌트 만들어보기

```jsx
// components/Post.jsx
export default function Post() {
  return (
    <div>
      <p>Zoe</p>
      <p>react.js is awesome!</p>
    </div>
  );
}

// App.jsx
import Post from "./components/Post";

function App() {
  return (
    <>
      <h1>Hello World!</h1>
      <Post />
    </>
  );
}

export default App;
```

<br>

#### 💎 동적인 값 출력하기

```jsx
// components/Post.jsx
const names = ["Zoe", "Fubao"];

export default function Post() {
  const chosenName = Math.random() > 0.5 ? names[0] : names[1];
  return (
    <div>
      <p>{chosenName}</p>
      <p>react.js is awesome!</p>
    </div>
  );
}
```

<br>

#### 💎 컴포넌트 재사용하기

```jsx
//
```
