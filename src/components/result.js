import React from 'react';
import DOMPurify from 'dompurify';
import '../css/result.css';
import { useRecoilValue } from 'recoil';

import { showIncorrectAnswersState } from '../globalState';

export default function Result(props) {
    const showIncorrectAnswers = useRecoilValue(showIncorrectAnswersState);

    return (
        <div className="result">
            <div className="result-header">
                <div className="result-question" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.res.item.question)}}/>
                { props.res.score && <div className="result-score">Shoda: {((1 - props.res.score) * 100).toFixed(0)}%</div> }
            </div>
            <div className="result-answer-correct" style={props.res.item.answers.correct && {display: "block"}}>
                {props.res.item.answers.correct && props.res.item.answers.correct.map((answer, index) =>
                    <div key={index} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(answer)}}></div>
                )}
            </div>
            <div className="result-answer-wrong" style={(showIncorrectAnswers && props.res.item.answers.incorrect) ? {display: "block"} : {}}>
                { props.res.item.answers.incorrect && props.res.item.answers.incorrect.map((answer, index) =>
                    <div key={index} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(answer)}}></div>
                )}
            </div>
            <div className="result-comment" style={props.res.item.comment && {display: "block"}}>
                Poznámka:
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.res.item.comment)}}></div>
            </div>
        </div>
    )
}