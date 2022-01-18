import Result from './result.js';

export default function Exam(props) {
    props.setHeaderMode('search');

    return (
        <div className="content" ref={props.content}>
        { props.result && props.result.map((res, index) => <Result key={index} res={res}/>) }
        </div>
    )
}