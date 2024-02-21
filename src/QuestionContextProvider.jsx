import { createContext, useCallback } from "react";
import { useState } from "react";
import questions from "./questions";
import correctAnswers from "../correctAnswers";
export const QuestionsContext = createContext({
  questions: [],
  activeQuestion: null,
  answeredQuestions: { answered: [] },
  getAnswerValue: () => {},
  getSkippedValue: () => {},
  correctAnswers: [],
  setIsAnswered: () => {},
  startQuiz: () => {},
  restartQuiz: () => {},
});

export default function QuestionContextProvider({ children }) {
  const [answeredQuestions, setAnsweredQuestions] = useState({
    isStarted: false,
    answered: [],
  });
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  // function to pick answer
  const getAnswerValue = (answer) => {
    setIsAnswered(true);
    setAnsweredQuestions({
      ...answeredQuestions,
      answered: [
        ...answeredQuestions.answered,
        {
          question: questions[activeQuestion].text,
          questionId: questions[activeQuestion].id,
          answer: answer,
          result:
            correctAnswers[activeQuestion].correctAnswer === answer
              ? "correct"
              : "wrong",
        },
      ],
    });
    setActiveQuestion(activeQuestion + 1);
  };

  // function to pick skipped answer

  function getSkippedValue() {
    setAnsweredQuestions({
      ...answeredQuestions,
      answered: [
        ...answeredQuestions.answered,
        {
          question: questions[activeQuestion].text,
          questionId: questions[activeQuestion].id,
          answer: "skipped",
          result: "skipped",
        },
      ],
    });
    setActiveQuestion(activeQuestion + 1);
  }

  function startQuiz() {
    setAnsweredQuestions((prev) => {
      return { ...prev, isStarted: true };
    });
    console.log(answeredQuestions.isStarted);
  }

  function restartQuiz() {
    setAnsweredQuestions((prev) => {
      return { ...prev, answered: [], isStarted: false };
    });

    setActiveQuestion(0);
    setIsAnswered(false);

    console.log(answeredQuestions.isStarted);
  }

  const qtxValue = {
    questions: questions,
    activeQuestion: activeQuestion,
    answeredQuestions: answeredQuestions,
    getAnswerValue: getAnswerValue,
    getSkippedValue: getSkippedValue,
    correctAnswers: correctAnswers,
    isAnswered: isAnswered,
    setIsAnswered: setIsAnswered,
    startQuiz: startQuiz,
    restartQuiz: restartQuiz,
  };
  return (
    <QuestionsContext.Provider value={qtxValue}>
      {children}
    </QuestionsContext.Provider>
  );
}
