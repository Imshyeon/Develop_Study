import MainNavigaton from "../components/MainNavigation";
import { Outlet } from "react-router-dom";
// Outlet : 이 컴포넌트는 자녀 라우트 요소들이 렌더링되어야 할 장소를 표시하는 역할을 한다.

function RootLayout() {
  return (
    <>
      <MainNavigaton />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default RootLayout;
