import { useState } from "react";
import quizLogo from "./assets/quiz-logo.png";
import Question from "./components/Question.jsx";
import Summary from "./components/Summary.jsx";
import { QuestionContext } from "./store/question-context.jsx";
import { deleteData, getDatasLength } from "./quizDatas.js";

function App() {
  const [isCorrectOrNot, setIsCorrectOrNot] = useState([]);

  function handleQuizClick(curQuestion, curAnswer) {
    deleteData(curQuestion.qid);
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
  };

  return (
    <QuestionContext.Provider value={questionCtx}>
      <header>
        <img src={quizLogo} alt="quiz logo" />
        <h1>SHINee Quiz!</h1>
      </header>
      {getDatasLength() !== 0 && (
        <section id="quiz">
          <Question />
        </section>
      )}
      {getDatasLength() === 0 && <Summary/>}
    </QuestionContext.Provider>
  );
}

export default App;
