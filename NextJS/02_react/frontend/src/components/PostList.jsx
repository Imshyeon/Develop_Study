import { useLoaderData } from "react-router-dom";
import Post from "./Post";
import styles from "./PostList.module.css";

export default function PostList() {
  const posts = useLoaderData();

  return (
    <>
      {posts.length > 0 && (
        <ul className={styles.posts}>
          {posts.map((post) => (
            <Post
              id={post.id}
              author={post.author}
              body={post.body}
              key={post.id}
            />
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>작성된 포스트가 없습니다.</h2>
          <p>포스트를 작성해 보세요!</p>
        </div>
      )}
    </>
  );
}
