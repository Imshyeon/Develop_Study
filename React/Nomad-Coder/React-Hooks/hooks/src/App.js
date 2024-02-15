import "./App.css";
import useClick from "./customHooks/useClick";
import { useCallback } from "react";

export default function App() {
  const sayHello = useCallback(() => {
    console.log("hello");
  }, []);
  const title = useClick(sayHello);
  return (
    <div className="App">
      <h1 ref={title}>Hi</h1>
    </div>
  );
}
