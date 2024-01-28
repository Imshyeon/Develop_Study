import summaryImg from "../assets/quiz-complete.png";
import { useContext } from "react";
import { QuestionContext } from "../store/question-context";

export default function Summary() {
  const { quiz } = useContext(QuestionContext);

  // console.log(quiz)
  function calculateSummaryStats() {
    let skipped = 0;
    let correct = 0;
    let incorrect = 0;
    quiz.map((q) => {
      if (q.answer.isCorrect) {
        correct += 10;
      } else if (!q.answer.isCorrect) {
        incorrect += 10;
      } else {
        skipped += 10;
      }
    });
    return (
      <>
        <div className="number">
          {skipped}%<p className="text">answered incorrectly</p>
        </div>
        <div className="number">
          {correct}%<p className="text">answered incorrectly</p>
        </div>
        <div className="number">
          {incorrect}%<p className="text">answered incorrectly</p>
        </div>
      </>
    );
  }

  return (
    <section id="summary">
      <img src={summaryImg} alt="summary image" />
      <h2>quiz completed!</h2>
      <div id="summary-stats">{calculateSummaryStats()}</div>
      <ol>
        {quiz.map((q, i = 0) => {
          return (
            <li key={i}>
              <h3>{i + 1}</h3>
              <div className="question">{q.question.data}</div>
              <div className="user-answer">{q.answer.data}</div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
