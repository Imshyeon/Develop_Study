import { Component } from "react";
import classes from "./User.module.css";

class User extends Component {
  componentWillUnmount() {
    console.log('User will unmount!')
  }
  
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
