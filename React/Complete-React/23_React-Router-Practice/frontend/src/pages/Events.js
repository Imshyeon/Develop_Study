import { useLoaderData } from "react-router-dom";
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
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // return { isError: true, message: "이벤트를 가져올 수 없습니다." };
    throw new Response(
      JSON.stringify({ message: "이벤트를 가져올 수 없습니다." }),
      { status: 500 }
    );
  } else {
    return response;
    // const resData = await response.json();
    //   return resData.events
  }
}
