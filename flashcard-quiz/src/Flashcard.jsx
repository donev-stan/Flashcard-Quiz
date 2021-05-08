import React, { useState, useEffect, useRef } from "react";

export default function Flashcard({ flashcard }) {
    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('initial');

    const frontElement = useRef();
    const backElement = useRef();

    function setMaxHeight(){
        const frontHeight = frontElement.current.getBoundingClientRect().height;
        const backHeight = backElement.current.getBoundingClientRect().height;

        setHeight(Math.max(frontHeight, backHeight, 200));
    }

    useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options]);
    useEffect(() => {
        window.addEventListener('resize', setMaxHeight);
        return () => window.removeEventListener('resize', setMaxHeight);
    }, []);

    return (
        <div className="col-lg-3 my-4">
            <div
                className={`card ${flip ? "flip" : ""}`}
                onClick={() => setFlip(!flip)}
                style={{height: height}}
            >
                <div className="front" ref={frontElement}>
                    {flashcard.question}
                    <div className="flashcard-options">
                        {flashcard.options.map((option) => {
                            return (
                                <div className="flashcard-option" key={option}>{option}</div>
                            );
                        })}
                    </div>
                </div>

                <div className="back" ref={backElement}>{flashcard.answer}</div>
            </div>
        </div>
    );
}
