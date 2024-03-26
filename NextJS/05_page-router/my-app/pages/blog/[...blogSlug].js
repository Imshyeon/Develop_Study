import { useRouter } from "next/router";

export default function BlogPostsPage() {
  const router = useRouter();
  console.log(router.query); // {blogSlug: ["2024", "03"]}
  return (
    <div>
      <h1>The Blog Posts</h1>
    </div>
  );
}
