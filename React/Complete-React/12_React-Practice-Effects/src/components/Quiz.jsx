import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizComplteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

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
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            const isSelcted = userAnswers[userAnswers.length - 1] === answer;
            let cssClasses = "";
            if (answerState === "answered" && isSelcted) {
              cssClasses = "selected";
            }

            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelcted
            ) {
              cssClasses = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClasses}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
