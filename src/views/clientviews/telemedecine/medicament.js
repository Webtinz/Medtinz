import { useState } from "react";
import Med from './block Med1';
import Med1 from './block Med2';
import Med2 from './block Med3';
import Med3 from './block Med4';
import Add from './addmedication';

// Composant EditableBlockList
const EditableBlockList = () => {
  const [isOpen, setIsOpen] = useState(false); // Etat pour gérer l'ouverture/fermeture du dropdown

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Change l'état d'affichage
  };

  return (
    <div>
      <div className="position-relative">
        <p 
          className="py-3 fw-bold ms-5" 
          onClick={toggleDropdown} // Ajout du clic pour basculer l'état
        >
          Medications
        <i 
          className="bi bi-caret-down-fill" 
          style={{color:'#FF9800'}}
        ></i>
        </p>
      </div>

      {isOpen && ( // Affiche le contenu seulement si isOpen est vrai
        <div className="row mt-4">
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
          <div className="d-flex justify-content-end">
            <Add /> {/* Ajout d'une nouvelle médication */}
          </div>
        </div>
      )}
      
      
    </div>
  );
};

export default EditableBlockList;
