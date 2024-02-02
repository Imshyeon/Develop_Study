import { useState } from "react";
import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";
import useInput from "../hooks/useInput.js";

export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));
  const {
    value: pwValue,
    handleInputChange: handlePwChange,
    handleInputBlur: handlePwBlur,
    hasError: pwHasError,
  } = useInput("", (value) => hasMinLength(value, 6) && isNotEmpty(value));

  function handleSubmit(event) {
    event.preventDefault();
    if (emailHasError || pwHasError) {
      return;
    }
    console.log("User Email: ", emailValue);
    console.log("User PW: ", pwValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && "이메일 유형이 잘못되었습니다."}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={handlePwBlur}
          onChange={handlePwChange}
          value={pwValue}
          error={pwHasError && "비밀번호는 6글자 이상이어야 합니다."}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
