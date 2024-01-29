import ProgressBar from "./ProgressBar.jsx";
import Answer from "./Answer.jsx";
import { getDatas } from "../../quizDatas.js";
import { useEffect, useContext } from "react";
import { QuestionContext } from "../store/question-context.jsx";

const TIME = 5000;

export default function Question({ onQuizSkip }) {
  const { question, answer } = getDatas();
  // ======= 타이머 동작 ======
  useEffect(() => {
    const timer = setTimeout(() => {
      onQuizSkip(question);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [question, onQuizSkip]);

  // ==== Answer 버튼 출력 ====
  function printAnswersHandler(question, answers) {
    // id 오름차순 정렬
    const ids = [];
    answers.map((answer) => ids.push(answer.id));
    ids.sort();
    const sortedAnswers = [];
    ids.forEach((id) => {
      sortedAnswers.push(answers.find((answer) => answer.id === id));
    });

    return sortedAnswers.map((answer) => (
      <Answer key={answer.id} question={question} answer={answer}>
        {answer.data}
      </Answer>
    ));
  }

  return (
    <div id="question">
      <ProgressBar timer={TIME} />
      <h2>{question.data}</h2>
      <div id="answers">{printAnswersHandler(question, answer)}</div>
    </div>
  );
}
