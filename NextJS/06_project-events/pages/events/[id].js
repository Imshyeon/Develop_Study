import { useRouter } from "next/router";
export default function EventDetailPage() {
  const router = useRouter();
  return (
    <div>
      <h1>The Event Detail Page - {router.query.id}</h1>
    </div>
  );
}
