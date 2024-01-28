import { useState } from "react";
import quizLogo from "./assets/quiz-logo.png";
import Question from "./components/Question.jsx";

function App() {
  const [isCorrectOrNot, setIsCorrectOrNot] = useState({
    question: {
      data: undefined,
      isCorrect: undefined,
    },
  });

  function handleQuizClick(curQuestion) {
    setIsCorrectOrNot((prevQuiz) => {
      [...prevQuiz, curQuestion];
    });
  }

  return (
    <>
      <header>
        <img src={quizLogo} alt="quiz logo" />
        <h1>SHINee Quiz!</h1>
      </header>
      <section id="quiz">
        <Question />
      </section>
    </>
  );
}

export default App;
