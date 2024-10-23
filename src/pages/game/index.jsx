import "./Game.css";
import useController from "./controller";
import LetterCard from "../../components/LetterCard";
import ModalFinalMessage from "../../components/ModalFinalMessage";

function Game() {
  const controller = useController(); // Hook que retorna os dados e funções do jogo

  return (
    <div className="container">
      <h1>Meu Termo</h1>

      {/* Tabuleiro do jogo */}
      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${controller.word.length}, 1fr)`, // Define o número de colunas baseado na palavra
        }}
      >
        {/* Para cada tentativa, renderiza a linha de letras */}
        {controller.rows.map((row, attemptIndex) => (
          <div key={attemptIndex} className="row">
            {row.map((letter, index, a) => {
              const displayedLetter =
                attemptIndex === controller.currentRowIndex && letter === ""
                  ? "__"
                  : letter;

              return (
                <LetterCard
                  key={index}
                  letter={letter} // Letra ou "_"
                  color={controller.colors[attemptIndex][index]} // Cor, se aplicável
                  inFocus={
                    index === controller.currentLetterIndex &&
                    attemptIndex === controller.currentRowIndex
                  } // Se é o foco
                  disabled={attemptIndex > controller.currentRowIndex}
                  onClick={() => controller.onClickLetter(index)}
                  error={attemptIndex == controller.currentRowIndex &&controller.isShaking}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Mensagem de feedback */}
      <p>{controller.message}</p>

      {controller.isGameOver && (
        <ModalFinalMessage
          isWin={controller.isWin} // Se o jogo terminou em vitória ou derrota={message} // Mensagem de vitória ou derrot
          word={controller.word} // Palavra correta
          onRestart={controller.startGame} // Reinicia o jogo
        />
      )}
    </div>
  );
}

export default Game;
