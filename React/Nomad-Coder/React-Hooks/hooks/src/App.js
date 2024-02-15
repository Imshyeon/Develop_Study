import "./App.css";
import useBeforeLeave from "./customHooks/useBeforeLeave";
import { useCallback } from "react";

export default function App() {
  const begForLife = useCallback(() => {
    console.log("Plz don't leave");
  }, []);
  useBeforeLeave(begForLife);
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}
