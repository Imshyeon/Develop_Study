import ProgressBar from "./ProgressBar.jsx";
import Answer from "./Answer.jsx";
import { getDatas } from "../quizDatas.js";
import { useEffect, useContext } from "react";
import { QuestionContext } from "../store/question-context.jsx";

const TIME = 5000;

function createRandomNumber(num) {
  return Math.floor(Math.random() * num);
}

export default function Question() {
  const { question, answer } = getDatas();
  const { quiz } = useContext(QuestionContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      //오답 함수 실행
    }, TIME);

    return () => {
      clearTimeout(timer);
    };
  }, []); // 의존성에 오답함수 연결 -> useCallback 사용해야함.

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
      <ProgressBar />
      <h2>{question.data}</h2>
      <div id="answers">{printAnswersHandler(question, answer)}</div>
    </div>
  );
}