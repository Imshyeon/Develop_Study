import MainNavigaton from "../components/MainNavigation";
function ErrorPage() {
  return (
    <>
      <MainNavigaton />
      <main>
        <h1>오류가 발생했습니다!</h1>
        <p>페이지를 찾을 수 없습니다!</p>
      </main>
    </>
  );
}
export default ErrorPage;
