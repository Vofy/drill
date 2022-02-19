import React, { useState, useEffect } from 'react';
import Result from '../result.js';
import Answer from './answer.js';
import "../../css/card.css";
import "../../css/quiz/quiz.css";
import DOMPurify from 'dompurify';

export default function Quiz(props) {
    const [allQuestions, setAllQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

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

    const shuffleArray = (array) => {
        var m = array.length, t, i;
      
        // While there remain elements to shuffle…
        while (m) {
      
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
        
            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
      
        return array;
    }

    const nextQuestion = (e) => {
        setCurrentQuestion(allQuestions[currentQuestionIndex]);

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

    useEffect(() => {
        var answers = [];
        if (currentQuestion && currentQuestion.answers) {
            if (currentQuestion.answers.correct) {
                answers = answers.concat(currentQuestion.answers.correct.map(answer => ({
                    text: answer,
                    correct: true
                })));
            }
    
            if (currentQuestion.answers.incorrect) {
                answers = answers.concat(currentQuestion.answers.incorrect.map(answer => ({
                    text: answer,
                    correct: false
                })));
            }

            setShuffledAnswers(shuffleArray(answers));
        }
    }, [currentQuestion])

    return (
        <div className='card'>
            <div className='question' dangerouslySetInnerHTML={{__html: currentQuestion && currentQuestion.question && DOMPurify.sanitize(currentQuestion.question)}}>
            </div>
            { shuffledAnswers && shuffledAnswers.map((answer, key) => {
                return <Answer key={key} answer={answer}>{answer}</Answer>
            })}
            <button className="button" onClick={nextQuestion}>Další otázka</button>
        </div>
    )
}