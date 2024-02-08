import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";

import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventDetailPage() {
  // const params = useParams();
  const { event, events } = useRouteLoaderData("event-detail");
  // useRouteLoaderData : 부모의 데이터를 받기 위해 사용되는 훅. useLoaderData와 비슷하지만 부모 라우트에서 설정된 아이디값이 필요하다.

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "이벤트 디테일에 대한 정보를 받아올 수 없습니다." },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw json({ message: "이벤트를 가져올 수 없습니다." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId; // '/events/:id'
  console.log(id);

  return defer({
    event: await loadEvent(id), // EventDetail이 로딩되기를 기다린 다음에 해당 페이지를 렌더링
    events: loadEvents(),
  });
}

export async function action({ request, params }) {
  const id = params.eventId;
  const method = request.method;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: method,
  });

  if (!response.ok) {
    throw json(
      { message: "이벤트를 삭제하는데 실패했습니다." },
      { status: 500 }
    );
  }
  return redirect("/events");
}
