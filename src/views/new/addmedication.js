import { useState } from "react";
import Med from './block Med1';
import Med1 from './block Med2';
import Med2 from './block Med3';
import Med3 from './block Med4';

// Composant Block2 (peut être ton propre composant ou celui que tu souhaites utiliser)
const Block = () => {
  return (
      <div className="row">
        <div className="col-12 mx-auto mb-3">
            <Med/>
          </div>
          <div className="col-md-1">
          </div>
          <div className="col-md-9 mx-auto">
            <div className="row">
                <div className="col-6 col-md-4 mx-auto mb-3" style={{borderLeft:'3px solid #FF98004F',height:'5rem'}}>
                  <Med1/>
                </div>
                <div className="col-6 col-md-4 mx-auto mb-3">
                  <Med2/>
                </div>
                <div className="col-6 col-md-4 mx-auto mb-3">
                  <Med3/>
                </div>
            </div>
          </div>
          <div className="col-md-2">
          </div>
      </div>
  );
};
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
          <span style={{ textDecoration: 'underline' }}>Add medicament</span>
        </button>
      </div>

     
    </div>
  );
};

export default EditableBlockList;
