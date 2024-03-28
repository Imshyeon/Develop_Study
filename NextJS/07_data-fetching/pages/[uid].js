export default function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.uid;

  console.log("Server Side Code");

  return {
    props: { id: "userid-" + userId },
  };
}
