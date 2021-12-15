import React from "react";
import "./quiz.scss";

const Questionnaire = ({
  handleAnswer,
  showAnswer,
  nextQuestion,
  data: { question, correct_answer, answers },
}) => {
  return (
    <div className="questionnaireSection">
      <h4 dangerouslySetInnerHTML={{ __html: question }}></h4>

      <div>
        {answers.map((answer, idx) => {
          const bgColor = showAnswer
            ? answer === correct_answer
              ? "correct"
              : "incorrect"
            : "normal";
          return (
            <button
              id="quizOptions"
              key={idx}
              className={`${bgColor}`}
              onClick={() => handleAnswer(answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          );
        })}
        {showAnswer && (
          <button className="btn" onClick={nextQuestion}>
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
