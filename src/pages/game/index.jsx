// src/components/Game.js

import "../../styles/Game.css";
import useController from "./controller";
import LetterCard from "../../components/LetterCard";
function Game() {
  const controller = useController();

  return (
    <div className="container">
      <h1>Termo Clone</h1>
      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${controller.word.length}, 1fr)`,
        }}
      >
        {controller.guesses.map((guess, attemptIndex) => (
          <div key={attemptIndex} className="guess-row">
            {guess.map((letter, index) => (
              <LetterCard
                key={index}
                letter={
                  attemptIndex === controller.currentGuessIndex
                    ? letter || "_"
                    : letter
                }
                color={
                  attemptIndex < controller.currentGuessIndex &&
                  controller.getColor(letter, index)
                }
              />
            ))}
          </div>
        ))}
      </div>
      <p>{controller.message}</p>
    </div>
  );
}

export default Game;
