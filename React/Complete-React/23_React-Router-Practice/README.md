# 연습 프로젝트 : 리액트 라우터

[📌 스스로 해결하기](#-스스로-해결하기)<br>
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
// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

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
