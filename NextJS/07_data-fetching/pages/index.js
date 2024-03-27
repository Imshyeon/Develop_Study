import fs from "fs/promises";
import path from "path";

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
  console.log("(Re-)Generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json"); // 해당 파일에 대한 절대 경로를 구축
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData); // JS 객체로 변경
  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // 이 페이지로 들어오는 모든 요청에 대해 마지막으로 재생성된 지 10초가 지나면 재생성되어야 한다로 Next.js에게 알림.
  };
}
