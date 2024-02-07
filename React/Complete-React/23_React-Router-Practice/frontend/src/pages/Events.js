import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  // useLoaderData : 가장 가까운 loader 데이터에 엑세스 하기 위해 실행할 수 있는 특수한 훅.
  const events = useLoaderData(); // events는 resData.event가 된다.
  // 사실 로더 함수에서 async, await을 사용함로 로더함수는 정확히 말하자면 프로미스를 리턴
  // 리액트는 자동으로 프로미스로부터 resolving된 데이터를 받는다.

  return <EventsList events={events} />;
}

export default EventsPage;
