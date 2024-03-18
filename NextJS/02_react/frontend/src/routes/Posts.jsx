import PostList from "../components/PostList";
import { Outlet } from "react-router-dom";
function Posts() {
  return (
    <>
      <Outlet />
      <main>
        <PostList />
      </main>
    </>
  );
}

export async function loader() {
  const response = await fetch("http://localhost:8080/posts");
  if (!response.ok) {
    console.log("ERROR");
  }
  const resData = await response.json();
  return resData.posts;
}

export default Posts;
