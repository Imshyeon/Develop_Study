import Post from "./Post";
import styles from "./PostList.module.css";
import NewPost from "./NewPost";
import Modal from "./Modal";
import { useState } from "react";

export default function PostList({ isPosting, onHideModal }) {
  const [posts, setPosts] = useState([]);

  function addPostHandler(postData) {
    setPosts((prevPosts) => [...prevPosts, postData]);
  }

  return (
    <>
      {isPosting && (
        <Modal onClose={onHideModal}>
          <NewPost onCancle={onHideModal} onAddPost={addPostHandler} />
        </Modal>
      )}
      <ul className={styles.posts}>
        {posts.map((post) => (
          <Post author={post.author} body={post.body} key={post.body} />
        ))}
      </ul>
    </>
  );
}
