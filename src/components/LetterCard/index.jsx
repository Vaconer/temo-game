import React from "react";
export default function LetterCard({ letter, color }) {
  return <span className={`letter ${color}`}>{letter}</span>;
}
