# Class-based Components

[📌 클래스 기반 컴포넌트](#-클래스-기반-컴포넌트)<br>
<br>

## 📌 클래스 기반 컴포넌트

**_이 클래스 기반 컴포넌트는 언제까지나 선택사항이고 대부분의 모던 리액트 프로젝트들은 이전에 배웠던 것처럼 함수형 컴포넌트를 구축할 것이다 리액트 훅의 영향으로 인한 것이다._**

- 클래스 기반 컴포넌트는 리액트 훅을 사용할 수 없다.
- 클래스 기반 컴포넌트는 함수형 컴포넌트와 함께 사용할 수 있다. 결론적으로 함수형/클래스 기반 둘 다 컴포넌트이다.

### 📖 클래스 기반 컴포넌트 추가하기

```jsx
// User.jsx
import { Component } from "react";
import classes from "./User.module.css";

class User extends Component {
  render() {
    // 함수형 컴포넌트에서의 반환 문장과 동일.
    return <li className={classes.user}>{this.props.name}</li>;
    // this.props : Component를 상속받은 모든 props 포함
  }
}

// 위의 클래스 기반 컴포넌트와 동일하다.
// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
```

<br>

### 📖 State 및 이벤트 작업하기

#### 💎 Users.js

```javascript
import { useState, Component } from "react";
import User from "./User";

import classes from "./Users.module.css";

const DUMMY_USERS = [
  { id: "u1", name: "Max" },
  { id: "u2", name: "Manuel" },
  { id: "u3", name: "Julie" },
];

class Users extends Component {
  constructor() {
    super(); // 상위 클래스를 상속받았으니까.
    // state 정의 - 항상 객체이다. 함수형에서는 숫자, 문자열, 객체 등으로 유연한 것과는 다르다.
    this.state = {
      showUsers: true,
      more: "Test",
    };
  }

  #toggleUsersHandler() {
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    }); // 컴포넌트에서 상속받은 메서드 - 항상 객체 사용. 갱신 함수도 지원한다.
    // 리액트가 백그라운드에서 현재 존재하는 상태와 전달하려는 객체를 결합한다. -> 기존 상태를 오버라이드하지 않고 병합을 하는 방식.
  }

  render() {
    const usersList = (
      <ul>
        {DUMMY_USERS.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        {/* 메서드 내부의 this 예약어가 코드가 평가될 시점의 동일한 값이나 동일한 내용을 갖도록 bind(this)를 통해 설정. */}
        <button onClick={this.#toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

export default Users;
```

1. `constructor` 메서드 안에서 state를 정의한다. 함수형 컴포넌트에서 state는 숫자, 문자열, 객체 등으로 유연하게 초기화할 수 있었던 반면에 클래스 기반 컴포넌트는 상태를 객체로만 초기화해야한다.
2. 상태 업데이트 함수는 상속받은 `Component`에서의 `setState` 메서드를 사용한다. 해당 메서드도 객체를 받으며 오버라이드 방식이 아닌 병합하는 방식으로 업데이트를 한다. 또한 함수형 컴포넌트처럼 이전 상태를 반영하기 위한 갱신 함수도 지원한다.
3. 이벤트를 작동시킬 때 `bind` 함수를 이용해서 메서드 내부의 this 예약어가 코드가 평가될 시점과 동일한 값/내용을 갖도록 설정을 해야한다.

<br>
