# TypeScript와 React

[📌 TypeScript와 React 함께 사용하기](#-typescript와-react-함께-사용하기)<br>
<br>

## 📌 TypeScript와 React 함께 사용하기

### 📖 React + TypeScript 프로젝트 설정하기

- 설치 : `sudo npm install -g create-react-app`
- 시작하기 : `create-react-app my-app --template typescript`

<br>

### 📖 Props으로 작성하기 & Props의 타입

#### 💎 App.tsx

```tsx
import React from "react";
import TodoList from "./components/TodoList";

function App() {
  const todos = [{ id: "t1", text: "Finish the course" }];
  return (
    <div className="App">
      <TodoList items={todos} />
    </div>
  );
}

export default App;
```

#### 💎 TodoList.tsx

```tsx
import React from "react";

interface TodoListProps {
  items: { id: string; text: string }[];
}

// const TodoList: React.FC<TodoListProps> = (props) => {
//   return (
//     <ul>
//       {props.items.map((todo) => (
//         <li key={todo.id}>{todo.text}</li>
//       ))}
//     </ul>
//   );
// };

// export default TodoList;

export default function TodoList({ items }: TodoListProps) {
  return (
    <ul>
      {items.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```
