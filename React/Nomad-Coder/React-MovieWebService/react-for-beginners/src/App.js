import Button from "./Button";
import styles from "./App.module.css";

import { useState, useEffect } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");

  const onClick = () => setCounter((prevCounter) => prevCounter + 1);
  const onChange = (event) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    console.log("CALL THE API..");
  }, []);
  useEffect(() => {
    if (keyword !== "") {
      console.log("SEARCH FOR", keyword);
    }
  }, [keyword]);

  console.log("I run all the time.");

  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here..."
      />
      <h1 className={styles.title}>{counter}</h1>
      <Button onClick={onClick} text={"Continue"} />
    </div>
  );
}

export default App;
