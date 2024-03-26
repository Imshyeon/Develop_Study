import { getFeaturedEvents } from "../dummy-data.js";
import EventList from "../components/events/event-list.js";

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}
