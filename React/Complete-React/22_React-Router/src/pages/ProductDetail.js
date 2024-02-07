import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const params = useParams();
  // params 객체는 우리가 라우트 정의에서 프로퍼티로 정의한 모든 역동적인 경로 세그먼트가 담긴 간단한 자바스크립트 객체이다.

  return (
    <>
      <h1> ProductDetailPage </h1>
      <p>{params.productId}</p>
      {/* '/products/:productId' */}
    </>
  );
}

export default ProductDetailPage;
