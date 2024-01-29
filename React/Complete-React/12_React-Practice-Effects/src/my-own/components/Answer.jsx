import { useContext, useEffect } from "react";
import { QuestionContext } from "../store/question-context";

export default function Answer({ children, question, answer }) {
  const { onQuizClick, quiz } = useContext(QuestionContext);

  return (
    <p className="answer">
      <button onClick={() => onQuizClick(question, answer)} className="">
        {children}
      </button>
    </p>
  );
}
