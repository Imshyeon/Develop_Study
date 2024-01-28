import { createContext } from "react";

export const QuestionContext = createContext({
  data: undefined,
  isCorrect: undefined,
  onQuizClick: () => {},
});
