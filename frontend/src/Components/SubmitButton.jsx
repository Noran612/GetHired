import React from "react";
import "../style.css";

export default function SubmitButton({ text }) {
  return (
    <button type="submit" className="button-submit">
      {text}
    </button>
  );
}
