import { useRouter } from "next/router";

export default function ClientProjectsPage() {
  const router = useRouter();
  return (
    <div>
      <h1>The Projects of a {router.query.id.toUpperCase()} Client</h1>
    </div>
  );
}
