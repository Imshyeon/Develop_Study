import { useState } from "react";

export default function Login() {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredPW, setEnteredPW] = useState("");
  const [enteredValue, setEnteredValue] = useState({
    email: "",
    pw: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log("User Email: ", enteredValue.email);
    console.log("User PW: ", enteredValue.pw);
  }

  function handleInputChange(identifier, value) {
    setEnteredValue((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }
  // function handlerEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }
  // function handlerPWChange(event) {
  //   setEnteredPW(event.target.value);
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={enteredValue.email}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) => handleInputChange("pw", event.target.value)}
            value={enteredValue.pw}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
