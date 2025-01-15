import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import logo from '../../assets/images/Logo.png';
import rectangle15 from '../../assets/images/Rectangle 15.png';
import { FaArrowRight} from "react-icons/fa6";
import { FaPodcast } from 'react-icons/fa6';
import { Modal, Button } from 'react-bootstrap';

const SignUp = () => {
  const [showModal, setShowModal] = useState(false); // Contrôle du modal

  const [clinicName, setClinicName] = useState(''); // Valeur affichée dans l'input
  const [clinicAddress, setClinicAddress] = useState(''); // Valeur affichée dans l'input
  const [selectedCountry, setSelectedCountry] = useState(''); // Pays sélectionné
  const [selectedCity, setSelectedCity] = useState(''); // Ville sélectionnée
  const [selectedDepartment, setSelectedDepartment] = useState(''); // Département sélectionné
  const [telephone1, setTelephone1] = useState(''); // Téléphone 1
  const [telephone2, setTelephone2] = useState(''); // Téléphone 2
  const navigate = useNavigate(); // Navigation

  // Ouvrir et fermer le modal
  const handleInputClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Sauvegarde des sélections et mise à jour de l'adresse
  const handleSaveAddress = () => {
    const address = `${selectedCountry}, ${selectedCity}, ${selectedDepartment}`;
    setClinicAddress(address); // Mise à jour de l'input
    handleCloseModal(); // Ferme le modal
  };

  const handleLoginClick = () => {
    navigate('/clientlogin');
  };
  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Préparer les données à envoyer
    const formData = {
      clinicName,
      clinicAddress,
      selectedCountry,
      selectedCity,
      selectedDepartment,
      telephone1,
      telephone2
    };
    // console.log(formData);
    
    
    

    // Rediriger avec les données du formulaire
    navigate('/ClientAdmin', { state: formData }); // Exemple de redirection avec les données du formulaire
  };

  return (
    <div className="bodya">
      <div className="container-fluid signup mt-3">
        <div className="row">
          {/* Colonne droite */}
          <div className="col-lg-4 right">
            <div className="px-5">
              <img src={logo} alt="Logo" className="when mb-2" />
              <h3 className="genie mb-2">Create an account</h3>
              <p>
                Already have an account?{' '}
                <a href="#" onClick={handleLoginClick} className="cirus">
                  Login
                </a>
              </p>
              <form onSubmit={handleSubmit}>
                {/* Nom de la clinique */}
                <div className="form-floating mb-3 mt-2 col-12">
                  <input
                    type="text"
                    className="form-control geste"
                    id="floatingInput"
                    placeholder="Clinic's name"
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)} // Mettre à jour l'état
                  />
                  <label htmlFor="floatingInput">Clinic's name</label>
                </div>

                {/* Adresse de la clinique */}
                <div className="mb-3 col-12 mt-2 cecile">
                  <input
                    type="text"
                    className="form-control club"
                    placeholder="Clinic's address"
                    value={clinicAddress} // Affiche l'adresse mise à jour
                    onClick={handleInputClick} // Ouvre le modal
                    readOnly // Empêche la saisie manuelle
                  />
                  <span className="unit">
                    <FaPodcast />
                  </span>
                </div>

                {/* Modal Bootstrap */}
                <Modal show={showModal} onHide={handleCloseModal} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Address <FaPodcast className="dill" />
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {/* Pays */}
                    <select
                      className="form-select mb-3"
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                      <option value="" disabled>
                        Pays
                      </option>
                      <option value="Benin">Benin</option>
                      <option value="France">France</option>
                      <option value="USA">USA</option>
                    </select>

                    {/* Ville */}
                    <select
                      className="form-select mb-3"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      disabled={!selectedCountry} // Active seulement si un pays est sélectionné
                    >
                      <option value="" disabled>
                       Ville
                      </option>
                      {selectedCountry === 'Benin' && (
                        <>
                          <option value="Cotonou">Cotonou</option>
                          <option value="Porto-Novo">Porto-Novo</option>
                        </>
                      )}
                      {selectedCountry === 'France' && (
                        <>
                          <option value="Paris">Paris</option>
                          <option value="Lyon">Lyon</option>
                        </>
                      )}
                      {selectedCountry === 'USA' && (
                        <>
                          <option value="New York">New York</option>
                          <option value="Los Angeles">Los Angeles</option>
                        </>
                      )}
                    </select>

                    {/* Département */}
                    <select
                      className="form-select mb-3"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      disabled={!selectedCity} // Active seulement si une ville est sélectionnée
                    >
                      <option value="" disabled>
                        Department
                      </option>
                      {selectedCity === 'Cotonou' && <option value="Littoral">Littoral</option>}
                      {selectedCity === 'Paris' && <option value="Ile-de-France">Ile-de-France</option>}
                      {selectedCity === 'New York' && <option value="Manhattan">Manhattan</option>}
                    </select>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      onClick={handleSaveAddress}
                      disabled={!selectedCountry || !selectedCity || !selectedDepartment}
                    >
                      Save changes
                    </Button>
                  </Modal.Footer>
                </Modal>

                {/* Téléphone */}
                <div className="row g-2 mb-3 mt-2">
                  <div className="form-floating mb-3 col-md">
                    <input
                      type="text"
                      className="form-control geste"
                      id="floatingInput"
                      placeholder="Telephone"
                      value={telephone1}
                      onChange={(e) => setTelephone1(e.target.value)} // Mettre à jour l'état
                    />
                    <label htmlFor="floatingInput">Telephone 1</label>
                  </div>
                  <div className="form-floating mb-3 col-md">
                    <input
                      type="text"
                      className="form-control geste"
                      id="floatingInput "
                      placeholder="Telephone"
                      value={telephone2}
                      onChange={(e) => setTelephone2(e.target.value)} // Mettre à jour l'état
                    />
                    <label htmlFor="floatingInput">Telephone 2</label>
                  </div>
                </div>

                {/* Bouton de soumission */}
                <button type="submit" className="btn w-100 mt-3 vyne">
                  Continue <FaArrowRight />
                </button>
              </form>
              <p className=' mt-3'>© 2024 | Développé par ITTIQ </p>
            </div>
          </div>
          
          {/* Colonne gauche */}
          <div className="col-lg-8 lefte d-none d-md-block">
            <div className="into mt-4">
              <h3 className="ninas mx-5">
                Manage your hospital with <span className="toy">ease</span> now..
              </h3>
              <img src={rectangle15} alt="Group 208" className="Morije" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;