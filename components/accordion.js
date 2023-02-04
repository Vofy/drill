import React, { useState, useEffect } from 'react';

export default function Accordion(props) {
    const [accordionOpened, setAccordionOpened] = useState(false);

    const toggleAccordion = () => {
        setAccordionOpened(accordionOpened ? false : true);
    }

    useEffect(() => {
        setAccordionOpened(false);
    }, [])

    return (
        <div className="accordion">
            <button className="accordion-name" onClick={toggleAccordion}>
                <div>{props.name}</div>
                <div>+</div>
            </button>
            <div className={"accordion-content" + (accordionOpened ? ' opened' : '')}>{props.children}</div>
        </div>
    )
}