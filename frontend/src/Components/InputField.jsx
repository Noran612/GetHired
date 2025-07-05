import React from "react";
import "../style.css";

export default function InputField({ label, name, value, onChange }) {
  return (
    <div className="input-group">
      <label className="input-label">{name}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="textarea-field"
        placeholder={label}
      />
    </div>
  );
}
