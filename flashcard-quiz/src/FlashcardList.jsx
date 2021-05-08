import React from "react";
import Flashcard from "./Flashcard";

export default function FlashcardList({ flashcards }) {
    return (
        <div className="container m-4">
            <div className="row">
                {flashcards.map(flashcard => {
                    return <Flashcard flashcard={flashcard} key={flashcard.id} />
                })}
            </div>
        </div>
    );
}
