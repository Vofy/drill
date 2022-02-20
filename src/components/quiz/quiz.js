import React, { useState, useEffect } from 'react';
import Answer from './answer.js';
import "../../index.css";
import "../../css/card.css";
import "../../css/quiz/quiz.css";
import DOMPurify from 'dompurify';
import { shuffleArray } from "../../lib/arrays"
import { quizQuestionParse } from '../../lib/dataParser1.js';
import { useLocation } from 'react-router-dom';

export default function Quiz(props) {
    const location = useLocation();

    const [allTasks, setAllTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState({});
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

    const fetchDataset = async () => {   
        let dataset = await fetch(props.dataset);
        return dataset.json();
    };

    const fetchAndShuffleDataset = async () => {
        fetchDataset()
        .then((dataset) => {
            setAllTasks(shuffleArray(dataset.tasks));
        });
    };

    const nextTask = (e) => {
        setCurrentTaskIndex(currentTaskIndex + 1);
    };

    const previousTask = (e) => {
        setCurrentTaskIndex(currentTaskIndex - 1);
    };

    useEffect(() => {
        fetchAndShuffleDataset();
    }, [location]);

    useEffect(() => {
        if (currentTaskIndex < 0) {
            setCurrentTaskIndex(allTasks.length - 1);
        } else if (currentTaskIndex > allTasks.length - 1) {
            setCurrentTaskIndex(0);
        }

        setCurrentTask(quizQuestionParse(allTasks[currentTaskIndex]));
    }, [currentTaskIndex, allTasks]);

    return (<>
        <div className='card' key={currentTaskIndex}>
            <div className='Task' dangerouslySetInnerHTML={{__html: currentTask && currentTask.title && DOMPurify.sanitize(currentTask.title)}}>
            </div>
            { currentTask && currentTask.answers && currentTask.answers.map((answer, key) => {
                return <Answer key={key} answer={answer}></Answer>
            })}
        </div>

        <div className='card flex-end flex-row'>
            <button className="button" onClick={previousTask}>Předchozí otázka</button>
            <button className="button" onClick={nextTask}>Další otázka</button>
        </div>
        </>
    )
}