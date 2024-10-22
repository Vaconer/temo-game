import { useEffect, useState } from "react";
export default function useController({ isWin }) {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (isWin) {
      setMessage("Você Venceu!");
    } else {
      setMessage("Você Perdeu!");
    }
    setTimeout(() => {
      setShowModal(true);
    }, 800);
  });
  return { message, showModal };
}
