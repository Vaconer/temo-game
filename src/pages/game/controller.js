import { useEffect, useState } from "react";
import json from "../../util/words.json"; // Importa a lista de palavras

export default function useController() {
  const [word, setWord] = useState(""); // Palavra correta
  const [rows, setRows] = useState([]); // Tentativas do jogador
  const [colors, setColors] = useState([]); // cores das letras de cada tentativa
  const [currentRowIndex, setCurrentRowIndex] = useState(0); // Índice da tentativa atual
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0); // Índice da tentativa atual
  const [message, setMessage] = useState(""); // Mensagem de feedback
  const [isGameOver, setIsGameOver] = useState(false); // Estado do fim do jogo
  const [isWin, setIsWin] = useState(false); // Estado de vitória
  const [isShaking, setIsShaking] = useState(false);

  // Função para escolher uma palavra aleatória da lista
  const getWord = () => {
    const randomIndex = Math.floor(Math.random() * json.words.length);
    const newWord = json.words[randomIndex];
    console.log("PALAVRA->", newWord);
    return newWord;
  };

  // Função para inicializar o jogo
  const startGame = () => {
    const randomWord = getWord();
    setWord(randomWord);

    setColors(
      Array(6)
        .fill(null)
        .map(() => Array(randomWord.length).fill(""))
    );

    setRows(
      Array(6)
        .fill(null)
        .map(() => Array(randomWord.length).fill(""))
    );

    setIsGameOver(false);
    setIsWin(false);
    setCurrentRowIndex(0);
    setCurrentLetterIndex(0);
    setMessage("");
  };

  useEffect(() => {
    startGame(); // Inicia o jogo assim que o componente monta
  }, []);

  // Função que lida com a entrada do teclado
  const handleKeyPress = (e) => {
    if (isGameOver) {
      return; // Se o jogo acabou, ignora as entradas
    }
    const { key } = e;

    if (/^[a-zA-Z\u00C0-\u00FF]$/.test(key)) {
      // Adiciona a letra se for válida e houver espaço na tentativa atual
      const newRow = [...rows];
      newRow[currentRowIndex][currentLetterIndex] = key.toLowerCase();

      setRows(newRow);
      currentLetterIndex < 4 && setCurrentLetterIndex((prev) => prev + 1);
    }
    else if (key === "Backspace") {
      // Remove a última letra ao pressionar Backspace
      const newRow = [...rows];

      newRow[currentRowIndex][currentLetterIndex] = ""; // Remove a última letra
      setRows(newRow);

      currentLetterIndex > 0 && setCurrentLetterIndex((prev) => prev - 1);
    } else if (key === "ArrowLeft" && currentLetterIndex > 0) {
      setCurrentLetterIndex((prev) => prev - 1);
      //console.log("entrouuu");
    } else if (key === "ArrowRight" && currentLetterIndex < 4) {
      setCurrentLetterIndex((prev) => prev + 1);
    } else if (key === "Enter") {
      // Verifica a palavra ao pressionar Enter
      handleRow();

    }
  };
  useEffect(() => {
    console.log("colors", colors);
  }, [colors]);
  useEffect(() => {
    console.log("rows", rows);
  }, [rows]);
  const verifyIsWord = () => {
    const word = rows[currentRowIndex].join("");
    console.log("word", word);
    return json.words.includes(word);
  };
  // Função para verificar se a palavra está correta

  const handleRow = () => {
    const rowString = rows[currentRowIndex].join("");

    // Verifica se a palavra é válida no arquivo words.json
    if (!verifyIsWord()) {
      setIsShaking(true)
      return; // Se a palavra não existe, interrompe o fluxo
    }

    if (rowString.length !== word.length) {
      setMessage(`A palavra tem ${word.length} letras.`);
      return;
    }

    // Verifica se a palavra está correta
    if (rowString === word) {
      setIsGameOver(true);
      setIsWin(true);
      return;
    }

    if (currentRowIndex === 5) {
      setIsGameOver(true);
      setIsWin(false);
      return;
    }

    // Se tudo está OK, vai para a próxima linha e reseta o índice da letra
    setCurrentLetterIndex(0);
    setCurrentRowIndex(currentRowIndex + 1);
    setMessage("");
    compareWords(); // Continua com a verificação de cores
  };


  // Função que retorna a cor para cada letra na tentativa

  const compareWords = () => {
    const guessWord = rows[currentRowIndex].join("");
    const result = Array(word.length).fill(""); // Inicializa o array de resultados
    const usedIndexes = Array(word.length).fill(false); // Para marcar letras usadas

    // Passo 1: Marca as letras verdes (corretas na posição correta)
    for (let i = 0; i < guessWord.length; i++) {
      if (guessWord[i] === word[i]) {
        result[i] = "green";
        usedIndexes[i] = true; // Marca essa letra como usada
      }
    }

    // Passo 2: Marca as letras amarelas (presentes na palavra mas na posição errada)
    for (let i = 0; i < guessWord.length; i++) {
      if (result[i] === "") {
        // Se ainda não foi marcada como verde
        const letter = guessWord[i];
        const yellowIndex = word
          .split("")
          .findIndex(
            (char, index) =>
              char === letter &&
              !usedIndexes[index] &&
              result[index] !== "green"
          );

        if (yellowIndex !== -1) {
          result[i] = "yellow";
          usedIndexes[yellowIndex] = true; // Marca essa letra como usada
        }
      }
    }

    //Se a letra n for nem verde nem amarela ela deve ser vermelha (Percorre toda a palavra)
    const tiles = document.querySelectorAll('.tile-row .tile'); // Seleciona todas as tiles de uma linha

    result.forEach((color, index) => {
      if (color === "") {
        result[index] = "red";

        const element = tiles[index];

        if (element) {
          element.classList.add('default-border');
          element.classList.add('shake');

          setTimeout(() => {
            element.classList.remove('shake');
            element.classList.add('default-border');
          }, 100);
        }
      }
    });

    const updatedColors = [...colors];
    updatedColors[currentRowIndex] = result;
    setColors(updatedColors);
    return result;
  };

  const onClickLetter = (index) => {
    setCurrentLetterIndex(index);
  };

  // Lida com a adição e remoção do evento de teclado
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [rows, currentRowIndex, isGameOver, currentLetterIndex]);
  useEffect(() => {
    console.log("isShaking", isShaking);
    isShaking && setTimeout(() => {
      setIsShaking(false);
    }, 300); // Executa a função após 500ms (0.5s) para deixar o shake mais suave
  }, [isShaking]);

  return {
    rows,
    word,
    isWin,
    colors,
    message,
    currentRowIndex,
    currentLetterIndex,
    isGameOver,isShaking,
    startGame,
    onClickLetter,
    handleKeyPress,
  };
}
