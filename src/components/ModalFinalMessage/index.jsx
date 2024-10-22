import React from "react";

export default function Modal({ message, word, onRestart }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{message}</h2>
        <p>A palavra era: <strong>{word}</strong></p>
        <button onClick={onRestart}>Jogar Novamente</button>
      </div>
    </div>
  );
}
