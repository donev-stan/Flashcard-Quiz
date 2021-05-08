import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import FlashcardList from "./FlashcardList";
import axios from "axios";

function App() {
    const [flashcards, setFlashcards] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {}, []);

    function decodeString(string) {
        const textArea = document.createElement("textarea");
        textArea.innerHTML = string;
        return textArea.value;
    }

    const categoryElement = useRef();
    const amountElement = useRef();
    const difficultyElement = useRef();

    useEffect(() => {
        axios.get("https://opentdb.com/api_category.php").then((response) => {
            setCategories(response.data.trivia_categories);
        });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        axios
            .get("https://opentdb.com/api.php", {
                params: {
                    amount: amountElement.current.value,
                    category: categoryElement.current.value,
                    difficulty: difficultyElement.current.value,
                },
            })
            .then((response) => {
                console.log(response);
                setFlashcards(
                    response.data.results.map((questionItem, index) => {
                        const answer = decodeString(
                            questionItem.correct_answer
                        );
                        const options = [
                            ...questionItem.incorrect_answers.map((a) =>
                                decodeString(a)
                            ),
                            answer,
                        ];

                        return {
                            id: `${index}-${Date.now()}`,
                            question: decodeString(questionItem.question),
                            answer: answer,
                            options: options.sort(() => Math.random() - 0.5),
                        };
                    })
                );
            });
    }

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container justify-content-center">
                    <form
                        className="row text-center"
                        style={{ width: "100%" }}
                        onSubmit={handleSubmit}
                    >
                        <div className="col-12" style={{fontFamily: 'fantasy'}}>
                            <h1>Flashcard Trivia</h1>
                        </div>

                        <div className="col-md-4 my-2">
                            <select
                                className="form-select"
                                id="category"
                                ref={categoryElement}
                            >
                                <option value=""> Any Category </option>
                                {categories.map((category) => {
                                    return (
                                        <option
                                            value={category.id}
                                            key={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className="col-md-2 my-2">
                            <input
                                className="form-control"
                                type="number"
                                id="amount"
                                min="1"
                                step="1"
                                defaultValue={10}
                                max="50"
                                ref={amountElement}
                            />
                        </div>

                        <div className="col-md-4 my-2">
                            <select
                                className="form-select"
                                ref={difficultyElement}
                            >
                                <option value={""}>Any Difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        <div className="col-md-2 my-2">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={handleSubmit}
                                style={{ width: "100%" }}
                            >
                                Generate
                            </button>
                        </div>
                    </form>
                </div>
            </nav>
            <FlashcardList flashcards={flashcards} />
        </>
    );
}

export default App;
