import { Link, useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate(); // 네비게이션 동작을 트리거할 수 있다. 즉, 코드 안에서 다른 라우트로 전환 가능.

  function navigateHandler() {
    navigate("products");
  }

  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to="products">the list of products</Link>
      </p>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
}

export default HomePage;
