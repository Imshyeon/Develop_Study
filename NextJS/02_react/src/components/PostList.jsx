import Post from "./Post";
import styles from "./PostList.module.css";
import NewPost from "./NewPost";
import Modal from "./Modal";

export default function PostList({ isPosting, onHideModal }) {
  return (
    <>
      {isPosting && (
        <Modal onClose={onHideModal}>
          <NewPost onCancle={onHideModal} />
        </Modal>
      )}
      <ul className={styles.posts}>
        <Post author="Fubao" body="Check out the full course" />
        <Post author="Aibao" body="이뽀 이뽀 아이바오" />
      </ul>
    </>
  );
}
