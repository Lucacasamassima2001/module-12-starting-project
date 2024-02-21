import { useContext } from "react";
import { QuestionsContext } from "./QuestionContextProvider";
import Question from "./Question";
import questions from "./questions";
import Summary from "./Summary";
export default function Quiz() {
  const { activeQuestion, startQuiz, answeredQuestions } =
    useContext(QuestionsContext);
  return (
    <>
      {answeredQuestions.isStarted ? (
        <div id="quiz">
          {activeQuestion === questions.length ? <Summary /> : <Question />}
        </div>
      ) : (
        <div className="start-quiz">
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      )}
    </>
  );
}
