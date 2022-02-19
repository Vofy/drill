import React, { useState, useEffect } from 'react';
import Result from '../result.js';
import Answer from './answer.js';
import "../../css/card.css";
import "../../css/quiz/quiz.css";
import DOMPurify from 'dompurify';
import { shuffleArray } from "../../lib/arrays"
import { quizQuestionParse } from '../../lib/dataParser1.js';

export default function Quiz(props) {
    const [allQuestions, setAllQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const fetchDataset = async () => {   
        let dataset = await fetch(props.dataset);
        return dataset.json();
    };

    const setQuestions = async () => {
        fetchDataset()
        .then((dataset) => {
            setAllQuestions(shuffleArray(dataset.questions));
        });
    };

    const nextQuestion = (e) => {
        let currentQuestion = quizQuestionParse(allQuestions[currentQuestionIndex])
        setCurrentQuestion(currentQuestion);

        if (currentQuestionIndex < allQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setCurrentQuestionIndex(0);
        }
    };

    useEffect(() => {
        setQuestions();
    }, []);

    useEffect(() => {
        nextQuestion();
    }, [allQuestions]);

    return (
        <div className='card' key={currentQuestionIndex}>
            <div className='question' dangerouslySetInnerHTML={{__html: currentQuestion && currentQuestion.question && DOMPurify.sanitize(currentQuestion.question)}}>
            </div>
            { currentQuestion && currentQuestion.answers && currentQuestion.answers.map((answer, key) => {
                return <Answer key={key} answer={answer}></Answer>
            })}
            <button className="button" onClick={nextQuestion}>Další otázka</button>
        </div>
    )
}