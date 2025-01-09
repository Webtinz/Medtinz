import React from 'react';
import './FloatingSelect.css'; // Inclure les styles dans le même fichier ou fichier global

const FloatingSelect = ({ label, value, onChange, options, required }) => {
  return (
    <div className="floating-select-container">
      <label className="pure-material-select-outlined col-lg-12">
        <select
          value={value}
          onChange={onChange}
          required={required}
        >
          <option value="">{label}</option> {/* Option vide comme placeholder */}
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
        <span>{label}</span> {/* Le label flottant */}
      </label>
    </div>
  );
};

export default FloatingSelect;