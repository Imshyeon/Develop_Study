import classes from "./EventItem.module.css";
import { Link, useSubmit } from "react-router-dom";

function EventItem({ event }) {
  const submit = useSubmit(); //

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?"); // 불리언값 리턴 받음
    if (proceed) {
      submit(null, { method: "delete" }); // submit( {제출하고자하는 데이터}, { method: , action: '/any-different-path'} )
      // 제출하고자하는 데이터는 formData로 자동으로 감싸지게 될 것이다.
      // 만일 액션이 다른 라우트 경로에서 정의된다면 action키를 다른 경로로 설정할 수 있다.
      // 해당 컴포넌트가 속한 라우트가 같거나 이 컴포넌트가 렌더링되는 라우트가 같은 라우트 내에서 정의되므로 따로 action 정의하지 않아도 된다.
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
