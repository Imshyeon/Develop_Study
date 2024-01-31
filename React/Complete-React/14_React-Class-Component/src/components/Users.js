import { useState, Component } from "react";
import User from "./User";

import classes from "./Users.module.css";

// const DUMMY_USERS = [
//   { id: "u1", name: "Max" },
//   { id: "u2", name: "Manuel" },
//   { id: "u3", name: "Julie" },
// ];

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
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        {/* 메서드 내부의 this 예약어가 코드가 평가도리 시점의 동일한 값이나 동일한 내용을 갖도록 bind(this)를 통해 설정. */}
        <button onClick={this.#toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? "Hide" : "Show"} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
