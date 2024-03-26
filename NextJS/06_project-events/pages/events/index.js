import { getAllEvents } from "../../dummy-data.js";
import EventList from "../../components/events/event-list.js";
import EventsSearch from "../../components/events/events-search.js";

import { useRouter } from "next/router.js";

export default function EventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <div>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </div>
  );
}
