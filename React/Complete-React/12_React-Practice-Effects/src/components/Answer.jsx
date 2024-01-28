import { useContext, useEffect } from "react";
import { QuestionContext } from "../store/question-context";

export default function Answer({ children, question, answer }) {
  const { onQuizClick, quiz } = useContext(QuestionContext);

  // let classes;
  // function setClassName(answer) {
  //   if (answer.isCorrect) {
  //     classes = "correct";
  //   } else {
  //     classes = "wrong";
  //   }
  //   console.log(classes);
  // }

  return (
    <p className="answer">
      <button
        onClick={() => {
          // setClassName(answer);
          onQuizClick(question, answer);
        }}
        className=""
      >
        {children}
      </button>
    </p>
  );
}
