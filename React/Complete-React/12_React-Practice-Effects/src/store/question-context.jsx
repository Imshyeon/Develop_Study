import { createContext } from "react";

export const QuestionContext = createContext({
    questions: {
        data: undefined,
        isCorrect: undefined
    }
})