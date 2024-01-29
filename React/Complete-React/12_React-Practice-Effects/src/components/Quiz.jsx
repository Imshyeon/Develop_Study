import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizComplteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

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
  []);

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

  return (
    <div id="quiz">
      <Question
        // 이제 Question 컴포넌트만 업데이트하면 하위 컴포넌트는 자동 업데이트 된다.
        key={activeQuestionIndex}
        questionIdx={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
