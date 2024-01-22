import { useState } from "react"; // 상태 끌어올리기
import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import Results from "./components/Result.jsx";

function App() {
  // 상태 끌어올리기 - 상태 정의
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  // 조건적 콘텐츠 - 에러메시지 출력 (duration >= 1 이어야 함)
  const inputIsValid = userInput.duration >= 1;

  // 상태 끌어올리기 - 상태 업데이트 함수
  function handleInputChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue,
      };
    });
  }

  return (
    <>
      <Header />
      {/* 상태 끌어올리기 - 상태 업데이트 함수, 상태를 UserInput에게 전달.*/}
      <UserInput onChange={handleInputChange} userInput={userInput} />
      {/* 상태 끌어올리기 - userInput을 통해서 결과를 계산 및 출력 */}
      {/* 조건적 콘텐츠 출력 */}
      {!inputIsValid && <p className="center">기간은 0보다 커야합니다.</p>}
      {inputIsValid && <Results userInput={userInput} />}
    </>
  );
}

export default App;
