import React from "react";
import "../style.css";

export default function TextAreaField({ label, name, value, onChange }) {
  return (
    <div className="input-group">
      <label className="input-label">{name}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="textarea-field"
        rows="5"
        placeholder={label}
      />
    </div>
  );
}
