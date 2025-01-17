import { useState } from "react";
import Add from './addquestion';
import Add1 from './addillness';

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
          style={{background:'#FFF6E8',borderRadius:'15px'}}
          onClick={toggleDropdown} // Ajout du clic pour basculer l'état
        >
          Maladie & Allergies
        </p>
        <i 
          className="bi bi-caret-down-fill pos1" 
          style={{color:'#FF9800'}}
        ></i>
      </div>

      {isOpen && ( // Affiche le contenu seulement si isOpen est vrai
        <div className="row m-4">
          <div className="col-6 col-md-3 mx-auto mb-3">
            <div className="d-flex flex-column">
              <div><strong>Allergies</strong></div>
              <div className="d-flex">
                <div>
                  <input type="radio" name="consent" className="form-check-input" id="consent1" />
                  <label htmlFor="consent1" className="form-check-label">Yes</label>
                </div>
                <div className="ms-4">
                  <input type="radio" name="consent" className="form-check-input" id="consent2" />
                  <label htmlFor="consent1" className="form-check-label">No</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 mx-auto mb-3">
            <div className="d-flex flex-column">
              <div><strong>Diabetes</strong></div>
              <div className="d-flex">
                <div>
                  <input type="radio" name="consent" className="form-check-input" id="consent1" />
                  <label htmlFor="consent1" className="form-check-label">Yes</label>
                </div>
                <div className="ms-4">
                  <input type="radio" name="consent" className="form-check-input" id="consent2" />
                  <label htmlFor="consent1" className="form-check-label">No</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 mx-auto mb-3">
            <div className="d-flex flex-column">
              <div><strong>Drepanocitose</strong></div>
              <div className="d-flex">
                <div>
                  <input type="radio" name="consent" className="form-check-input" id="consent1" />
                  <label htmlFor="consent1" className="form-check-label">Yes</label>
                </div>
                <div className="ms-4">
                  <input type="radio" name="consent" className="form-check-input" id="consent2" />
                  <label htmlFor="consent1" className="form-check-label">No</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 mx-auto mb-3">
            <div className="d-flex flex-column">
              <div><strong>Allergies</strong></div>
              <div className="d-flex">
                <div>
                  <input type="radio" name="consent" className="form-check-input" id="consent1" />
                  <label htmlFor="consent1" className="form-check-label">Yes</label>
                </div>
                <div className="ms-4">
                  <input type="radio" name="consent" className="form-check-input" id="consent2" />
                  <label htmlFor="consent1" className="form-check-label">No</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 mx-auto mb-3">
            <div className="d-flex flex-column">
              <div><strong>Allergies</strong></div>
              <div className="d-flex">
                <div>
                  <input type="radio" name="consent" className="form-check-input" id="consent1" />
                  <label htmlFor="consent1" className="form-check-label">Yes</label>
                </div>
                <div className="ms-4">
                  <input type="radio" name="consent" className="form-check-input" id="consent2" />
                  <label htmlFor="consent1" className="form-check-label">No</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 mx-auto mb-3">
            <div className="d-flex flex-column">
              <div><strong>Diabetes</strong></div>
              <div className="d-flex">
                <div>
                  <input type="radio" name="consent" className="form-check-input" id="consent1" />
                  <label htmlFor="consent1" className="form-check-label">Yes</label>
                </div>
                <div className="ms-4">
                  <input type="radio" name="consent" className="form-check-input" id="consent2" />
                  <label htmlFor="consent1" className="form-check-label">No</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mx-auto mb-3">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div><Add /></div>
              </div>
              <div className="col-md-6 mx-auto">
                <div><Add1 /></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableBlockList;
