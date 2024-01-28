import { useContext } from "react";
import { QuestionContext } from "../store/question-context";

export default function Answer({ children, question, answer }) {
  const { onQuizClick } = useContext(QuestionContext);
  return (
    <p className="answer">
      <button onClick={()=>onQuizClick(question,answer)} >{children}</button>
    </p>
  );
}
