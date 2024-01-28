import { useContext } from "react";
import { QuestionContext } from "../store/question-context";

export default function Answer({ children, data }) {
  const { onQuizClick } = useContext(QuestionContext);
  return (
    <p className="answer">
      <button onClick={()=>onQuizClick(data)}>{children}</button>
    </p>
  );
}
