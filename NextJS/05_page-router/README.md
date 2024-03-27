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

- 모든 라우트를 한번에 확보하는 방식.
- 예를 들어, '/blog/2024/03/' 로 접근했을 경우 해당 월에 작성된 모든 블로그 게시물을 불러오는 경우가 있다.
- [...NAME].js 를 통해 해당하는 경로를 모두 렌더링하도록 정의했기 때문에 Next.js는 /blog 뒤에 무엇이 붙든 페이지를 렌더링한다.

```js
// /blog/[...blogSlug].js
import { useRouter } from "next/router";

export default function BlogPostsPage() {
  const router = useRouter();
  console.log(router.query); // {blogSlug: ["2024", "03"]}
  return (
    <div>
      <h1>The Blog Posts</h1>
    </div>
  );
}
```

<br>

### 📖 `<Link>` 컴포넌트로 네비게이팅하기

- 기존의 `<a>` 태그는 새 페이지를 불러오기 위해 새로운 HTTP 요청을 보낸다. 즉, 리액트 앱을 실행할 때 갖는 앱 상태(state)가 바뀐다.
- `<Link>` 컴포넌트를 통해서 백엔드에서 HTTP 요청을 보낼 필요도 없고 앱 상태가 바뀌지도 않는다.
  - `href` : 이동할 페이지의 링크
  - `replace` : 새로운 페이지를 또 띄우지 않고 현재 페이지를 새 페이지로 바꿀 수 있다. &rarr; 뒤로 갈 수 없다.

```js
// index.js
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>The Home Page</h1>
      <ul>
        <li>
          <Link href="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link href="/clients">Clients</Link>
        </li>
      </ul>
    </div>
  );
}


// clients/index.js
import Link from "next/link";

export default function ClientsPage() {
  const clients = [
    { id: "max", name: "Maxmilian" },
    { id: "zoe", name: "Zoe" },
    { id: "taemin", name: "Taemin" },
  ];
  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link href={`/clients/${client.id}`}>{client.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

<br>

### 📖 Link href를 설정하는 다른 방법

```js
import Link from "next/link";

// 모든 클라이언트 나열
export default function ClientsPage() {
  const clients = [
    { id: "max", name: "Maxmilian" },
    { id: "zoe", name: "Zoe" },
    { id: "taemin", name: "Taemin" },
  ];
  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link
              href={{
                pathname: "/clients/[id]",
                query: { id: client.id },
              }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- 자바스크립트의 객체 형태로, Next.js에서 사용하는 특수 객체이다.
- href 프로퍼티의 값이자 문자열의 대안(문자열로 link를 작성하는 방법의 대안)이다.

<br>

### 📖 프로그래밍 방식으로 네비게이팅하기

```js
// pages/clients/[id]/index.js
import { useRouter } from "next/router";

export default function ClientProjectsPage() {
  const router = useRouter();

  function loadProjectHandler() {
    // load data...
    // router.push(`/clients/${router.query.id}/projecta`); // 다른 페이지로 이동
    router.push({
      pathname: `/clients/[id]/[clientsPrjId]`,
      query: { id: router.query.id, clientsPrjId: "project-a" },
    });

    // router.replace() // 현재 페이지를 코드의 페이지로 대체. 즉, 페이지 이동 후에는 되돌아 갈 수 없다.
  }

  return (
    <div>
      <h1>The Projects of a {router.query.id} Client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}
```

#### 💎 `router.push` : 다른 페이지로 이동

- 방법 1

  ```js
  router.push(`/clients/${router.query.id}/projecta`); // 다른 페이지로 이동
  ```

- 방법 2

  ```js
  router.push({
    pathname: `/clients/[id]/[clientsPrjId]`,
    query: { id: router.query.id, clientsPrjId: "project-a" },
  });
  ```

#### 💎 `router.replace`

- 현재 페이지를 코드의 페이지로 대체. 즉, 페이지 이동 후에는 되돌아 갈 수 없다.

<br>

### 📖 커스텀 404 페이지 추가하기

- pages/ 폴더 아래에 404.js 생성
- 404 에러가 발생했을 때 Next.js가 404.js가 반환한 컴포넌트를 불러오거나 이 파일로부터 컴포넌트를 내보낸다.

```js
// /pages/404.js
export default function NotFoundPage() {
  return (
    <div>
      <h1>Page not found!</h1>
    </div>
  );
}
```