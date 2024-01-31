import { Component } from "react";

class ErrorBoundary extends Component {
  // 에러 바운더리 컴포넌트 = 정규 클래스 컴포넌트
  // componentDidCatch() 생명 주기 메서드를 활용하는 컴포넌트이다.

  constructor() {
    super();
    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    // 어느 클래스 컴포넌트에서 추가 가능하고 그 클래스 컴포넌트를 오류 경계로 만들게 됨.
    // 오류 경계는 catch 함수를 가지는 컴포넌트를 일컫는다.
    // 이 메서드는 하위 컴포넌트 중 하나가 오류를 만들거나 전달할 때 발동한다.

    // error 객체를 매개변수로 설정하고 리액트가 오류가 발생하면 자동으로 객체를 전달할 것.
    console.log(error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong!</p>;
    }
    return this.props.children; // 오류 경계 컴포넌트를 우리가 보호하려고 하는 컴포넌트로 둘러싸기 때문에 이 것을 리턴한다.
  }
}

export default ErrorBoundary;
