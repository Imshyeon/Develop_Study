# 리액트 라우터가 있는 SPA 다중 페이지 구축하기 | Single-Page Application Routing

[📌 라우팅](#-라우팅)<br>
<br>

## 📌 라우팅

- 라우팅 : URL의 경로가 다르면, 다른 콘텐츠가 화면에 로딩된다. &rarr; 1.html / 2.html 처럼 다른 파일을 통해 라우팅을 구현했다.
  - 항상 새로운 컨텐츠를 가져와야 한다. 새로운 Http 요청을 전송하고 새로운 응답을 받는 과정에서 사용자의 흐름이 중단될 수 있다. &rarr; 사용자 경험에 부정적인 영향이 있을 수 있다.
- 지금까지 우리는 URL에 따라 페이지를 로딩하진 않았다. (SPAs : Single-Page Applications)
  - 최초 HTML 요청을 하나만 전송한다.

### 📖 프로젝트 셋업 & 리액트 라우터 설치하기

- `npm install react-router-dom`

  🔗 [React Router](https://reactrouter.com/en/main)

<br>

### 📖 라우트 정의하기

- `createBrowserRouter` : 이 어플리케이션에서 지원하려는 라우트를 정의한다. 해당 함수 안에 라우터 정의 객체로 된 배열을 넣고, 모든 객체들은 각각 하나의 라우트를 가리킨다.
  - `path` : 경로 지정
  - `element` : 요소를 정의 -> 해당 경로가 활성화되면 element에서 작성한 JSX코드가 연결
  - `createBrowserRouter`에서 리턴된 값을 변수나 상수에 저장.
  - &rarr;해당 router를 화면에 렌더링해야하거나 또는 그 router를 로딩해야하고 적절한 페이지에 렌더링해야함을 알리기 위해서 저장
- `RouterProvider` : 이 컴포넌트는 우리의 JSX 코드에서 사용할 수 있는 일반 컴포넌트
  - 이 컴포넌트는 router 프로퍼티가 있는데, 이는 위에서 저장한 상수 router를 사용한다.

```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> }, // 메인.
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

<br>

### 📖 두번째 라우트 정의하기

```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductsPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

![router](./readme/router.gif)
