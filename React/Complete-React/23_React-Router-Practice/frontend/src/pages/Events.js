import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData();
  // console.log(events);
  // resolve는 연기된 값 중 하나를 값으로 취한다.
  return (
    // Suspense : 다른 데이터가 도착하길 기다리는 동안 폴백을 도와주는 특정한 상황에서 사용할 수 있다.
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {/* 데이터가 도착하면(프로미스가 리졸빙되고 데이터가 도착하면) 실행할 함수 */}
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw json({ message: "이벤트를 가져올 수 없습니다." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
  // 객체 안에는 해당 페이지에서 오갈 수 있는 모든 HTTP 요청을 넣어줘야한다.
  // loadEvents함수는 Promise를 리턴한다. 그리고 그 프로미스는 defer 안의 events 키에 저장된다.
}
