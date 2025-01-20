import { useState } from "react";

// Composant Block2 (peut être ton propre composant ou celui que tu souhaites utiliser)
const Block = () => {
  return (
              <div className="d-flex flex-column">
                <div> <strong>Diabetes</strong></div>
                <div className="d-flex">
                  <div>
                    <input type="radio" name="consent" className="form-check-input" id="consent1" />
                    <label for="consent1" className="form-check-label" >Yes</label>
                  </div>
                  <div className="ms-4">
                    <input type="radio" name="consent" className="form-check-input" id="consent2" />
                    <label for="consent1" className="form-check-label" >No</label>
                  </div>
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
          <span style={{ textDecoration: 'underline' }}>Add illness</span>
        </button>
      </div>

     
    </div>
  );
};

export default EditableBlockList;
