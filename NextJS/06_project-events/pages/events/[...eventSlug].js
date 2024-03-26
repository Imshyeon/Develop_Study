import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data.js";
import EventList from "../../components/events/event-list.js";

export default function FilteredEventsPage() {
  const router = useRouter();
  const filteredData = router.query.eventSlug;
  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    // 숫자가 아닌 경우와 year, month에 맞지 않는 결과값이 나오면
    return (
      <p className="center">
        유효하지 않은 필터값 입니다. 유효한 값을 입력하세요!
      </p>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    // 필터링된 이벤트가 없는 경우
    return <p className="center">입력한 필터에 대한 이벤트가 없습니다.</p>;
  }

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
}
