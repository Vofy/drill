import React from 'react';
import DOMPurify from 'dompurify';
import '../../css/card.css';
import { useRecoilValue } from 'recoil';

import { showIncorrectAnswersState } from '../../globalState';

export default function Result(props) {
    const showIncorrectAnswers = useRecoilValue(showIncorrectAnswersState);

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-question" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.res.item.question)}}/>
                { props.res.score && <div className="card-score">Shoda: {((1 - props.res.score) * 100).toFixed(0)}%</div> }
            </div>
            <div className="card-answer-correct" style={props.res.item.answers.correct && {display: "block"}}>
                {props.res.item.answers.correct && props.res.item.answers.correct.map((answer, index) =>
                    <div key={index} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(answer)}}></div>
                )}
            </div>
            <div className="card-answer-wrong" style={(showIncorrectAnswers && props.res.item.answers.incorrect) ? {display: "block"} : {}}>
                { props.res.item.answers.incorrect && props.res.item.answers.incorrect.map((answer, index) =>
                    <div key={index} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(answer)}}></div>
                )}
            </div>
            <div className="card-comment" style={props.res.item.comment && {display: "block"}}>
                Poznámka:
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.res.item.comment)}}></div>
            </div>
        </div>
    )
}