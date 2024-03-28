// 이 컴포넌트 함수는 어떤 사용자가 렌더링 하는지 먼저 파악해야 하므로 사전 렌더링 불가능.
export default function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  console.log(req);
  console.log(res);

  return { props: { username: "Zoe" } };
}
