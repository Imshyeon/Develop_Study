import classes from "./NewPost.module.css";
import Modal from "../components/Modal";
import { Link, Form, redirect } from "react-router-dom";

function NewPost() {
  return (
    <Modal>
      <Form method="POST" className={classes.form}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" required name="body" rows={3} />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="author" required />
        </p>
        <p className={classes.actions}>
          <Link type="button" to="/">
            취소
          </Link>
          <button type="submit">제출</button>
        </p>
      </Form>
    </Modal>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); // {body:'...', author:'...'}
  await fetch("http://localhost:8080/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });

  return redirect("/");
}

export default NewPost;
