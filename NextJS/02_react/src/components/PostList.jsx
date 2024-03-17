import Post from "./Post";
import styles from "./PostList.module.css";

export default function PostList() {
  return (
    <ul className={styles.posts}>
      <Post author="Zoe" body="React.js is awesome!" />
      <Post author="Fubao" body="Check out the full course" />
      <Post author="Aibao" body="이뽀 이뽀 아이바오" />
    </ul>
  );
}
