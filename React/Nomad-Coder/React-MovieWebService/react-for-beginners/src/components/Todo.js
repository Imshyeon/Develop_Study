import { useState } from "react";

export default function Todo() {
  const [toDos, setToDos] = useState([]);

  function onSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    setToDos((prevTodos) => {
      return [...prevTodos, data];
    });

    event.target.reset();
  }
  console.log(toDos);
  return (
    <div>
      <h1>My To Dos({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="todo" placeholder="Write your to do..." />
        <button type="submit">+ Add to do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((todo, idx) => (
          <li key={`${todo.todo}-${idx}`}>{todo.todo}</li>
        ))}
      </ul>
    </div>
  );
}
