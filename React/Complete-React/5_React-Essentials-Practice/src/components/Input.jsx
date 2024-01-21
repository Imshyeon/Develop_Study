import { useState } from "react";

export default function Input({ inputId}) {
  const [inputValue, setInputValue] = useState();

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }
  
  let errorMessage;
  if (inputValue < 1) {
    errorMessage = (
      <label id="errorMessage">1 이하의 숫자는 입력할 수 없습니다.</label>
    );
  }

  return (
    <div>
      <label htmlFor={inputId + "-investment"}>{inputId} INVESTMENT</label>
      <input
        type="text"
        id={inputId + "-investment"}
        onChange={handleInputChange}
        defaultValue={inputValue}
      />
      {errorMessage}
    </div>
  );
}
