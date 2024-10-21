import { useEffect, useState } from "react";
import json from "../../util/words.json";
export default function useController() {
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState([]); // Inicializa como vazio
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0); // Índice da tentativa atual
  const [message, setMessage] = useState("");

  const getWord = () => {
    // Gera um índice aleatório entre 0 e o tamanho do array de palavras
    const randomIndex = Math.floor(Math.random() * json.words.length);

    // Retorna a palavra na posição aleatória
    return json.words[randomIndex];
  };
  const fetchWord = () => {
    const randomWord = getWord();
    setWord(randomWord);
    // Inicializa guesses baseado no comprimento da palavra
    setGuesses(
      Array(6)
        .fill(null)
        .map(() => Array(randomWord.length).fill(""))
    );
  };
  useEffect(() => {
    fetchWord();
  }, []);

  const handleKeyPress = (e) => {
    const currentGuess = guesses[currentGuessIndex];

    // Adiciona letra se for uma letra do alfabeto e o índice não exceder o tamanho da palavra
    if (/^[a-zA-Z]$/.test(e.key)) {
      const newGuesses = [...guesses];
      const index = currentGuess.indexOf("");
      if (index !== -1) {
        newGuesses[currentGuessIndex][index] = e.key.toLowerCase();
        setGuesses(newGuesses);
      }
    }

    // Verifica a palavra se a tecla Enter for pressionada
    if (e.key === "Enter") {
      handleGuess();
    }

    // Remove a letra se a tecla Backspace for pressionada
    if (e.key === "Backspace") {
      const newGuesses = [...guesses];
      // Encontra o último índice preenchido corretamente
      const lastFilledIndex = currentGuess.findLastIndex(
        (letter) => letter !== ""
      );
      if (lastFilledIndex !== -1) {
        newGuesses[currentGuessIndex][lastFilledIndex] = ""; // Remove a letra na posição correta
      }
      setGuesses(newGuesses);
    }
  };

  const handleGuess = () => {
    const guessString = guesses[currentGuessIndex].join("");
    if (guessString.length !== word.length) {
      setMessage(`A palavra tem ${word.length} letras.`);
      return;
    }

    // Mover para a próxima tentativa
    setCurrentGuessIndex((prev) => prev + 1);
    setMessage("");
  };

  // Função para verificar o esquema de cores
  const getColor = (letter, index) => {
    if (letter === word[index]) {
      return "green"; // Letra correta na posição correta
    } else if (word.includes(letter)) {
      return "yellow"; // Letra correta na posição errada
    } else {
      return ""; // Letra não está na palavra
    }
  };

  useEffect(() => {
    // Adiciona o evento de teclado quando o componente é montado
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      // Remove o evento de teclado quando o componente é desmontado
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [guesses, currentGuessIndex]);

  return {
    word,
    guesses,
    currentGuessIndex,
    message,
    handleKeyPress,
    handleGuess,
    getColor,
  };
}
