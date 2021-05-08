import "./App.css";
import React, { useState, useEffect } from "react";
import FlashcardList from "./FlashcardList";
import axios from "axios";

function App() {
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        axios.get("https://opentdb.com/api.php?amount=10").then((response) => {
            setFlashcards(
                response.data.results.map((questionItem, index) => {
                    const answer = decodeString(questionItem.correct_answer);
                    const options = [...questionItem.incorrect_answers.map(a => decodeString(a)), answer];

                    return {
                        id: `${index}-${Date.now()}`,
                        question: decodeString(questionItem.question),
                        answer: answer,
                        options: options.sort(() => Math.random() - 0.5),
                    };
                })
            );
        });
    }, []);

    function decodeString(string){
      const textArea = document.createElement('textarea');
      textArea.innerHTML = string;
      return textArea.value;
    }

    return <FlashcardList flashcards={flashcards} />;
}

export default App;
