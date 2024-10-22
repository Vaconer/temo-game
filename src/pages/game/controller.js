import { useEffect, useState } from "react";
import json from "../../util/words.json";  // Importa a lista de palavras

export default function useController() {
  const [word, setWord] = useState("");  // Palavra correta
  const [guesses, setGuesses] = useState([]);  // Tentativas do jogador
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);  // Índice da tentativa atual
  const [message, setMessage] = useState("");  // Mensagem de feedback
  const [isGameOver, setIsGameOver] = useState(false);  // Estado do fim do jogo
  const [isWin, setIsWin] = useState(false);  // Estado de vitória

  // Função para escolher uma palavra aleatória da lista
  const getWord = () => {
    const randomIndex = Math.floor(Math.random() * json.words.length);
    return json.words[randomIndex];
  };

  // Função para inicializar o jogo
  const fetchWord = () => {
    const randomWord = getWord();
    setWord(randomWord);
    
    const initialGuesses = Array(6).fill(null).map(() => Array(randomWord.length).fill(""));
    setGuesses(initialGuesses);
    
    setIsGameOver(false);
    setIsWin(false);
    setCurrentGuessIndex(0);
    setMessage("");
  };

  useEffect(() => {
    fetchWord();  // Inicia o jogo assim que o componente monta
  }, []);

  // Função que lida com a entrada do teclado
  const handleKeyPress = (e) => {
    if (isGameOver) {
      return;  // Se o jogo acabou, ignora as entradas
    }

    const currentGuess = guesses[currentGuessIndex];

    if (/^[a-zA-Z]$/.test(e.key)) {
      // Adiciona letra se for válida e houver espaço na tentativa atual
      const newGuesses = [...guesses];
      const emptyIndex = currentGuess.indexOf("");

      if (emptyIndex !== -1) {
        newGuesses[currentGuessIndex][emptyIndex] = e.key.toLowerCase();
        setGuesses(newGuesses);
      }
    } else if (e.key === "Enter") {
      // Verifica a palavra ao pressionar Enter
      handleGuess();
    } else if (e.key === "Backspace") {
      // Remove a última letra ao pressionar Backspace
      const newGuesses = [...guesses];
      const lastFilledIndex = currentGuess.findLastIndex((letter) => letter !== "");

      if (lastFilledIndex !== -1) {
        newGuesses[currentGuessIndex][lastFilledIndex] = "";  // Remove a última letra
        setGuesses(newGuesses);
      }
    }
  };

  // Função para verificar se a palavra está correta
  const handleGuess = () => {
    const guessString = guesses[currentGuessIndex].join("");

    if (guessString.length !== word.length) {
      setMessage(`A palavra tem ${word.length} letras.`);
      return;
    }

    if (guessString === word) {
      setIsGameOver(true);
      setIsWin(true);
      return;
    }

    if (currentGuessIndex === 5) {
      setIsGameOver(true);
      setIsWin(false);
      return;
    }

    setCurrentGuessIndex(currentGuessIndex + 1);
    setMessage("");
  };

  // Função que retorna a cor para cada letra na tentativa
  const getColor = (letter, index) => {
    if (letter === word[index]) {
      return "green";  // Letra correta na posição correta
    } else if (word.includes(letter)) {
      return "yellow";  // Letra está na palavra mas na posição errada
    } else {
      return "";  // Letra não está na palavra
    }
  };

  // Função para reiniciar o jogo
  const restartGame = () => {
    fetchWord();
  };

  // Lida com a adição e remoção do evento de teclado
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [guesses, currentGuessIndex, isGameOver]);

  return {
    word,
    guesses,
    currentGuessIndex,
    message,
    isGameOver,
    isWin,
    handleKeyPress,
    getColor,
    restartGame, 
  };
}
