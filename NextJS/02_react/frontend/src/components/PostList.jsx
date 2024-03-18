import Post from "./Post";
import styles from "./PostList.module.css";
import NewPost from "./NewPost";
import Modal from "./Modal";
import { useEffect, useState } from "react";

export default function PostList({ isPosting, onHideModal }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("http://localhost:8080/posts");
      if (!response.ok) {
        console.log("ERROR");
      }
      const resData = await response.json();
      setPosts(resData.posts);
    }
    fetchPosts();
  }, []);

  function addPostHandler(postData) {
    fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    setPosts((prevPosts) => [...prevPosts, postData]);
  }

  return (
    <>
      {isPosting && (
        <Modal onClose={onHideModal}>
          <NewPost onCancle={onHideModal} onAddPost={addPostHandler} />
        </Modal>
      )}
      {posts.length > 0 && (
        <ul className={styles.posts}>
          {posts.map((post) => (
            <Post author={post.author} body={post.body} key={post.id} />
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
