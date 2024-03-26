import { useRouter } from "next/router";

export default function SelectedClientProjectPage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>
        The Project Page for a {router.query.clientPrjId} for a{" "}
        {router.query.id} Client
      </h1>
    </div>
  );
}
