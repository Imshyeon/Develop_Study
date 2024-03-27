export default function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  // props 키가 있는 객체를 항상 반환해야한다. 이 함수가 하는 일은 컴포넌트에 대한 프로퍼티를 준비하는 것이다.
  // 만약 파일에 getStaticProps 함수가 있으면 Next.js에서 먼저 해당 함수를 실행(컴포넌트 함수에 대한 props를 준비)하고 두번째로 컴포넌트 함수를 실행한다.
  // getStaticProps 함수에서는 원하는 코드를 제한 없이 실행가능하고 클라이언트 사이드에서는 절대 볼 수 없는 코드로 데이터를 페칭하고 HomePage 컴포넌트에 props를 통해 데이터를 줄 수 있다.

  return {
    props: {
      products: [{ id: "p1", title: "Product 1" }],
    },
  };
}
