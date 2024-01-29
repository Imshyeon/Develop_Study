import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from '../questions.js'
import { useState } from "react";

export default function Question({
  questionIdx,
  onSelectAnswer,
  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect:null
  })

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null // 아직 correct인지 wrong인지 모름 -> 1초 정도 뒤에 다시 업데이트를 해야한다.(Quiz 컴포넌트의 영향)
    })

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: answer===QUESTIONS[questionIdx].answers[0]
      })

      setTimeout(() => {
        onSelectAnswer(answer);
      },2000)
    },1000)
  }

  let answerState = ''
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered'
  }

  return (
    <div id="question">
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{QUESTIONS[questionIdx].text}</h2>
      <Answers
        answers={QUESTIONS[questionIdx].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
