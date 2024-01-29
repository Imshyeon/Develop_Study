import { useState, useEffect, useContext } from "react";
import { QuestionContext } from "../store/question-context";

export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(5000);
  const { quiz } = useContext(QuestionContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      setRemainingTime(5000);
      clearInterval(interval);
    };
  }, [quiz]);

  return <progress value={remainingTime} max={timer} />;
}
