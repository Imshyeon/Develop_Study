import { useState } from "react";

export default function Input({ inputId }) {
  const [inputValue, setInputValue] = useState(1);

  function handleInputChange(e) {
    console.log(e.target.value);
    setInputValue(e.target.value);
    if (e.target.value < 1) {
      e.target.value = 1
    }
  }

  let errorMessage;
  if (inputValue < 1) {
    errorMessage = <label id="errorMessage">1 이하의 숫자는 입력할 수 없습니다.</label>
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
      {errorMessage}
    </div>
  );
}
