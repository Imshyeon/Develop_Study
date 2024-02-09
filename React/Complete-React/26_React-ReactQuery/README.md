# 리액트 쿼리 | Data Fetching with Tanstack Query

[📌 프로젝트 시작하기](#-프로젝트-시작하기)<br>
[📌 리액트 쿼리](#-리액트-쿼리)<br>
<br>

## 📌 프로젝트 시작하기

🔗 [Tanstack Query Docs](https://tanstack.com/query/latest)

- Tanstack Query(리액트 쿼리의 새로운 명칭)은 매우 강력한 패키지이다. 위의 공식 문서 참고!

<br>

## 📌 리액트 쿼리

> Tanstack Query : HTTP 요청을 전송하고 프론트엔드 사용자 인터페이스를 백엔드 데이터와 동기화된 상태로 유지하는데 이용하는 라이브러리.

- useEffect, fetch를 이용하여 HTTP 요청을 전송하고 할 수도 있으나 Tanstack 쿼리는 코드가 더 간결해지고 개발자로써 작업을 수행할 수 있다.
- 또한 여러가지 고급 기능이 있으므로 복잡한 리액트 앱을 빌드하는데 도움이 된다!

### 📖 리액트 쿼리 : 소개 및 이점

#### 💎 NewEventSection.jsx

```jsx
import { useEffect, useState } from "react";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";

export default function NewEventsSection() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/events");

      if (!response.ok) {
        const error = new Error("An error occurred while fetching the events");
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }

      const { events } = await response.json();

      return events;
    }

    fetchEvents()
      .then((events) => {
        setData(events);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  let content;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (error) {
    content = (
      <ErrorBlock title="An error occurred" message="Failed to fetch events" />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
```

- 위처럼 `useEffect, fetch`를 이용해도 되지만 많은 양의 코드를 작성해야 한다.
- 또한 상태도 관리해야하며, HTTP 요청을 하는 모든 컴포넌트에서 위처럼 작성해야한다. 커스텀 훅을 빌드하여 재사용할 수 있으나 그럼에도 고급 기능(ex. 캐시 이용하기)을 사용하기에는 부족하다. &rarr; 디테일한 작업에는 투박하다.
- Tanstack 쿼리는 상태관리를 비롯해 코드는 간결하게 사용할 수 있고 고급기능(캐시처리, 자체적으로 처리되는 데이터 가져오기, 앱 효율적이게 만들기 등)을 이용할 수 있다.
