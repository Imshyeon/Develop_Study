import { useLoaderData, json } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  if (data.isError) {
    return <p>{data.message}</p>;
  }
  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/eventsss");
  if (!response.ok) {
    // return { isError: true, message: "이벤트를 가져올 수 없습니다." };
    // throw new Response(
    //   JSON.stringify({ message: "이벤트를 가져올 수 없습니다." }),
    //   { status: 500 }
    // );
    return json({ message: "이벤트를 가져올 수 없습니다." }, { status: 500 });
    // json() : json 형식의 데이터가 포함된 Response 객체를 포함하는 함수이다.
  } else {
    return response;
    // const resData = await response.json();
    //   return resData.events
  }
}
