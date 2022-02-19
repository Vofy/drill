import DOMPurify from "dompurify";
import { useState } from "react";
import "../../css/quiz/answer.css";

export default function Answer(props) {
    const [answerClicked, setAnswerClicked] = useState(false);

    const checkIfCorrect = (e) => {
        setAnswerClicked(true);
    };

    const colorClass = 
        answerClicked 
        ? (props.answer.correct ? ' correct' : ' incorrect')
        : '';

    return (
        <button className={"answer" + colorClass} onClick={checkIfCorrect} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.answer.text)}}>
        </button>
    )
}