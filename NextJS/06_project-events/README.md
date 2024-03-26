# 프로젝트 : 파일 기반 라우팅 앱

[📌 프로젝트 계획](#-프로젝트-계획)<br>
[📌 프로젝트 구현](#-프로젝트-구현)<br>
<br>

## 📌 프로젝트 계획

- '/' : 주요 이벤트 목록
- '/events' : 모든 이벤트가 표시.
- '/events/[id]' : 이벤트 디테일 페이지
- '/events/[...eventSlug]' : 필터링한 이벤트 페이지 &rarr; 조건에 부합하는 모든 이벤트가 페이지에 나타나게끔 한다.

<br>

## 📌 프로젝트 구현

### 📖 메인 페이지 설정하기

- 프로젝트 계획에 맞게 기본적인 라우트 설정을 진행하였다.
- 현재는 더미 출력값을 사용하고 있음을 참고!

```js
// pages/index.js
export default function HomePage() {
  return (
    <div>
      <h1>The Home Page</h1>
    </div>
  );
}

// pages/events/index.js
export default function EventsPage() {
  return (
    <div>
      <h1>The Events Page</h1>
    </div>
  );
}

// pages/events/[id].js
import { useRouter } from "next/router";
export default function EventDetailPage() {
  const router = useRouter();
  return (
    <div>
      <h1>The Event Detail Page - {router.query.id}</h1>
    </div>
  );
}

// pages/events/[...eventSlug].js
import { useRouter } from "next/router";
export default function FilteredEventsPage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>The Filtered Events Page - {router.query.eventSlug}</h1>
    </div>
  );
}
```
