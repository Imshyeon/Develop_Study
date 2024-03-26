import { getAllEvents } from "../../dummy-data.js";
import EventList from "../../components/events/event-list.js";
export default function EventsPage() {
  const events = getAllEvents();
  return (
    <div>
      <EventList items={events} />
    </div>
  );
}
