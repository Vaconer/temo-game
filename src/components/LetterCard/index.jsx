import React from "react";
import "./style.css";
export default function LetterCard({
  letter,
  color,
  inFocus,
  disabled,
  onClick,
}) {
  return (
    <span
      onClick={onClick}
      className={`letter ${color} ${inFocus ? "in-focus" : ""} ${
        disabled ? "disabled" : ""
      }`}
    >
      {letter}
    </span>
  );
}
