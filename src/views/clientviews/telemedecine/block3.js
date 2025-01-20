import React, { useState } from "react";
import "./docteur.css";
import l4 from './image/edit-2.svg';

const Block = () => {
  const [isEditing, setIsEditing] = useState(false); // État pour gérer le mode édition
  const [labelText, setLabelText] = useState("Did you take any self medication ?");
  const [inputValue, setInputValue] = useState(""); // Nouvel état pour l'input

  // Activer le mode édition
  const handleEditClick = (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du lien
    setIsEditing(true);
  };

  // Gérer la modification du texte du label
  const handleLabelChange = (e) => {
    setLabelText(e.target.value);
  };

  // Gérer la modification de l'input
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Désactiver le mode édition lorsque l'utilisateur clique en dehors
  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="mb-4 p-2 position-relative" style={{border:'1px solid #0056B3', borderRadius:'10px'}}>
      {/* Le label est maintenant un champ modifiable */}
      <div className="d-flex pos">
        {isEditing ? (
          // Champ de saisie pour la modification du label
          <input
            type="text"
            value={labelText}
            onChange={handleLabelChange}
            onBlur={handleBlur} // Sortir du mode édition lorsqu'on perd le focus
            autoFocus // Focaliser automatiquement sur l'input
          />
        ) : (
          // Affichage du label modifiable
          <label
            style={{
              fontWeight:'100',
              
            }}
          >
            {labelText}
          </label>
        )}
        
        <a
          href="#"
          onClick={handleEditClick} // Activer le mode édition en cliquant sur le lien
          style={{
            marginLeft: "10px", // Ajouter un espace entre l'icône et le texte
          }}
        >
          <img
            src={l4}
            alt="timer"
            className="img-fluid edit"
            style={{ width: "1.3rem", marginBottom: "2.5rem" }}
          />
        </a>
      </div>

      {/* Le champ input indépendant */}
      <div className="mt-3 d-flex justify-content-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange} // Mettre à jour la valeur de l'input indépendamment du label
          placeholder="NO"
          style={{
            width: "92%",
            padding: "10px",
            border: "none",
            fontSize: "1rem"
          }}
        />
      </div>
    </div>
  );
};

export default Block;
