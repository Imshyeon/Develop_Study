import { useState, useContext } from "react";
import quizLogo from "./assets/quiz-logo.png";
import Question from "./components/Question.jsx";
import { QuestionContext } from "./store/question-context.jsx";

function App() {
  const [isCorrectOrNot, setIsCorrectOrNot] = useState([]);

  function handleQuizClick(curQuestion) {
    setIsCorrectOrNot((prevState) => {
      return [
        ...prevState,
        {
          data: curQuestion.data,
          isCorrect: curQuestion.isCorrect,
        },
      ];
    });
  }
  console.log(isCorrectOrNot);

  const questionCtx = {
    data: isCorrectOrNot.data,
    isCorrect: isCorrectOrNot.isCorrect,
    onQuizClick: handleQuizClick,
  };

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
