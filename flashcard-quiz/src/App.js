import React, { useState } from 'react';
import FlashcardList from './FlashcardList';
import './App.css';

function App() {

  const questions = 
  [
    {
      id: 1,
      question: 'Sample Question?',
      answer: 'idk',
      options: [
        'sample answer',
        'another answer',
        'oh no, idc',
        'seven?'
      ]
    },
    {
      id: 2,
      question: 'Sample Question?',
      answer: 'idk',
      options: [
        'sample answer',
        'another answer',
        'oh no, idc',
        'seven?'
      ]
    }
  ]
;

  const [flashcards, setFlashcards] = useState(questions);


  return (
    <FlashcardList flashcards={flashcards} />
  );
}

export default App;