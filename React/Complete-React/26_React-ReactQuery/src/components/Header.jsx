import { useIsFetching } from "@tanstack/react-query";

export default function Header({ children }) {
  const fetching = useIsFetching(); // 리액트 쿼리가 어플리케이션 어딘가에서 데이터를 가져오는지 확인할 수 있는 값을 얻게 된다.
  // 리액트 쿼리가 데이터를 가져오면 0보다 높은 숫자를, 데이터를 가져오지 않으면 0이 된다.
  return (
    <>
      <div id="main-header-loading">{fetching > 0 && <progress />}</div>
      <header id="main-header">
        <div id="header-title">
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
