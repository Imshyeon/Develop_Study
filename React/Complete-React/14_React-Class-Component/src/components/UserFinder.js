import { Fragment, useState, useEffect, Component } from "react";

import Users from "./Users";
import classes from "./UserFinder.module.css";

import UsersContext from "../store/users-context.js";

import ErrorBoundary from "./ErrorBoundary.js";

class UserFinder extends Component {
  // 클래스 컴포넌트는 한번에 하나의 컨텍스트만 연결 가능.

  static contextType = UsersContext; // 이 컴포넌트는 해당 컨텍스트에 접근 가능하다. 정적 프로퍼티는 한번만 설정 가능하다.

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  componentDidMount() {
    // http 요청을 보내서 받는 경우.. => 가장 처음 렌더링을 했을 때 실행. useEffect에서 의존성 배열이 빈 경우이다.
    this.setState({ filteredUsers: this.context.users });
  }

  componentDidUpdate(prevProps, prevState) {
    // 상태 변화로 인해 컴포넌트가 재평가되면 자동적으로 호출.
    //-> 의존성을 추가하여 의존성 배열에 있는 조건이 변화되면 그때 이 메서드 실행하도록 함.
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  } // effect 함수는 의존성 배열이 변경된 경우에만 리액트에 의해 실행. -> 훨씬 간단하고 가독성이 좋다.

  #searchChangeHandler(event) {
    this.setState({
      searchTerm: event.target.value,
    });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input
            type="search"
            onChange={this.#searchChangeHandler.bind(this)}
          />
        </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type="search" onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;
