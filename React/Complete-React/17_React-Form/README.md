# Form 및 사용자 입력

[📌 Forms 소개](#-forms-소개)<br>
[📌 사용자 입력 수집 및 관리하기](#-사용자-입력-수집-및-관리하기)<br>
<br>

## 📌 Forms 소개

- 양식(입력창) 필드의 집합
- 내장된 HTML 요소 중 하나이다.

### 📖 Form의 역할

1. 사용자가 입력한 값을 추출하는 작업

   - 양방향 바인딩을 설정하여 상태를 통해 데이터를 관리 가능하다.
   - 값을 추출하기 위해 참조를 사용할 수도 있다.
   - 브라우저가 제공하는 함수들을 사용하여 사용자가 입력한 데이터를 추출하고 formData 객체를 통해 양식 필드로 옮길 수 있다.

   <br>

2. 사용자가 제공한 데이터를 검증하는 작업 &rarr; 만약 부정확한 입력창을 제시하면 사용자에게 검증 오류를 제시하기도 한다.
   - 키를 누를때마다 사용자가 입력한 것을 검증하고 그에 따른 에러 메시지를 계속 띄우는 방법 &rarr; 에러가 너무 일찍 나타나는 문제
   - 입력을 다 끝났을 때 검증을 실행 &rarr; 오류가 너무 오랫동안 보이는 문제
   - 양식 제출 시 검증을 실행 &rarr; 오류가 너무 늦게 나오는 문제

<br>

### 📖 Form 제출 다루기

#### 💎 Login.jsx

- 양식(form)안에 있는 버튼은 양식을 제출하는 용도로 사용된다. 즉, HTTP 요청이 발생하고 웹 사이트의 서버로 전송된다.
- 따라서 단순히 버튼을 눌렀을 때 그에 따른 함수를 동작시키는 것으로는 안된다.
- 해결하기
  - 방법 1 : 해당 버튼에 `type="button"` 설정
  - 방법 2 : form에 onSubmit을 설정한다. &rarr; 해당 이벤트가 실행될 때 기본 동작을 막기 위해 `event.preventDefault()`로 설정하여 기본 동작을 막는다.

<br>

## 📌 사용자 입력 수집 및 관리하기

### 📖 State & 일반 Handler 이용하기

#### 💎 Login.jsx

```jsx
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
```

#### 💎 결과

![결과1](./src/assets/formInputState.png)

<br>

### 📖 Refs(참조)로 사용자 입력 수집하는 방법

#### 💎 Login.jsx

```jsx
import { useRef } from "react";

export default function Login() {
  const enteredEmail = useRef();
  const enteredPw = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const email = enteredEmail.current.value;
    const pw = enteredPw.current.value;
    console.log("User Email: ", email);
    console.log("User PW: ", pw);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={enteredEmail} />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={enteredPw}
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
```

<br>

### 📖
