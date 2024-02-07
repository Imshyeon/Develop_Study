import { useRouteLoaderData, json, useParams } from "react-router-dom";

import EventItem from "../components/EventItem";

function EventDetailPage() {
  // const params = useParams();
  const data = useRouteLoaderData("event-detail");
  // useRouteLoaderData : 부모의 데이터를 받기 위해 사용되는 훅. useLoaderData와 비슷하지만 부모 라우트에서 설정된 아이디값이 필요하다.

  return <EventItem event={data.event} />;
}

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params.id; // '/events/:id'
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "이벤트 디테일에 대한 정보를 받아올 수 없습니다." },
      { status: 500 }
    );
  } else {
    return response;
  }
}
