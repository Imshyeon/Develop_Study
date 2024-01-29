import ProgressBar from "./ProgressBar.jsx";
import Answer from "./Answer.jsx";
import { getDatas, getDatasLength } from "../quizDatas.js";
import { useEffect, useContext } from "react";
import { QuestionContext } from "../store/question-context.jsx";

const TIME = 5000;

export default function Question() {
  const { question, answer } = getDatas();
  const { quiz, onQuizSkip } = useContext(QuestionContext);

  const isSkiped = quiz.map((q) => q.isSkiped);
  console.log(isSkiped);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("set Timer");
      onQuizSkip(question);
    }, TIME);

    return () => {
      clearTimeout(timer);
    };
  }, [isSkiped]);

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
