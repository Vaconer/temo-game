import React from "react";
import "./style.css";
import useController from "./controller";
export default function ModalFinalMessage({ word, onRestart, isWin }) {
  const controller = useController({ isWin });

  return (
    <div className="wrapper-modal" onClick={onRestart}>
      <div className={`modal ${controller.showModal ? "show" : ""}`}>
        <div className="modal-content">
          <h2>{controller.message}</h2>
          <p>
            A palavra: <strong>{word}</strong>
          </p>
          <button onClick={onRestart}>Jogar Novamente</button>
        </div>
      </div>
    </div>
  );
}
