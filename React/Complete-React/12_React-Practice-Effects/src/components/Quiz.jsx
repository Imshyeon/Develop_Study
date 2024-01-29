import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizComplteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]); // 답 등록
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1; // 이전 질문에 머무르도록 함.

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length; // 존재하고있는 질문 양과 인덱스값이 같으면 true 반환

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered"); // 사용자가 답변을 고른다면 해당 상태를 업데이트
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          // 정답이면
          setAnswerState("correct");
        } else {
          // 오답이면
          setAnswerState("wrong");
        }

        setTimeout(() => {
          // 다시 답변을 초기화 함으로써 다음 질문으로 넘어가도록 함.
          setAnswerState("");
        }, 2000);
      }, 1000); // 1초 뒤에 답변에 대한 클래스 네임 추가
    },
    [activeQuestionIndex]
  ); // 현재 QUESTIONS[activeQuestionIndex].answers[0]를 사용하므로 의존성 추가 필요.
  // activeQuestionIndex 값이 변경될 때마다 재실행될 필요가 있다.

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
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
