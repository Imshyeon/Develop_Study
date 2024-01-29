import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizComplteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]); // 답 등록
  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length; // 존재하고있는 질문 양과 인덱스값이 같으면 true 반환

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []); // 여기엔 추가하지 않아도 됨.
  // handleSelectAnswer 함수에서 상태나 속성 그리고 이에 의존하는 다른 어떠한 값도 사용하고 있지 않다.
  // 상태를 업데이트하는 함수(setUserAnswers)는 추가될 필요 없다. -> 리액트가 그들이 절대 바뀌지 않도록 보장하기 때문이다.

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null); // handleSelectAnswer 의존성을 사용함. => 해당 컴포넌트 함수에서 생성된 된 값이니까!
  }, [handleSelectAnswer]);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizComplteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  // 위의 quizIsComplete와 관련된 로직 아래에 위치해야한다. 해당 부분을 먼저 검사 후 셔플을 진행 -> 화면에 렌더링하는 순서여야 함.
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5); // 해당 배열을 수정하는 것. 새로운 배열을 추가함으로써 원본 배열을 유지.
  // 항상 두개의 요소 필요하고 만약 음수를 반환하면, 해당 요소들의 위치가 바뀐다.이에 비해 양수를 반환하면, 원래 순서를 유지한다.
  // () => Math.random() - 0.5 ==> 반은 양수, 반은 음수로 하여 셔플할 것이다.

  return (
    <div id="quiz">
      <div id="question">
        {/* handleSelectAnswer(null)로 설정함으로써 해당 질문에 어떠한 답변하지 않고 넘어갔음을 상태에 알림 */}
        <QuestionTimer
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
