import { useLoaderData, json, useParams } from "react-router-dom";

import EventItem from "../components/EventItem";

function EventDetailPage() {
  // const params = useParams();
  const data = useLoaderData();

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
