import { useState } from "react";
import quizLogo from "./assets/quiz-logo.png";
import Question from "./components/Question.jsx";
import { QuestionContext } from "./store/question-context.jsx";

function App() {
  const [isCorrectOrNot, setIsCorrectOrNot] = useState([]);

  function handleQuizClick(curQuestion, curAnswer) {
    setIsCorrectOrNot((prevState) => {
      return [
        ...prevState,
        {
          question: curQuestion,
          answer: { ...curAnswer },
        },
      ];
    });
  }

  const questionCtx = {
    quiz: isCorrectOrNot,
    onQuizClick: handleQuizClick,
    onSkipQuiz: handleSkipSameQuiz,
  };

  function handleSkipSameQuiz(curQuestion) {
    questionCtx.quiz.map(q => {
      if (curQuestion.qid === q.question.qid) {
        console.log('이미 낸 문제=>', q.question,'내려했던 문제=>',curQuestion)
        return;
      }
    })
  }

  return (
    <QuestionContext.Provider value={questionCtx}>
      <header>
        <img src={quizLogo} alt="quiz logo" />
        <h1>SHINee Quiz!</h1>
      </header>
      <section id="quiz">
        <Question />
      </section>
    </QuestionContext.Provider>
  );
}

export default App;
