import { useRouter } from "next/router";

export default function ClientProjectsPage() {
  const router = useRouter();

  function loadProjectHandler() {
    // load data...
    // router.push(`/clients/${router.query.id}/projecta`); // 다른 페이지로 이동
    router.push({
      pathname: `/clients/[id]/[clientsPrjId]`,
      query: { id: router.query.id, clientsPrjId: "project-a" },
    }); // 다른 페이지로 이동
    // router.replace() // 현재 페이지를 코드의 페이지로 대체. 즉, 페이지 이동 후에는 되돌아 갈 수 없다.
  }

  return (
    <div>
      <h1>The Projects of a {router.query.id} Client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}
