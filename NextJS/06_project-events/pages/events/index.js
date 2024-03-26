import { getAllEvents } from "../../dummy-data.js";
import EventList from "../../components/events/event-list.js";
import EventsSearch from "../../components/events/events-search.js";

export default function EventsPage() {
  const events = getAllEvents();
  return (
    <div>
      <EventsSearch />
      <EventList items={events} />
    </div>
  );
}
