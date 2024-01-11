const TODOS_KEY = "toDos";

const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

let toDos = [];

const saveToDosHandler = () => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); // array -> string
};

const showToDosHandler = () => {
  const savedToDos = localStorage.getItem(TODOS_KEY);
  const parsedToDos = JSON.parse(savedToDos); // string -> object

  if (!parsedToDos) {
    return;
  }
  toDos = parsedToDos;
  parsedToDos.forEach(addToDoElementHandler);
};

const toDoSumbitHandler = (e) => {
  e.preventDefault();
  const newToDo = toDoInput.value; // input의 값을 새로운 변수에 복사
  toDoInput.value = "";
  const newTodoObj = {
    text: newToDo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  addToDoElementHandler(newTodoObj);
  saveToDosHandler();
};

const addToDoElementHandler = (toDo) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  span.textContent = toDo.text;
  button.textContent = "❌";
  li.id = toDo.id;
  li.append(span);
  li.append(button);
  toDoList.append(li);

  button.addEventListener("click", deleteToDoElementHandler);
};

const deleteToDoElementHandler = (toDo) => {
  console.log(toDo.target.parentElement, toDo);
  const target = toDo.target.parentElement;
  target.remove();
  toDos = toDos.filter((t) => t.id !== parseInt(target.id));
  saveToDosHandler(toDos);
};

toDoForm.addEventListener("submit", toDoSumbitHandler);

showToDosHandler();
