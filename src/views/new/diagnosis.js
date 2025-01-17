import { useState } from "react";
import Add from './addexamination';
import Block from '../new/block3';
import Block1 from '../new/block1';
import Block2 from '../new/block2';
import Block3 from '../new/block3';

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
          className="py-3 fw-bold text-center" 
          style={{background:'#0056B32B',borderRadius:'15px'}}
          onClick={toggleDropdown} // Ajout du clic pour basculer l'état
        >
          Diagnosis
        </p>
        <i 
          className="bi bi-caret-down-fill pos1" 
          style={{color:'#0056B3'}}
        ></i>
      </div>

      {isOpen && ( // Affiche le contenu seulement si isOpen est vrai
      
        <div className="row m-4">
          <p className="ms-4">Notez les resultats de l’examen clinique effectué sur le patient </p>
          <div className="col-12 mx-auto">
            <div><Block /></div>
          </div>
          <div className="col-12 mx-auto">
            <div><Block1 /></div>
          </div>
          <div className="col-12 mx-auto">
            <div><Block2 /></div>
          </div>
          <div className="col-12 mx-auto">
            <div><Block3 /></div>
          </div>
          <div className="col-12 mx-auto mb-3">
            <div><Add /></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableBlockList;
