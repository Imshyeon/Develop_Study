# 연습 프로젝트 : 리액트 라우터

[📌 스스로 해결하기](#-스스로-해결하기)<br>
[📌 데이터 가져오기 & 제출하기](#-데이터-가져오기--제출하기)<br>
<br>

## 📌 스스로 해결하기

App.js의 설명대로 라우터 구성하기(가능하면 마지막 보너스 과제도 풀어보기!)

### 📖 1번 문제 : 5개의 더미 페이지 컴포넌트 생성

🔗 [레파지토리에서 보기](https://github.com/Imshyeon/Develop_Study/tree/ce7884c60540b6dc68281813ea0773f5fbc17518/React/Complete-React/23_React-Router-Practice/frontend/src/pages)

<br>

### 📖 2,3,4번 문제 : 각 페이지의 라우팅 설정하기, 네비게이션 설정 및 링크

#### 💎 App.js

```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <p>Error</p>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "events", element: <EventsPage /> },
      { path: "events/:id", element: <EventDetailPage /> },
      { path: "events/new", element: <NewEventPage /> },
      { path: "events/:id/edit", element: <EditEventPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

#### 💎 RootPage.js

```js
import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";

function RootPage() {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}
export default RootPage;
```

- Outlet을 추가하지 않아서 표현이 안됐었다...! 😂

<br>

### 📖 5번 문제 : 네비게이션 클래스 네임을 이용해 활성화된 페이지 표현하기

#### 💎 MainNavigation.js

```js
import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
```

### 📖 6, 7번 문제 : EventsPage에 더미 이벤트 리스트 출력하기 - 각 이벤트 리스트는 EventDetailPage와 연결

#### 💎 EventsPage.js

```js
import { Link } from "react-router-dom";
const DUMMY_EVENTS = [
  {
    id: "event1",
    title: "Event Page 1",
  },
  {
    id: "event2",
    title: "Event Page 2",
  },
  {
    id: "event3",
    title: "Event Page 3",
  },
  {
    id: "event4",
    title: "Event Page 4",
  },
  {
    id: "event5",
    title: "Event Page 5",
  },
];
function EventsPage() {
  return (
    <>
      <h1>EventsPage</h1>
      <ul>
        {DUMMY_EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={event.id}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsPage;
```

#### 💎 EventDetailPage.js

```js
import { useParams } from "react-router-dom";
function EventDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>EventDetailPage</h1>
      <p>{params.id}</p>
    </>
  );
}

export default EventDetailPage;
```

![myown](./README/myown.gif)

<br>

### 📖 BONUS

- Add another (nested) layout route that adds the `<EventNavigation>` component above all /events... page components

#### 💎 App.js

```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import EventsNavigation from "./components/EventsNavigation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <p>Error</p>,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsNavigation />,
        children: [
          { index: true, element: <EventsPage /> },
          { path: ":id", element: <EventDetailPage /> },
          { path: "new", element: <NewEventPage /> },
          { path: ":id/edit", element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

#### 💎 EventsNavigaion.js

```js
import classes from "./EventsNavigation.module.css";
import { Outlet } from "react-router-dom";

function EventsNavigation() {
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul className={classes.list}>
            <li>
              <a href="/events">All Events</a>
            </li>
            <li>
              <a href="/events/new">New Event</a>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default EventsNavigation;
```

![bonus](./README/bonus.png)

🔗 [레파지토리에서 보기](https://github.com/Imshyeon/Develop_Study/tree/ad3d76c815670066536bf0e2f012deec2f9866ba/React/Complete-React/23_React-Router-Practice/frontend/src)

<br>

---

<br>

## 📌 데이터 가져오기 & 제출하기

### 📖 `loader()`를 이용한 데이터 가져오기

#### 💎 기존에 사용하던 `useEffect, useState, fetch` 사용하기

```js
// pages/Events.js
import { useEffect, useState } from "react";

import EventsList from "../components/EventsList";

function EventsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/events");

      if (!response.ok) {
        setError("Fetching events failed.");
      } else {
        const resData = await response.json();
        setFetchedEvents(resData.events);
      }
      setIsLoading(false);
    }

    fetchEvents();
  }, []);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
    </>
  );
}

export default EventsPage;
```

![useEffectFetch](./README/useEffectFetch.png)

#### 💎 App.js

```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/Events";
import EventDetailPage from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import EventsRootLayout from "./pages/EventRoot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <p>Error</p>,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: async () => {
              const response = await fetch("http://localhost:8080/events");
              if (!response.ok) {
                // ...
              } else {
                const resData = await response.json();
                return resData.events; // EventsPage에 제공해 줄 것이다.
              }
            },
          },
          { path: ":id", element: <EventDetailPage /> },
          { path: "new", element: <NewEventPage /> },
          { path: ":id/edit", element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

- 리액트 라우터 버전6 이상이면 리액트 라우터가 데이터를 가져오고, 상태를 관리하는 것을 도와준다.
- `loader`
  - 함수를 값으로 취하는 프로퍼티.
  - 로더를 사용하는 라우터를 방문하기 직전에 리액트 라우터는 항상 로더 함수를 실행한다.

#### 💎 Events.js

```js
import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const events = useLoaderData(); // events는 resData.event가 된다.

  return <EventsList events={events} />;
}

export default EventsPage;
```

- `useLoaderData` : 가장 가까운 loader 데이터에 엑세스 하기 위해 실행할 수 있는 특수한 훅.
  - 사실 로더 함수에서 async, await을 사용했기 때문에 로더함수는 정확히 말하자면 프로미스를 리턴한다.
  - 그러나 리액트는 자동으로 프로미스로부터 resolving된 데이터를 받는다.

<br>

### 📖 `loader()` 데이터의 다양한 활용법

- `EventsList` 컴포넌트에서도 useLoaderData를 사용할 수 있다.

#### 💎 EventsList.js

```js
import classes from "./EventsList.module.css";
import { useLoaderData } from "react-router-dom";

function EventsList() {
  const events = useLoaderData();
  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            <a href="...">
              <img src={event.image} alt={event.title} />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
```

#### 💎 Events.js

```js
import EventsList from "../components/EventsList";

function EventsPage() {
  return <EventsList />;
}

export default EventsPage;
```

- `useLoaderData`는 로더가 정의된 라우트보다 더 높은 상위에서 사용할 수 없다.
- `useLoaderData`를 사용하기 위해서는 loader를 추가한 컴포넌트(라우트)와 같은 수준이거나 더 낮은 수준에 있는 컴포넌트에서 사용가능하다.

<br>

### 📖 `loader()` 코드를 저장해야하는 위치

- `loader()`로 인해 fetch가 간단해졌지만 App의 규모가 커졌다.
- 실제로 `loader()` 코드를 필요로 하는 컴포넌트 파일에 해당 코드를 넣는 것이 좋다. 즉, 여기서는 pages/Events가 있는 곳에 넣으면 된다.

#### 💎 Events.js

```js
import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const events = useLoaderData(); // events는 resData.event가 된다.

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // ...
  } else {
    const resData = await response.json();
    return resData.events;
  }
}
```

#### 💎 App.js

```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventDetailPage from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import EventsRootLayout from "./pages/EventRoot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <p>Error</p>,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          { path: ":id", element: <EventDetailPage /> },
          { path: "new", element: <NewEventPage /> },
          { path: ":id/edit", element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

- App이 더 간결해졌음을 볼 수 있다!

<br>

### 📖 `loader()` 함수가 실행되는 시기

- 어떤 페이지에 대한 loader는 해당 페이지로 이동하기 시작할 때 호출된다.
- 이런 방식은 해당 컴포넌트가 렌더링되고 있을 때 그와 관련된 데이터가 있다는 것을 확실히 할 수 있어서 좋다! 또한 로딩 중 상태를 관리할 필요가 없어서 좋다!
- 단점으로는 지연이 있을 수 있고 사용자는 아무것도 일어나지 않는 것처럼 보일 수 있다는 점이다.
