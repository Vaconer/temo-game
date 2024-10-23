import { useEffect, useState } from "react";

export default function useController({ isWin }) {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalBgColor, setModalBgColor] = useState("#bf7154"); // Cor inicial padrão

  useEffect(() => {
    if (isWin) {
      setMessage("Você Venceu!");
      setModalBgColor("#4CAF50"); // Verde se ganhar
    } else {
      setMessage("Você Perdeu!");
      setModalBgColor("#f44336"); // Vermelho se perder
    }
    setTimeout(() => {
      setShowModal(true);
    }, 800);
  }, [isWin]); // Adicionando dependência isWin

  return { message, showModal, modalBgColor };
}
