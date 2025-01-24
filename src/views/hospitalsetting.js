import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './hospital.css';
import '../assets/css/mainstyle.css';
import group from '../assets/images/Group 174.png';
import modal from '../assets/images/modal.png';
import { Modal, Button } from 'react-bootstrap';
import { FaArrowUp, FaArrowRight, FaRegTrashAlt, FaListAlt, FaArrowDown, FaPodcast } from "react-icons/fa";
import {
  CHeader, CContainer, CHeaderNav, CNavItem, CNavLink,
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // N'oublie pas d'importer les styles de toast
import { BsPersonPlus, BsChevronRight, BsChevronLeft, BsArrowUpLeft } from 'react-icons/bs';
import api from '../service/caller'

import Adminprofil from '../assets/images/adminprofil.png';
import Speciality from './clientviews/speciality';


const getUserIdFromToken = () => {
  const token = localStorage.getItem('access_token'); // Récupérer le token depuis le localStorage
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Décoder le payload du JWT
    return decodedToken.userId; // Retourner l'ID de l'utilisateur (assurez-vous que c'est bien ce qui est stocké dans le token)
  }
  return null; // Retourne null si aucun token n'est présent
};
const Hospital = () => {

  const [UserData, setUserData] = useState([]);

  useEffect(() => {
    const fetchLoggedUserData = async () => {
      try {
        const response = await api.get('api/usersprofile');

        setUserData(response.data);
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };
    fetchLoggedUserData();
  }, []);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [mainHospital, setMainHospital] = useState(null);  // Stocker l'hôpital principal
  const [otherHospitals, setOtherHospitals] = useState([]);  // Stocker les autres hôpitaux
  const [hospitals, setHospitals] = useState([]);
  const [filteredSpecialities, setFilteredSpecialities] = useState([]);

  const [dropdownState, setDropdownState] = useState({
    main: true,
    generalSettings: false,
    specialities: true,
    departments: true,
    services: true,
  });

  const toggleDropdown = (key) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [key]: !prevState[key], // Basculer l'état spécifique du dropdown
    }));
  };
  const [showModal, setShowModal] = useState(false);
  const [showSpecialityModal, setShowSpecialityModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [hasOtherSites, setHasOtherSites] = useState(false); // État pour "Do you have other sites?"
  const [createSubAdmin, setCreateSubAdmin] = useState(false); // État pour "Create subadmin?"
  const [departments, setDepartments] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [services, setServices] = useState([]);

  const [newDepartment, setNewDepartment] = useState({
    name: '',
    price_consult: '',
    description: '',
  });

  const [newSpeciality, setNewSpeciality] = useState({
    name: '',
    description: '',
    departementId: '',
  });

  const [newService, setNewService] = useState({
    name: '',
    departementId: '',
    specialityId: '',
    description: '',
    price_service: '',
  });

  // Fonction pour ouvrir et fermer le dropdown Main Hospital
  const toggleMainDropdown = () => toggleDropdown("main");

  // Fonction pour ouvrir et fermer le dropdown Departments
  const toggleDepartments = () => toggleDropdown("departments");

  // Fonction pour ouvrir et fermer le dropdown Specialities
  const toggleSpecialities = () => toggleDropdown("specialities");

  // Fonction pour ouvrir et fermer le dropdown Services
  const toggleServices = () => toggleDropdown("services");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const userId = getUserIdFromToken(); // Récupérer l'ID de l'utilisateur à partir du token
  const handleShowSpecialityModal = () => setShowSpecialityModal(true);
  const handleCloseSpecialityModal = () => setShowSpecialityModal(false);

  const handleShowServiceModal = () => setShowServiceModal(true);
  const handleCloseServiceModal = () => setShowServiceModal(false);

  const handleSpecialityInputChange = (e) => {
    const { name, value } = e.target;
    setNewSpeciality({ ...newSpeciality, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDepartment({ ...newDepartment, [name]: value });
  };

  const handleserviceInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const addService = () => {
    setServices([...services, { name: '', price: '' }]);
  };

  // department 

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showDepartmentDetailsModal, setShowDepartmentDetailsModal] = useState(false);

  const handleShowDepartmentDetails = (dept) => {
    setSelectedDepartment(dept); // Définit le département sélectionné
    setShowDepartmentDetailsModal(true); // Ouvre le modal
  };

  const handleCloseDepartmentDetails = () => {
    setShowDepartmentDetailsModal(false); // Ferme le modal
  };

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  const handleShowDeleteConfirm = () => setShowDeleteConfirmModal(true);
  const handleCloseDeleteConfirm = () => setShowDeleteConfirmModal(false);

  const handleDelete = () => {
    // Logique de suppression ici
    console.log('Item deleted');
    handleCloseDeleteConfirm();
  };

  // Fonction pour gérer l'ajout d'un département
  const addDepartment = async () => {
    if (newDepartment.name && newDepartment.price_consult && newDepartment.description) {
      try {
        const token = localStorage.getItem('access_token');
        const hospitalId = mainHospital ? mainHospital._id : null;  // Utiliser l'ID de l'hôpital principal

        if (!hospitalId) {
          console.error('Hospital ID is missing.');
          return;  // Si l'ID est manquant, on arrête l'exécution
        }

        const departmentData = {
          ...newDepartment,
          hospital_id: hospitalId, // Ajouter l'ID de l'hôpital à la requête
        };

        const response = await api.post('/api/adddepartment', departmentData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // Mettre à jour l'état avec le département créé
        setDepartments([...departments, response.data.data]);

        // Réinitialiser le formulaire
        setNewDepartment({ name: '', description: '', price_consult: '' });
        handleCloseModal();  // Fermer le modal après l'ajout
      } catch (error) {
        console.error('Error adding department:', error);
      }
    }
  };

  // liste des department
  useEffect(() => {
    const fetchDepartments = async () => {
      if (!mainHospital) return; // Si l'hôpital principal n'est pas défini, ne rien faire
      try {
        const hospitalId = mainHospital._id; // Utiliser l'ID de l'hôpital principal
        const response = await api.get(`/api/departments/hospital/${hospitalId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          }
        });

        // Mettre à jour les départements dans l'état
        setDepartments(response.data.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des départements:', error);
        setMessage('Erreur lors de la récupération des départements.');
      }
    };

    fetchDepartments();
  }, [mainHospital]);


  // speciality Managment

  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [showSpecialityDetailsModal, setShowSpecialityDetailsModal] = useState(false);

  const handleShowSpecialityDetails = (Speci) => {
    setSelectedSpeciality(Speci); // Définit le département sélectionné
    setShowSpecialityDetailsModal(true); // Ouvre le modal
  };

  // recuperer les specialites
  const fetchSpecialities = async () => {
    if (!mainHospital) return; // Si l'hôpital principal n'est pas défini, ne rien faire
    try {
      const hospitalId = mainHospital._id; // Utiliser l'ID de l'hôpital principal
      const response = await api.get(`/api/specialities/hospital/${hospitalId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
      });

      // Mettre à jour l'état des spécialités dans le state
      setSpecialities(response.data.data);

    } catch (error) {
      console.error('Erreur lors de la récupération des spécialités:', error);
      setMessage('Erreur lors de la récupération des spécialités.');
    }
  };

  useEffect(() => {
    fetchSpecialities();
  }, [mainHospital]);

  // Fonction pour gérer l'ajout d'une spécialité
  const addSpeciality = async () => {
    if (newSpeciality.name && newSpeciality.description && newSpeciality.departementId) {
      try {
        const token = localStorage.getItem('access_token');
        const hospitalId = mainHospital ? mainHospital._id : null;  // Utiliser l'ID de l'hôpital principal

        if (!hospitalId) {
          console.error('Hospital ID is missing.');
          return;  // Si l'ID est manquant, on arrête l'exécution
        }

        const SpecialityData = {
          ...newSpeciality,
          hospital_id: hospitalId, // Ajouter l'ID de l'hôpital à la requête
        };

        // Effectuer la requête POST pour ajouter la spécialité
        const response = await api.post('/api/specialities', SpecialityData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Mettre à jour l'état des spécialités après ajout
        setSpecialities([...specialities, response.data]);

        // Réinitialiser les champs du formulaire
        setNewSpeciality({ name: '', description: '', departementId: '' });

        // Fermer le modal après l'ajout
        handleCloseSpecialityModal();

        // Charger les spécialités à nouveau (pour s'assurer que la liste est bien à jour)
        await fetchSpecialities();

        // Afficher un message de succès (si nécessaire)
        setSuccessMessage('Spécialité ajoutée avec succès!');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la spécialité:', error);
      }
    } else {
      console.log('Veuillez remplir tous les champs.');
    }
  };

  // service Managment

  const [selectedService, setSelectedService] = useState(null);
  const [showServiceDetailsModal, setShowServiceDetailsModal] = useState(false);

  // service managment
  // Fonction pour gérer l'ajout d'une spécialité
  const addNewService = async () => {
    if (newService.name && newService.specialityId && newService.price_service && newService.description) {
      try {
        const token = localStorage.getItem('access_token');
        const hospitalId = mainHospital ? mainHospital._id : null;  // Utiliser l'ID de l'hôpital principal

        if (!hospitalId) {
          console.error('Hospital ID is missing.');
          return;  // Si l'ID est manquant, on arrête l'exécution
        }

        const ServiceData = {
          ...newService,
          hospital_id: hospitalId, // Ajouter l'ID de l'hôpital à la requête
        };

        // Effectuer la requête POST pour ajouter la spécialité
        const response = await api.post('/api/addservice', ServiceData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Mettre à jour l'état des spécialités après ajout
        setServices([...services, response.data]);

        // Réinitialiser les champs du formulaire
        setNewService({ name: '', departementId: '', specialityId: '', price_service: '', description: '' });


        // Charger les spécialités à nouveau (pour s'assurer que la liste est bien à jour)
        await fetchServices();

        // Afficher un message de succès (si nécessaire)
        setSuccessMessage('Service ajoutée avec succès!');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la service:', error);
      }
    } else {
      console.log('Veuillez remplir tous les champs.');
    }
  };

  // recuperer les specialites
  const fetchServices = async () => {
    if (!mainHospital) return; // Si l'hôpital principal n'est pas défini, ne rien faire
    try {
      const hospitalId = mainHospital._id; // Utiliser l'ID de l'hôpital principal
      const response = await api.get(`/api/services/hospital/${hospitalId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
      });

      // Mettre à jour l'état des spécialités dans le state
      setServices(response.data.data);

    } catch (error) {
      console.error('Erreur lors de la récupération des spécialités:', error);
      setMessage('Erreur lors de la récupération des spécialités.');
    }
  };

  useEffect(() => {
    fetchServices();
  }, [mainHospital]);

  const handlespecialitybydepartment = (event) => {
    const selectedDepartmentId = event.target.value;
    // 
    setNewService((prevState) => ({
      ...prevState,
      departementId: selectedDepartmentId,
      specialities: [],
    }));

    const updatedSpecialiies = specialities.filter(
      (speciality) => speciality.departementId === selectedDepartmentId
    );
    setFilteredSpecialities(updatedSpecialiies);
  };

  // État pour afficher le toast modal
  const [showToast, setShowToast] = useState(false);

  // Fonction pour ouvrir et fermer le modal
  const handleSave = () => {
    setShowToast(true); // Afficher le modal
    setTimeout(() => setShowToast(false), 3000); // Fermer automatiquement après 3 secondes
  };

  // news hospital adding
  const [showaddressModal, setShowAddressModal] = useState(false); // Contrôle du modal
  const [clinicName, setClinicName] = useState(''); // Valeur affichée dans l'input
  const [clinicAddress, setClinicAddress] = useState(''); // Valeur affichée dans l'input
  const [selectedCountry, setSelectedCountry] = useState(''); // Pays sélectionné
  const [selectedCity, setSelectedCity] = useState(''); // Ville sélectionnée
  const [selectedDepartmentaddress, setSelectedDepartmentaddress] = useState(''); // Département sélectionné
  const [telephone1, setTelephone1] = useState(''); // Téléphone 1
  const [telephone2, setTelephone2] = useState(''); // Téléphone 2

  // Ouvrir et fermer le modal
  const handleInputClick = () => setShowAddressModal(true);
  const handleCloseInputModal = () => setShowAddressModal(false);

  // Sauvegarde des sélections et mise à jour de l'adresse
  const handleSaveAddress = () => {
    const address = `${selectedCountry}, ${selectedCity}, ${selectedDepartmentaddress}`;
    setClinicAddress(address); // Mise à jour de l'input
    handleCloseInputModal(); // Ferme le modal
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Données du formulaire
    const formData = {
      hospital_name: clinicName,
      hospital_country: selectedCountry,
      hospital_city: selectedCity,
      hospital_state_province: selectedDepartmentaddress,
      hospital_phone: telephone1,
      hospital_phone2: telephone2,
    };
  
    try {
      // Récupérez le token depuis le localStorage
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Session expired. Please log in again.');
      }
  
      // Effectuez la requête à l'API
      const response = await api.post('/api/addhospital', formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Ajoutez le token dans l'en-tête
          'Content-Type': 'application/json',
        },
      });
  
      // Si la requête réussit
      toast.success('Hospital added successfully!');
      console.log('Response:', response.data);
      // Optionnel : Redirigez ou réinitialisez le formulaire ici
  
    } catch (error) {
      // Gestion des erreurs
      if (error.response?.status === 401) {
        toast.error('Session expired. Redirecting to login...');
        localStorage.removeItem('access_token'); // Supprimez le token
        window.location.href = '/login'; // Redirigez l'utilisateur
      } else {
        const errorMessage = error.response?.data?.error || error.message || 'An unknown error occurred.';
        toast.error(`Error: ${errorMessage}`);
      }
    }
  };
  


  // Fonction pour récupérer la liste des hôpitaux pour l'administrateur
  useEffect(() => {
    console.log('useEffect triggered');
    const fetchHospitals = async () => {
      if (!userId) {
        setMessage('Utilisateur non authentifié.');
        return;
      }
      try {
        const token = localStorage.getItem('access_token');
        const response = await api.get(`/api/hospitals/admin/` + token, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });

        // Filtrer l'hôpital principal (is_main_hospital: true) et les autres hôpitaux
        const mainHospitalData = response.data.find(hospital => hospital.is_main_hospital == true);
        const otherHospitalsData = response.data.filter(hospital => hospital.is_main_hospital !== true);

        if (mainHospitalData) {
          setMainHospital(mainHospitalData); // Stocker l'hôpital principal
          setDepartments(mainHospitalData.departments); // Associer les départements
          setSpecialities(mainHospitalData.specialities); // Associer les spécialités
        }
        setHospitals(response.data); // Sauvegarder tous les hôpitaux
        setOtherHospitals(otherHospitalsData); // Stocker les autres hôpitaux
      } catch (error) {
        console.error('Erreur lors de la récupération des hôpitaux:', error);
        setMessage('Erreur lors de la récupération des hôpitaux.');
      }
    };

    if (userId) {
      fetchHospitals(); // Appeler la fonction pour récupérer les hôpitaux uniquement si l'utilisateur est authentifié
    }
  }, [userId]); // Dépendance sur userId pour recharger si nécessaire


  return (

    <div className="dashboard-header" >
      <CHeader position="sticky" style={{ backgroundColor: '#DFEAF5' }}>
        <CContainer fluid className="d-flex align-items-center">
          <div className='row w-100'>
            {/* Barre de recherche */}
            <div className="pagetittle col">
              <h4><b>Hospital Settings</b></h4>
              <p>Home <BsChevronRight className='mx-2' style={{ fontSize: "12px" }} />  Dashboard <BsChevronRight style={{ fontSize: "12px" }} className='mx-2' />  <span style={{ color: '#191B1C' }}>Hospital Settings</span></p>
            </div>
            {/* Profil utilisateur */}

            <div className=' d-flex col justify-content-end'>
              <CHeaderNav>
                <CNavItem>
                  <CNavLink href="#" className="d-flex ms-auto">
                    <img src={Adminprofil} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                    <div>
                      <span className="ms-2" style={{ color: 'black' }}>{UserData.firstname} {UserData.lastname}</span>
                      <p className="ms-2" style={{ color: 'black' }}>{UserData.role?.name}</p>
                    </div>
                  </CNavLink>
                </CNavItem>
              </CHeaderNav>
            </div>
          </div>
        </CContainer>
      </CHeader>

      <div className='girls'>
        <div className='clean'>
          <div className="hospital  mt-5 mb-4">
            <div className="dropdown">
              <button
                className="d-flex align-items-center btn dropdown-toggle  text-start"
                type="button"
                onClick={toggleMainDropdown}
              >
                <span className='me-3' style={{ width: '70px', height: '5px', background: '#0056B3' }}></span>
                Main Hospital
              </button>
              {dropdownState.main && (
                <div className="p-3">
                  {mainHospital && (
                    <div className="hospital-name mt-3 mb-4">
                      <label>Hospital Name</label>
                      <input
                        type="text"
                        value={mainHospital.hospital_name || ''}
                        readOnly
                        className="form-control pt-3"
                      />
                    </div>
                  )}

                  {/* Departments Dropdown */}
                  <div className="dropdown-item mt-5">
                    <button
                      className="btn btn-primary dropdown-toggle w-100 text-start"
                      type="button"
                      onClick={toggleDepartments}
                    >
                      Departments
                    </button>
                    {dropdownState.departments && (
                      <div className="p-3">
                        {departments && Array.isArray(departments) && departments.length > 0 ? (
                          <div className="list d-flex flex-wrap">
                            {departments.map((dept, index) => (
                              <span key={index} className="badge1 m-1">
                                <a
                                  href="#"
                                  className="switcase"
                                  onClick={() => handleShowDepartmentDetails(dept)} // Ouvre les détails du département
                                >
                                  {dept.name} <FaArrowUp />
                                </a>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p>No departments available.</p> // Si aucun département n'est trouvé
                        )}
                        <div className="produit">
                          <button onClick={handleShowModal} className="btn btn-sm btn primero mt-4">
                            <FaListAlt /> Add Department
                          </button>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Specialities Dropdown */}
                  <div className="dropdown-item mt-4">
                    <button
                      className="btn btn-primary dropdown-toggle w-100 text-start"
                      type="button"
                      onClick={toggleSpecialities}
                    >
                      Speciality
                    </button>
                    {dropdownState.specialities && (
                      <div className="p-3">
                        {specialities && Array.isArray(specialities) && specialities.length > 0 ? (
                          <div className="list d-flex flex-wrap">
                            {specialities.map((spec, index) => (
                              <span key={index} className="badge2 m-1">
                                <a href="#" className="switcase">
                                  {spec.name} <FaArrowUp />
                                </a>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p>No specialities available.</p>
                        )}
                        <div className="bottle">
                          <button onClick={handleShowSpecialityModal} className="btn btn-sm btn mt-3 soccer">
                            <FaListAlt /> Add Speciality
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Services Dropdown */}
                  <div className="dropdown-item mt-4">
                    <button
                      className="btn  btn-primary dropdown-toggle w-100 text-start"
                      type="button"
                      onClick={toggleServices}
                    >
                      Services
                    </button>
                    {dropdownState.services && (
                      <div className="p-3">
                        {services && Array.isArray(services) && services.length > 0 ? (
                          <div className="list d-flex flex-wrap">
                            {services.map((serv, index) => (
                              <span key={index} className="badge2 m-1">
                                <a href="#" className="switcase">
                                  {serv.name} <FaArrowUp />
                                </a>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p>No services available.</p>
                        )}
                        <div className="bottle">
                          <button onClick={handleShowServiceModal} className="btn btn-sm btn mt-3 soccer">
                            <FaListAlt /> Add Service
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* Modal for Adding a Department */}
            <Modal show={showModal} onHide={handleCloseModal} centered className='' size="lg">
              <Modal.Header  >
                <Modal.Title className='yuri mx-auto'>Add New Department</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}
                <div className="form-group mb-4">
                  <label className=''> Name</label>
                  <input
                    type="text"
                    className="form-control tercio"
                    name="name" placeholder='Dermatology'
                    value={newDepartment.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <label className=''>Definissez le prix de la consultation :</label>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      className="form-control cinquo"
                      placeholder="20 000"
                      name="price_consult"
                      value={newDepartment.price_consult}
                      onChange={handleInputChange}
                    />
                    <span className="input-group-text" id="newDepartment.price_consult">XOF</span>
                  </div>

                </div>
                <div className="form-group mb-3">
                  {/* <label>Description</label> */}
                  <textarea
                    className="form-control raisin"
                    name="description"
                    placeholder='Description'
                    rows="3"
                    value={newDepartment.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className='wine mx-auto'>
                  <Button variant="" onClick={addDepartment} className='nearby'>
                    Continue <FaArrowRight />
                  </Button>
                </div>

              </Modal.Footer>
            </Modal>

            {/* modal for view or edit department */}

            <Modal
              show={showDepartmentDetailsModal}
              onHide={handleCloseDepartmentDetails}
              centered
              className="department-details-modal"
              size="lg"
            >
              <Modal.Header className='pamela' >
                <Modal.Title className="text-center w-100 vacation">
                  {selectedDepartment ? selectedDepartment.name : 'Department Details'}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <div className="department-details">
                  {/* Section pour le nom et le code */}
                  <div className="row mb-4">
                    <div className='col-md-2'>
                      <img src={group} alt="group" className="group " />
                    </div>
                    <div className="col-md-5 mt-4">
                      <label className='duolingo'>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={selectedDepartment ? selectedDepartment.name : ''}
                        readOnly
                      />
                    </div>
                    <div className="col-md-5 mt-4">
                      <label className='lisa'>Code</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={selectedDepartment ? selectedDepartment.codeDep : ''}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Section pour la description */}
                  <div className="mb-4">
                    <label className='vikram'>Description</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      defaultValue={selectedDepartment ? selectedDepartment.description : ''}
                      readOnly
                    ></textarea>
                  </div>

                  {/* Section pour le prix */}
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <label className='thibo'>Prix Consultation</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={selectedDepartment ? selectedDepartment.price_consult : ''}
                          readOnly
                        />
                        <span className="input-group-text">XOF</span>
                      </div>
                    </div>
                  </div>

                  {/* Section pour les docteurs */}
                  <div className="mb-4">
                    <button className="btn btn-primary w-100">Docteurs sous ce département <FaArrowDown /></button>
                    <ul className="list-group mt-3">
                      <li className="list-group-item d-flex justify-content-between align-items-center mb-3 biosso">
                        Dr. Badoss Succes Rifou
                        <button className="btn btn btn-sm chetif">🗑️</button>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center biosso">
                        Dr. SOSSOUI Gildas Rifou
                        <button className="btn btn btn-sm chetif">🗑️</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className='d-flex justify-content-between'>
                <button
                  className="btn btn-danger chute"
                  onClick={handleShowDeleteConfirm}
                >
                  Delete <FaRegTrashAlt />
                </button>
                <button className="btn btn-success chute">Save <FaArrowRight /></button>
              </Modal.Footer>
            </Modal>
            {/* Modal for delete department */}
            <Modal
              show={showDeleteConfirmModal}
              onHide={handleCloseDeleteConfirm}
              centered
              size="sm"
              className="delete-confirm-modal"
            >

              <Modal.Body>
                <p className="text-center">Are you sure you want to delete this department ?</p>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={handleCloseDeleteConfirm}>
                  Back
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </Modal.Footer>
            </Modal>

            {/* Modal for Adding a Speciality */}
            <Modal
              show={showSpecialityModal}
              onHide={handleCloseSpecialityModal}
              centered
              className="speciality-modal"
            >
              <Modal.Header>
                <Modal.Title className='canne mx-auto'>Add New Speciality</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group mb-4">
                  <label> Name</label>
                  <input
                    type="text"
                    className="form-control store"
                    name="name"
                    placeholder="Emergencist"
                    value={newSpeciality.name}
                    onChange={handleSpecialityInputChange}
                  />
                </div>
                {/* Sélecteur pour le département */}
                <div className="form-group mb-4">
                  <label >Department</label>
                  <select
                    className="form-control store"
                    name="departementId"
                    value={newSpeciality.departementId}
                    onChange={handleSpecialityInputChange}
                  >
                    <option value="">Select a Department</option>
                    {departments && Array.isArray(departments) && departments.length > 0 ? (
                      departments.map((department) => (
                        <option key={department._id} value={department._id}>
                          {department.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No departments available.</option> // Affiche cette option si aucun département n'est disponible
                    )}
                  </select>
                </div>

                <div className="form-group mb-4">
                  <textarea
                    className="form-control straight"
                    name="description"
                    placeholder="Description"
                    rows="3"
                    value={newSpeciality.description}
                    onChange={handleSpecialityInputChange}
                  ></textarea>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className='mx-auto'>
                  <Button variant="" onClick={addSpeciality} className='bob'>
                    Continue <FaArrowRight />
                  </Button>
                </div>

              </Modal.Footer>
            </Modal>


            {/* Modal for Adding a Service */}
            <Modal
              show={showServiceModal}
              onHide={handleCloseServiceModal}
              centered
              className="service-modal newregistermodal"
            >
              <Modal.Header>
                <Modal.Title className='canne mx-auto'>Add New Service</Modal.Title>
              </Modal.Header>
              <form>
                <Modal.Body>
                  <div className="form-group mb-4">
                    <label> Name</label>
                    <input
                      type="text"
                      className=""
                      name="name"
                      placeholder="Emergencist"
                      value={newService.name}
                      onChange={handleserviceInputChange}
                    />
                  </div>
                  {/* Sélecteur pour le département */}
                  <div className="form-group mb-4">
                    <label>Department</label>
                    <select
                      className=""
                      name="departementId"
                      value={newService.departementId}
                      onChange={handlespecialitybydepartment}
                    >
                      <option value="">Select a Department</option>
                      {departments && Array.isArray(departments) && departments.length > 0 ? (
                        departments.map((department) => (
                          <option key={department._id} value={department._id}>
                            {department.name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No departments available.</option> // Affiche cette option si aucun département n'est disponible
                      )}
                    </select>
                  </div>

                  <div className="form-group mb-4">
                    <label >Speciality</label>
                    <select
                      className=""
                      name="specialityId"
                      value={newService.specialityId}
                      onChange={handleserviceInputChange}
                    >
                      <option value="">Select a Department</option>
                      {filteredSpecialities && Array.isArray(filteredSpecialities) && filteredSpecialities.length > 0 ? (
                        filteredSpecialities.map((filteredSpecialitie) => (
                          <option key={filteredSpecialitie._id} value={filteredSpecialitie._id}>
                            {filteredSpecialitie.name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No speciality available.</option>
                      )}
                    </select>
                  </div>

                  <div className="form-group mb-4">
                    <input
                      type="number"
                      name="price_service"
                      placeholder="price_service"
                      value={newSpeciality.price_service}
                      onChange={handleserviceInputChange}

                    />
                    {/* <span style={{ width: 'auto', border: '1px solid #17426F' }}>XOF</span> */}
                  </div>
                  
                  <div className="form-group mb-4">
                    <textarea
                      className="form-control straight"
                      name="description"
                      placeholder="Description"
                      rows="3"
                      value={newService.description}
                      onChange={handleserviceInputChange}
                    ></textarea>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className='mx-auto'>
                    <Button onClick={addNewService} className='bob'>
                      Continue <FaArrowRight />
                    </Button>
                  </div>

                </Modal.Footer>
              </form>
            </Modal>

          </div>

          {/* adding others hospitals */}

          <div className="girla ">

            {/* Dropdowns */}
            <div className="dropdown mb-4">
              <button
                className="d-flex align-items-center btn dropdown-toggle  text-start"
                type="button"
                onClick={() => toggleDropdown("general")}
              >
                <span className='me-3' style={{ width: '70px', height: '5px', background: '#0056B3' }}></span>
                Add other site
              </button>
              {dropdownState.general && (
                <div className="p-3">
                  {/* General Settings */}
                  <div className="dropdown mb-3">
                    <button
                      className="btn btn-primary dropdown-toggle w-100 text-start"
                      type="button"
                      onClick={() => toggleDropdown("generalSettings")}
                    >
                      General Settings
                    </button>
                    {dropdownState.generalSettings && (
                      <div className="p-4 mt-5 border rounded bg-light">
                        {/* Contenu affiché lorsque le dropdown est ouvert */}
                        <div className="mb-5 manga">
                          <label className="">Enter hospital name</label>
                          <input
                            type="text"
                            name="clinicName"
                            className="form-control teletoon"
                            placeholder='Clinique name'
                            value={clinicName}
                            onChange={(e) => setClinicName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-5">
                          <div className="input-group">
                            <input type="text" className="form-control teletoon" placeholder="Clinic's address"
                              value={clinicAddress} // Affiche l'adresse mise à jour
                              onClick={handleInputClick} // Ouvre le modal
                              readOnly />
                            <span className="input-group-text">📍</span>
                          </div>
                        </div>

                        <div className="row mb-5">
                          <div className="col-md-6">
                            <input type="text" className="form-control teletoon" placeholder='Tel 1' value={telephone1}
                              onChange={(e) => setTelephone1(e.target.value)}
                              required />
                          </div>
                          <div className="col-md-6">
                            <input type="text" className="form-control teletoon" placeholder='Tel 2' value={telephone2}
                              onChange={(e) => setTelephone2(e.target.value)} />
                          </div>
                        </div>

                        <div className="text-end">
                          <button className="btn btn soglo" onClick={handleSubmit}>
                            Save <span>&#x2192;</span>
                          </button>
                        </div>
                        {/* Modal Toast for successful hospital register */}
                        <Modal
                          show={showToast}
                          onHide={() => setShowToast(false)}
                          centered
                          backdrop="static"
                          keyboard={false}
                        >
                          <div className="text-center p-4">
                            {/* Style pour l'en-tête */}
                            <div
                              style={{
                                backgroundColor: "#d4edda",
                                color: "#155724",
                                padding: "10px",
                                borderRadius: "8px 8px 0 0",
                              }}
                            >
                              <h5 className="fw-bold">SUCCESS</h5>
                            </div>
                            {/* Image */}
                            <div className="mt-3">
                              <img
                                src={modal} // Utilisez l'import ici
                                alt="Success"
                                style={{ width: "300px", height: "200px", }}
                              />

                            </div>
                            {/* Texte */}
                            <div className="mt-3">
                              <h6 className="fw-bold">Hospital's site created successfully</h6>
                            </div>
                          </div>
                        </Modal>

                        {/* Modal for address put */}
                        <Modal show={showaddressModal} onHide={handleCloseInputModal} centered>
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
                              value={selectedDepartmentaddress}
                              onChange={(e) => setSelectedDepartmentaddress(e.target.value)}
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
                              disabled={!selectedCountry || !selectedCity || !selectedDepartmentaddress}
                            >
                              Save changes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>





  );
};

export default Hospital;
