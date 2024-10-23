import React, { useState, useEffect } from "react";
import "./style.css";

export default function LetterCard({
  letter,
  color,
  inFocus,
  disabled,
  onClick,error
}) {


  return (
    <span
      onClick={onClick}
      className={`letter ${color} ${inFocus ? "in-focus" : ""} ${disabled ? "disabled" : ""} ${error ? "shake" : ""}`} // Aplica o shake se estiver ativo
    >
      {letter}
    </span>
  );
}
