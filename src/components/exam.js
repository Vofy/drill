import Result from './result.js';

export default function Exam(props) {
    props.setHeaderMode('search');

    return (
        <>
        { props.result && props.result.map((res, index) => <Result key={index} res={res}/>) }
        </>
    )
}