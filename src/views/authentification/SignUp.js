import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/SignUp.css';
import logo from '../../assets/images/Logo.png';
import rectangle15 from '../../assets/images/Rectangle 15.png';
import { FaArrowRight} from "react-icons/fa6";
import { FaPodcast } from 'react-icons/fa6';
import { Modal, Button } from 'react-bootstrap';

const SignUp = () => {
  const [showModal, setShowModal] = useState(false); // Contrôle du modal
  const [clinicAddress, setClinicAddress] = useState(''); // Valeur affichée dans l'input
  const [selectedCountry, setSelectedCountry] = useState(''); // Pays sélectionné
  const [selectedCity, setSelectedCity] = useState(''); // Ville sélectionnée
  const [selectedDepartment, setSelectedDepartment] = useState(''); // Département sélectionné

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

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/ClientAdmin'); // Exemple de redirection
  };

  return (
    <div className="bodya">
      <div className="container-fluid signup mt-3">
        <div className="row d-flex align-items-center">
          {/* Colonne droite */}
          <div className="col-lg-4 right">
            <div className="px-5">
              <img src={logo} alt="Logo" className="when mb-2" />
              <h3 className="genie mb-2">Create an account</h3>
              <p>
                Already have an account?{' '}
                <a href="#" className="cirus">
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

                  <div className="row g-2 mb-3 mt-2">
                  <div className="form-floating mb-3 col-md">
                  <input
                    type="text"
                    className="form-control geste"
                    id="floatingInput"
                    placeholder="Telephone"
                  />
                  <label htmlFor="floatingInput">Telephone 1</label>
                </div>
                <div className="form-floating mb-3 col-md">
                  <input
                    type="text"
                    className="form-control geste"
                    id="floatingInput "
                    placeholder="Telephone"
                  />
                  <label htmlFor="floatingInput">Telephone 2</label>
                </div>
                  </div>

                {/* Bouton de soumission */}
                <button type="submit" className="btn  w-100 mt-3 vyne">
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


































// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import FloatingInput from './FloatingInput';
// import './SignUp.css'; // Assurez-vous que ce fichier contient les styles appropriés
// import logo from './image/Logo.png';
// import group208 from './image/Group 208.png';
// import rectangle15 from './image/Rectangle 15.png';
// import { FaArrowRight} from "react-icons/fa6";
// import { FaMapMarkerAlt } from 'react-icons/fa';
// import { Modal, Button } from 'react-bootstrap'; // Importez le Modal et Button de Bootstrap
// import FloatingSelect from './FloatingSelect';
// // import tabletImage from './assets/tablet-image.png'; // Image du tableau de bord ou l'image à droite

// const SignUp = () => {
//   const [clinicName, setClinicName] = useState('');
//   const [clinicAddress, setClinicAddress] = useState('');
//   const [tel1, setTel1] = useState('');
//   const [tel2, setTel2] = useState('');
//   const [pays, setPays] = useState('');
//   const [ville, setVille] = useState('');
//   const [departement, setDepartement] = useState('');
//   const [errors, setErrors] = useState({});
//   const [showModal, setShowModal] = useState(false);

//   const villes = ['Paris', 'Lyon', 'Marseille', 'Toulouse'];
//   const departements = ['Dept1', 'Dept2', 'Dept3'];
 
//   const navigate = useNavigate(); // Utilisation de useNavigate
//   // Fonction pour ouvrir le modal
//   const handleOpenModal = () => {
//     setShowModal(true);
//   };

//   // Fonction pour fermer le modal automatiquement après mise à jour
//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   // Mise à jour de l'adresse clinique lorsque le modal est rempli
//   const handleChangeAddress = () => {
//     // Mise à jour de l'adresse avec les données du modal
//     const address = `${pays}, ${ville}, ${departement}`;
//     setClinicAddress(address); // Met à jour clinicAddress
//     handleCloseModal(); // Ferme le modal après la mise à jour de l'adresse
//   };

//   // Validation du formulaire
//   const validateForm = () => {
//     const newErrors = {};
//     if (!clinicName) newErrors.clinicName = "Veuillez Saisir le nom de la clinique";
//     if (!clinicAddress) newErrors.clinicAddress = "Veuillez saisir l'adresse de la clinique";
//     if (!tel1) newErrors.tel1 = "Tel 1 is important";
//     if (!tel2) newErrors.tel2 = "Tel 2 is important";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // Si aucune erreur, formulaire valide
//   };

//   // Fonction pour la soumission du formulaire et redirection vers /admin
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       // Redirection vers la page Admin après la soumission
//       navigate('/admin');
//     }
//   };

//   return (
//     <div className="sign-up-container">
//         <div className='row'>
//         <div className="left-section px-5 col-lg-6">
//                 <div className="header">
//                     <img src={logo} alt="Logo" className="logo mb-1 " />
//                 </div>
//                 <div className='mb-2'>
//                     <h2 >Create an account</h2>
//                     <p>Already have an account? <span className='hugue'><a href="#" className='hugue'>Log In</a></span></p>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     {/* Clinic's Name and Clinic's Address */}
//                     <div className="row g-2 mb-4">
//                       <div className="col-md-12 mb-2">
//                         <FloatingInput
//                           label="Clinic's Name"
//                           value={clinicName}
//                           onChange={(e) => setClinicName(e.target.value)}
//                         />
//                         {errors.clinicName && <span className="error">{errors.clinicName}</span>}
//                       </div>
//                       <div className="col-md-12 mb-2">
//                           <div className="input-container">
//                             {/* Input avec icône et placeholder */}
//                             <input 
//                             className='col-lg-12 inputs'
//                               type="text"
//                               value={clinicAddress}
//                               onChange={(e) => setClinicAddress(e.target.value)}
//                               onClick={handleOpenModal} // Ouvre le modal quand l'input est cliqué
//                               readOnly
//                               placeholder="Clinic's Address"
//                               required
//                             />
//                             <FaMapMarkerAlt className="input-icon" />
//                           </div>
//                           {errors.clinicAddress && <span className="error">{errors.clinicAddress}</span>}

//                           {/* Modal */}
//                           {/* Modal sans bouton de fermeture ni sauvegarde */}
//                           <Modal show={showModal} onHide={handleCloseModal} centered>
//                             <Modal.Header>
//                               <Modal.Title>
//                                 Address <FaMapMarkerAlt className="tu-icon" />
//                               </Modal.Title>
//                             </Modal.Header>
//                             <Modal.Body>
//                                   <div className="mb-3 col-lg-12">
//                                     <FloatingInput
//                                       label="Country"
//                                       value={pays}
//                                       onChange={(e) => setPays(e.target.value)}
//                                       onBlur={handleChangeAddress} // Met à jour l'adresse quand on quitte le champ
//                                     />
//                                   </div>
//                                   <div className="mb-3 col-md-12">
//                                     <FloatingSelect
//                                       label="City"
//                                       value={ville}
//                                       onChange={(e) => setVille(e.target.value)}
//                                       onBlur={handleChangeAddress}
//                                       options={villes}
//                                       required
//                                     />
//                                   </div>
//                                   <div className="mb-3 col-md-12">
//                                     <FloatingSelect
//                                       label="Department"
//                                       value={departement}
//                                       onChange={(e) => setDepartement(e.target.value)}
//                                       onBlur={handleChangeAddress}
//                                       options={departements}
//                                       required
//                                     />
//                                   </div>
//                             </Modal.Body>
//                             <Modal.Footer>
//                               <Button variant="primary" onClick={handleChangeAddress}>
//                                 Save Address
//                               </Button>
//                             </Modal.Footer>
//                           </Modal>
//                       </div>
//                     </div>

//                     {/* Tel 1 and Tel 2 */}
//                     <div className="row g-2 ">
//                       <div className="col-md-6">
//                         <FloatingInput
//                           label="Tel 1"
//                           value={tel1}
//                           onChange={(e) => setTel1(e.target.value)}
//                         />
//                         {errors.tel1 && <span className="error">{errors.tel1}</span>}
//                       </div>
//                       <div className="col-md-6">
//                         <FloatingInput
//                           label="Tel 2"
//                           value={tel2}
//                           onChange={(e) => setTel2(e.target.value)}
//                         />
//                         {errors.tel2 && <span className="error">{errors.tel2}</span>}
//                       </div>
//                     </div>

//                     {/* Submit Button */}
//                     <button type="submit" className="continue-btn mt-3 mb-2">Continue  <FaArrowRight /></button>
//                     <p className='mt-5 '>© 2024 | Développé par ITTIQ </p>
                    
//               </form>
            
//         </div>
//         <div className="right-section  col-lg-6">
//             {/* <p>Manage your hospital with ease now..</p> */}
//             <img src={group208} alt="Group 208" className="tablet-image" />
//             <div className='polygone '>
//             <p className=''>Manage your hospital with <span className='hugue'>ease</span> now..</p>
//             </div>
            
//             <div className='intrigue mt-5'>
//                 <img src={rectangle15} alt="Group 208" className="Morija img-fluid" />
//             </div>
//         </div>
//         </div>
        
       
//     </div>
//   );
// };

// export default SignUp;
