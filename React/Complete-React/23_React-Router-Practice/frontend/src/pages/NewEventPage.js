import EventForm from "../components/EventForm";
import { json, redirect } from "react-router-dom";

function NewEventPage() {
  return <EventForm />;
}

export default NewEventPage;

export async function action({ request, params }) {
  const data = await request.formData();
  const eventData = {
    title: data.get("title"), // name을 넣는다.
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };
  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 422) {
    // backend의 검증 코드
    return response;
    // 리턴된 action 데이터도 페이지와 컴포넌트에서 사용할 수 있다.(로더와 마찬가지)
  }

  if (!response.ok) {
    throw json(
      { message: "데이터를 전송하는데 실패했습니다." },
      { status: 500 }
    );
  }

  return redirect("/events");
}
