# Class-based Components

[📌 클래스 기반 컴포넌트](#-클래스-기반-컴포넌트)<br>
<br>

## 📌 클래스 기반 컴포넌트

***이 클래스 기반 컴포넌트는 언제까지나 선택사항이고 대부분의 모던 리액트 프로젝트들은 이전에 배웠던 것처럼 함수형 컴포넌트를 구축할 것이다 리액트 훅의 영향으로 인한 것이다.***
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

