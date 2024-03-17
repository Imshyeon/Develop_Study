import Post from "./Post";
import styles from "./PostList.module.css";
import NewPost from "./NewPost";
import Modal from "./Modal";
import { useState } from "react";

export default function PostList() {
  const [enteredBody, setEnteredBody] = useState("");
  const [modalVisible, setModalVisible] = useState(true);

  function changeBodyHandler(event) {
    setEnteredBody(event.target.value);
  }

  function hideModalHandler() {
    setModalVisible(false);
  }

  return (
    <>
      {modalVisible && (
        <Modal onClose={hideModalHandler} visible={modalVisible}>
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
