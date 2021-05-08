import React from "react";
import Flashcard from "./Flashcard";

export default function FlashcardList({ flashcards }) {
    return (
        <div className="container justify-content-center">
            <div className="row my-4">
                {flashcards.map((flashcard) => {
                    return (
                        <Flashcard flashcard={flashcard} key={flashcard.id} />
                    );
                })}
            </div>
        </div>
    );
}
