import Post from "./Post";
import styles from "./PostList.module.css";
import NewPost from "./NewPost";
import Modal from "./Modal";
import { useState } from "react";

export default function PostList({ isPosting, onHideModal }) {
  const [enteredBody, setEnteredBody] = useState("");

  function changeBodyHandler(event) {
    setEnteredBody(event.target.value);
  }

  return (
    <>
      {isPosting && (
        <Modal onClose={onHideModal}>
          <NewPost onChange={changeBodyHandler} />
        </Modal>
      )}
      <ul className={styles.posts}>
        <Post author="Zoe" body={enteredBody} />
        <Post author="Fubao" body="Check out the full course" />
        <Post author="Aibao" body="이뽀 이뽀 아이바오" />
      </ul>
    </>
  );
}
