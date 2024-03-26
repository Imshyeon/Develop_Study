import { useRouter } from "next/router";
export default function FilteredEventsPage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>The Filtered Events Page - {router.query.eventSlug}</h1>
    </div>
  );
}
