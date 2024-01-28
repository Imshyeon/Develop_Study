import { useState } from "react";
import quizLogo from "./assets/quiz-logo.png";
import Question from "./components/Question.jsx";
import { QuestionContext } from "./store/question-context.jsx";
import {deleteData} from "./quizDatas.js";

function App() {
  const [isCorrectOrNot, setIsCorrectOrNot] = useState([]);

  function handleQuizClick(curQuestion, curAnswer) {
    handleCorrectOrNot(curAnswer.isCorrect)
    console.log(curQuestion)
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
    printCorrectOrNot: handleCorrectOrNot
  };

  function handleCorrectOrNot(isCorrect) {
    // let className;
    // if (isCorrect) {
    //   className="correct"
    // } else {
    //   className="wrong"
    // }
    // console.log(className)
    console.log(isCorrect)
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
