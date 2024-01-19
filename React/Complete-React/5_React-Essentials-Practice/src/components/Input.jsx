import { useState } from "react";

export default function Input({ inputId }) {
  const [inputValue, setInputValue] = useState(1);

  function handleInputChange(e) {
    console.log(e.target.value);
    setInputValue((prevInput) => {
      prevInput = inputValue + e.target.value;
    });
  }
  if (inputValue < 1) {
    throw new Error("1 이하 안됨.");
  }

  return (
    <div>
      <label htmlFor={inputId + "-investment}"}>{inputId} INVESTMENT</label>
      <input
        type="number"
        id={inputId + "-investment}"}
        onChange={handleInputChange}
        defaultValue={inputValue}
      />
    </div>
  );
}
