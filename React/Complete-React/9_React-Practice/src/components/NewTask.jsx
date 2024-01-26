import { useState } from "react";

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(e) {
    setEnteredTask(e.target.value);
  }

  function handleClick() {
    // validation
    if (enteredTask.trim() === "") {
      return;
    }
    onAdd(enteredTask); // 속성 꽂기.(props drilling : App -> SelectedProject -> Task -> NewTask)
    setEnteredTask(""); // 입력칸을 비도록 만듦.
  }

  return (
    <div className="flex items-center gap-4">
      <input
        onChange={handleChange}
        value={enteredTask}
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      />
      <button
        onClick={handleClick}
        className="text-stone-700 hover:text-stone-950"
      >
        Add Task
      </button>
    </div>
  );
}
