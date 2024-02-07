import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // ...
  } else {
    return response;
    const resData = await response.json();
    // const res = new Response("any data", { status: 201 }); // 최신 브라우저 기능으로 응답 객체 사용하여 자신만의 응답을 구축.
    // return res;
    // return resData.events; // 숫자,텍스트,객체 등 다 리턴할 수 있다.
  }
}
