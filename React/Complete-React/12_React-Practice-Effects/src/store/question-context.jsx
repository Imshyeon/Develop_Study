import { createContext } from "react";

export const QuestionContext = createContext({
  quiz: undefined,
  onQuizClick: () => {},
  onQuizSkip: () => {},
});
