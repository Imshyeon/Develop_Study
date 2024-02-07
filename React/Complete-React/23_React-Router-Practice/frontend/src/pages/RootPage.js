import MainNavigation from "../components/MainNavigation";
import { Outlet, useNavigation } from "react-router-dom";

function RootPage() {
  // useNavigation : 리액트 라우터가 제공해주는 훅.
  // 현재 전환이 진행 중인지, 데이터를 전달하는 중인지 또는 전환이 진행되고 있지 않는지를 알 수 있다.
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === "loading" && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}
export default RootPage;
