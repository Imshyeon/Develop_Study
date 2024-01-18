export default function Tabs({ children, buttons, ButtonsContainer = "menu" }) {
  //   const ButtonsContainer = buttonsContainer; // 커스텀 컴포넌트로서 사용되서 대문자로 시작.
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}
