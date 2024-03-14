import { FormEvent, useRef } from "react";

type NewTodoProps = {
  onAddTodo: (text: string) => void;
};

export default function NewTodo({ onAddTodo }: NewTodoProps) {
  const textInputRef = useRef<HTMLInputElement>(null);

  function todoSubmitHandler(event: FormEvent) {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    onAddTodo(enteredText);
  }
  return (
    <form onSubmit={todoSubmitHandler}>
      <div>
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">+ ADD TODO</button>
    </form>
  );
}
