import { useState } from "react";
import Block from './block4'

// Composant Block2 (peut être ton propre composant ou celui que tu souhaites utiliser)

const EditableBlockList = () => {
  const [blocks, setBlocks] = useState([]); // Liste des blocs à afficher

  // Fonction pour ajouter un nouveau bloc
  const handleAddBlock = () => {
    setBlocks((prevBlocks) => [...prevBlocks, {}]); // Ajouter un nouveau bloc vide
  };

  return (
    <div>

        {/* Afficher les blocs ajoutés */}
        {blocks.map((_, index) => (
            <div key={index}>
            <Block /> {/* Render chaque Block2 */}
            </div>
        ))}

      <div className="d-flex justify-content-end">
        <button 
          className="btn btn-prim" 
          style={{ color: '#0056B3' }} 
          onClick={handleAddBlock} // Lors du clic, ajouter un nouveau bloc
        >
          <i className="bi bi-plus-circle-fill me-2"></i>
          <span style={{ textDecoration: 'underline' }}>Add question</span>
        </button>
      </div>

     
    </div>
  );
};

export default EditableBlockList;
