import React, { useState } from 'react';
import './FloatingInput.css'; // Assurez-vous que ce fichier contient les styles appropriés

const FloatingInput = ({ label, type, value, onChange, required }) => {
  return (
    <div className="floating-input-container">
      <label className="pure-material-textfield-outlined col-lg-12">
        <input
          type={type ?? "text"}
          value={value}
          onChange={onChange}
          required={required}
          placeholder=" " // Important pour déclencher l'effet de label flottant
        />
        <span>{label}</span>
      </label>
    </div>
  );
};


export default FloatingInput;
