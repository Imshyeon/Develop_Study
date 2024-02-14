import { useState } from "react";

export const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;

    if (typeof validator === "function") {
      willUpdate = validator(value); // true/false를 리턴해서 willUpdate를 업데이트.
    }
    if (willUpdate) {
      // willUpdate가 true이라면 업데이트
      setValue(value);
    }
  };
  return { value, onChange };
};
