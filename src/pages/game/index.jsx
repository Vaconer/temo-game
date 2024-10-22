import "../../styles/Game.css";
import useController from "./controller"; 
import LetterCard from "../../components/LetterCard";  
import Modal from "../../components/ModalFinalMessage"; 

function Game() {
  const controller = useController();  // Hook que retorna os dados e funções do jogo

  return (
    <div className="container">
      <h1>Termo Clone</h1>

      {/* Tabuleiro do jogo */}
      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${controller.word.length}, 1fr)`,  // Define o número de colunas baseado na palavra
        }}
      >
        {/* Para cada tentativa, renderiza a linha de letras */}
        {controller.guesses.map((guess, attemptIndex) => (
          <div key={attemptIndex} className="guess-row">
            {guess.map((letter, index) => {
              let displayedLetter = letter;

              // Verifica se é a tentativa atual e substitui letras vazias por "_"
              if (attemptIndex === controller.currentGuessIndex) {
                if (letter === "") {
                  displayedLetter = "_";
                }
              }

              let color = "";
              // Aplica a cor se a tentativa for anterior à atual
              if (attemptIndex < controller.currentGuessIndex) {
                color = controller.getColor(letter, index);
              }

              return (
                <LetterCard
                  key={index}
                  letter={displayedLetter}  // Letra ou "_"
                  color={color}  // Cor, se aplicável
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Mensagem de feedback */}
      <p>{controller.message}</p>

      {/* Modal de fim de jogo */}
      {(() => {
        if (controller.isGameOver) {
          let message;
          if (controller.isWin) {
            message = "Você Venceu!";
          } else {
            message = "Você Perdeu!";
          }

          return (
            <Modal
              message={message}  // Mensagem de vitória ou derrota
              word={controller.word}  // Palavra correta
              onRestart={controller.restartGame}  // Reinicia o jogo
            />
          );
        } else {
          return null;  // Retorna null se o jogo não acabou
        }
      })()}
    </div>
  );
}

export default Game;
