import { useRouter } from "next/router";

export default function PortfolioDetailPage() {
  const router = useRouter();
  console.log(router.pathname); // /portfolio/[id];
  console.log(router.query); // {"id" : "2"}
  return (
    <div>
      <h1>The Portfolio Project {router.query.id} Page</h1>
    </div>
  );
}
