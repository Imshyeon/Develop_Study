# 페이지 & 파일 기반 라우팅

[📌 파일 기반 라우팅이란?](#-파일-기반-라우팅이란)<br>
<br>

## 📌 파일 기반 라우팅이란?

- Next.js에서는 React 컴포넌트 파일을 생성. 그 후 Next.js가 설정된 폴더 구조로부터 프로젝트의 라우터를 도출.
- 예시
  > - **/pages** : Next.js는 pages 폴더를 확인하고 지원하고자 하는 라우트 몇 개를 추론한다.
  >   - **index.js** : 요청의 시작 페이지 임을 추론 (my-domain.com/)
  >   - **about.js** : About 페이지를 로딩 (my-domain.com/about)
  >   - **/products**
  >     - **index.js** : 모든 products에 관한 페이지 (my-domain.com/products)
  >     - **[id].js** : 동적 경로를 추가하는데 사용되는 특별 표기법. Product 상세 페이지 (my-domain.com/products/1)

<br>

### 📖 첫 번째 페이지 추가하기

```js
// pages/index.js
export default function HomePage() {
  return (
    <div>
      <h1>The Home Page</h1>
    </div>
  );
}
```

<br>

### 📖 이름이 붙은 / 정적 라우트 파일 추가하기

```js
// pages/about.js
export default function AboutPage() {
  return (
    <div>
      <h1>The About Page</h1>
    </div>
  );
}
```

<br>

### 📖 중첩 경로 & 라우트로 작업하기

```js
// pages/portfolio/index.js
export default function PortfolioPage() {
  return (
    <div>
      <h1>The Portfolio Page</h1>
    </div>
  );
}
```

- 이러한 방식으로 about페이지도 pages/about/index.js로 변경할 수 있다.

```js
// pages/about/index.js
export default function AboutPage() {
  return (
    <div>
      <h1>The About Page</h1>
    </div>
  );
}
```

<br>

### 📖 동적 경로 & 라우트 추가하기

```js
import { useRouter } from "next/router";

export default function PortfolioDetailPage() {
  const router = useRouter();
  console.log(router.pathname); // /portfolio/[id];
  console.log(router.query); // {"id" : "2"}
  return (
    <div>
      <h1>The Portfolio Project {router.query.id} Page</h1>
    </div>
  );
}
```

<br>

### 📖 중첩된 동적 라우트 & 경로 구축하기

#### 💎 폴더 생성

> - clients
> - index.js : 모든 clients를 나열하는 페이지
> - [id]
>   - index.js : 특정 client의 모든 project를 나타내는 페이지
>   - [clientPrjId].js : 특정 client의 특정 project를 나타내는 페이지

```js
// clients/index.js
// 모든 클라이언트 나열
export default function ClientsPage() {
  return (
    <div>
      <h1>The Clients Page</h1>
    </div>
  );
}

// clients/[id]/index.js
import { useRouter } from "next/router";

export default function ClientProjectsPage() {
  const router = useRouter();
  return (
    <div>
      <h1>The Projects of a {router.query.id.toUpperCase()} Client</h1>
    </div>
  );
}

// clients/[id]/[clientPrjId].js
import { useRouter } from "next/router";

export default function SelectedClientProjectPage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>
        The Project Page for a {router.query.clientPrjId} for a{" "}
        {router.query.id.toUpperCase()} Client
      </h1>
    </div>
  );
}
```

<br>

### 📖 Catch-All 라우트 추가하기
