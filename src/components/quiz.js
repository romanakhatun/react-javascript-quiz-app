import React, { useState, useEffect } from 'react';
import './quiz.scss';
import Questionnaire from './questionnaire';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestions, setCurrentQuestions] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10&type=multiple")
            .then(res => res.json())
            .then(data => {
                const questions = data.results.map((question) => ({
                    ...question,
                    answers: [
                        question.correct_answer,
                        ...question.incorrect_answers,
                    ].sort(() => Math.random() - 0.5)
                }));
                setQuestions(questions)
            });
    }, []);

    const handleAnswer = (answer) => {
        if (!showAnswer) {
            if (answer === questions[currentQuestions].correct_answer) {
                setScore(score + 1)
            }
        }
        setShowAnswer(true)
    }

    // Next Question
    const nextQuestion = () => {
        setCurrentQuestions(currentQuestions + 1)
        setShowAnswer(false);
    }

    return (
        <>
            <div className="quizSection">
                <h1> React Quiz</h1>
                <div className="questions">
                    {questions.length > 0 ?
                        currentQuestions >= questions.length ?
                            <div>
                                <p><strong>Game Ended !!! Your Score is:</strong> {score}</p>
                                <button className="btn"><a href="/">Restart Quiz</a></button>
                            </div> :
                            <div>
                                <p className="score">Score:{score}</p>
                                <p>Question: <strong>{currentQuestions + 1}</strong>/{questions.length}</p>
                                <Questionnaire data={questions[currentQuestions]} handleAnswer={handleAnswer} showAnswer={showAnswer} nextQuestion={nextQuestion} />
                            </div> :
                        <p className="text-center">Loading...</p>
                    }
                </div>
            </div>
        </>
    )
};

export default Quiz;