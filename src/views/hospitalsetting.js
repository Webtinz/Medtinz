import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './hospital.css';
import '../assets/css/mainstyle.css';
import group from '../assets/images/Group 174.png';
import modal from '../assets/images/modal.png';
import { Modal, Button } from 'react-bootstrap';
import { FaArrowUp } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import {
  CHeader, CContainer, CHeaderNav, CNavItem, CNavLink,
} from '@coreui/react'
import { BsPersonPlus, BsChevronRight, BsChevronLeft, BsArrowUpLeft } from 'react-icons/bs';

import Adminprofil from '../assets/images/adminprofil.png';
const Hospital = () => {
  const [mainDropdownOpen, setMainDropdownOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const [specialitiesOpen, setSpecialitiesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSpecialityModal, setShowSpecialityModal] = useState(false);
  const [hasOtherSites, setHasOtherSites] = useState(false); // État pour "Do you have other sites?"
  const [createSubAdmin, setCreateSubAdmin] = useState(false); // État pour "Create subadmin?"
  const [departments, setDepartments] = useState([
    'Cardiology',
    'Ophthalmology',
    'Dermatology',
    'Pediatry',
    'Psychiatry',
  ]);

  const [specialities, setSpecialities] = useState(['Ophthalmology', 'Cardiology']);

  const [newDepartment, setNewDepartment] = useState({
    code: '',
    name: '',
    speciality: '',
    price: '',
    description: '',
  });

  const [newSpeciality, setNewSpeciality] = useState({
    name: '',
    description: '',
  });

  const toggleMainDropdown = () => setMainDropdownOpen(!mainDropdownOpen);
  const toggleDepartments = () => setDepartmentsOpen(!departmentsOpen);
  const toggleSpecialities = () => setSpecialitiesOpen(!specialitiesOpen);
  const toggleServices = () => setServicesOpen(!servicesOpen);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowSpecialityModal = () => setShowSpecialityModal(true);
  const handleCloseSpecialityModal = () => setShowSpecialityModal(false);

  const handleDepartmentInputChange = (e) => {
    const { name, value } = e.target;
    setNewDepartment({ ...newDepartment, [name]: value });
  };

  const handleSpecialityInputChange = (e) => {
    const { name, value } = e.target;
    setNewSpeciality({ ...newSpeciality, [name]: value });
  };

  const addDepartment = () => {
    if (
      newDepartment.code &&
      newDepartment.name &&
      newDepartment.speciality &&
      newDepartment.price &&
      newDepartment.description
    ) {
      setDepartments([...departments, newDepartment.name]);
      setNewDepartment({ code: '', name: '', speciality: '', price: '', description: '' });
      handleCloseModal();
    }
  };

  const addSpeciality = () => {
    if (newSpeciality.name && newSpeciality.description) {
      setSpecialities([...specialities, newSpeciality.name]);
      setNewSpeciality({ name: '', description: '' });
      handleCloseSpecialityModal();
    }
  };
  const [services, setServices] = useState([
    { name: 'Analyses Sanguin', price: '20,000' },
    { name: 'Echography', price: '20,000' },
  ]);
  const addService = () => {
    setServices([...services, { name: '', price: '' }]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDepartment({ ...newDepartment, [name]: value });
  };
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
  const [dropdownState, setDropdownState] = useState({
    main: false,
    generalSettings: false,
    speciality: false,
    departments: false,
    services: false,
  });

  const toggleDropdown = (key) => {
    setDropdownState((prev) => ({
      ...prev,
      [key]: !prev[key], // Basculer l'état spécifique du dropdown
    }));
  };
  const [showSubadminInfo, setShowSubadminInfo] = useState(false);
  // État pour afficher le toast modal
  const [showToast, setShowToast] = useState(false);

  // Fonction pour ouvrir et fermer le modal
  const handleSave = () => {
    setShowToast(true); // Afficher le modal
    setTimeout(() => setShowToast(false), 3000); // Fermer automatiquement après 3 secondes
  };

  
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
                      <span className="ms-2" style={{ color: 'black' }}>Semia BOKO</span>
                      <p className="ms-2" style={{ color: 'black' }}>Admin</p>
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
              {mainDropdownOpen && (
                <div className="dropdown-menu w-100 p-3" style={{ display: 'block' }}>
                  <div className="hospital-name mb-4">
                    <label className='cos'>Hospital Name</label>

                    <input
                      type="text"
                      className="form-control chronique"
                      defaultValue="CLINIQUE FEYINT OLUWA"
                    />


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
                    {specialitiesOpen && (
                      <div className="p-3">
                        <div className="list d-flex flex-wrap">
                          {specialities.map((spec, index) => (
                            <span key={index} className="badge2  m-1">
                              <a href='#' className='switcase'>{spec} <FaArrowUp /></a>
                            </span>
                          ))}
                        </div>
                        <div className='bottle'>
                          <button
                            onClick={handleShowSpecialityModal}
                            className="btn btn-sm btn mt-3 soccer"
                          >
                            <FaListAlt /> Add Speciality
                          </button>
                        </div>

                      </div>
                    )}
                  </div>

                  {/* Departments Dropdown */}
                  <div className="dropdown-item">
                    <button
                      className="btn btn-primary dropdown-toggle w-100 text-start"
                      type="button"
                      onClick={toggleDepartments}
                    >
                      Departments
                    </button>
                    {departmentsOpen && (
                      <div className="p-3">
                        <div className="list d-flex flex-wrap">
                          {departments.map((dept, index) => (
                            <span key={index} className="badge1 m-1">
                              <a
                                href="#"
                                className="switcase"
                                onClick={() => handleShowDepartmentDetails(dept)}
                              >
                                {dept} <FaArrowUp />
                              </a>
                            </span>
                          ))}
                        </div>

                        <div className="produit">
                          <button onClick={handleShowModal} className="btn btn-sm btn primero mt-4">
                            <FaListAlt /> Add Department
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
                    {servicesOpen && (
                      <div className="p-3">
                        <p className='ayra mb-3'>*Configurez les services que vous offrez  avec les prix</p>
                        <div className="list container">
                          {services.map((service, index) => (
                            <div key={index} className="row mb-3">
                              <div className="col-lg-6 position-relative mb-3">
                                <label className="milk">Nom du service</label>
                                <input
                                  type="text"
                                  className="form-control flower"
                                  placeholder="Nom du service"
                                  value={service.name}
                                  onChange={(e) => {
                                    const updatedServices = [...services];
                                    updatedServices[index].name = e.target.value;
                                    setServices(updatedServices);
                                  }}
                                />
                              </div>

                              <div className='col-lg-1 mb-3'></div>
                              <div className="col-lg-5 position-relative mb-3">
                                <label className="coktail">Prix du service</label>
                                <div className="input-group mb-3">
                                  <input
                                    type="text"
                                    className="form-control bisola"
                                    placeholder="Prix du service"
                                    value={service.price}
                                    onChange={(e) => {
                                      const updatedServices = [...services];
                                      updatedServices[index].price = e.target.value;
                                      setServices(updatedServices);
                                    }}
                                  />
                                  <span className="input-group-text" id="basic-addon2">XOF</span>
                                </div>
                              </div>


                            </div>
                          ))}
                        </div>
                        <div className='produit'>
                          <button onClick={addService} className="btn btn-sm btn mt-2 primero
                    ">
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
            <Modal show={showModal} onHide={handleCloseModal} centered className='christian' size="lg">
              <Modal.Header  >
                <Modal.Title className='yuri mx-auto'>Add New Department</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group mb-4 mt-3">
                  <label className='secondo'>Code Department</label>
                  <input
                    type="text"
                    className="form-control arome"
                    name="code"
                    placeholder='DEP003456J6'
                    value={newDepartment.code}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-4">
                  <label className='fraise'> Name</label>
                  <input
                    type="text"
                    className="form-control tercio"
                    name="name" placeholder='Dermatology'
                    value={newDepartment.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-4">
                  <label className='menthe'>Speciality</label>
                  <select
                    className="form-control quartio"
                    name="speciality"
                    value={newDepartment.speciality}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a speciality</option>
                    <option value="Cardiology">Cardiology Emergency</option>
                    <option value="Ophthalmology">Ophthalmology Emergency</option>
                    <option value="Dermatology">Dermatology Emergency</option>
                    <option value="Pediatry">Pediatry Emergency</option>
                    <option value="Psychiatry">Psychiatry Emergency</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label className='banane'>Definissez le prix de la consultation :</label>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      className="form-control cinquo"
                      placeholder="20 000"
                      aria-label="newDepartment.price"
                      aria-describedby="newDepartment.price"
                      name="price"
                      value={newDepartment.price}
                      onChange={handleInputChange}
                    />
                    <span className="input-group-text" id="newDepartment.price">XOF</span>
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
                  <label className='dress'> Name</label>
                  <input
                    type="text"
                    className="form-control store"
                    name="name"
                    placeholder="Emergencist"
                    value={newSpeciality.name}
                    onChange={handleSpecialityInputChange}
                  />
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
            {/* Modal concernant le detail du departement */}
            <Modal
              show={showDepartmentDetailsModal}
              onHide={handleCloseDepartmentDetails}
              centered
              className="department-details-modal"
              size="lg"
            >
              <Modal.Header className='pamela' >
                <Modal.Title className="text-center w-100 vacation">
                  {selectedDepartment || 'Department Details'}
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
                        defaultValue={selectedDepartment || ''}
                        readOnly
                      />
                    </div>
                    <div className="col-md-5 mt-4">
                      <label className='lisa'>Code</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="DEP003456J6"
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
                      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel dolor non mi cursus sodales."
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
                          defaultValue="20 000"
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

          </div>

          {/* cela concerne la section question */}
          <div className="girla ">
            {/* Radio Buttons */}
            <div className="mb-4 fiona">
            <div className='d-flex align-items-center justify-content-center'>
            <span className='me-3' style={{ width: '70px', height: '5px', background: '#0056B3' }}></span> &nbsp; <label className="fw-bold d-block">Do you have other sites?</label>
            </div>
              <div className="d-flex px-5">
                <div className="sultan me-3">
                  <input
                    type="radio"
                    id="yes"
                    name="sites"
                    className=""
                    onChange={() => setHasOtherSites(true)}
                  />
                  <label className="form-check-label" htmlFor="yes">Yes</label>
                </div>
                <div className="tristan px-5">
                  <input
                    type="radio"
                    id="no"
                    name="sites"
                    className=""
                    onChange={() => setHasOtherSites(false)}
                  />
                  <label className="form-check-label" htmlFor="no">No</label>
                </div>
              </div>
            </div>

            {/* Dropdowns */}
            {hasOtherSites && (
              <div className="dropdown mb-4">
                <button
                  className="btn btn-primary dropdown-toggle w-100 text-start"
                  type="button"
                  onClick={() => toggleDropdown("general")}
                >
                  Site No 1
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
                        <div className="p-4 border rounded bg-light">
                          {/* Contenu affiché lorsque le dropdown est ouvert */}
                          <div className="mb-3 manga">
                            <label className="form-label fw-bold tiji">Enter hospital name</label>
                            <input
                              type="text"
                              className="form-control teletoon"
                              defaultValue="CLINIQUE OLUWA GBÉGAMEY"
                            />
                          </div>
                          <div className="mb-3">

                            <div className="input-group">
                              <input type="text" className="form-control teletoon" placeholder='Clinic Address' />
                              <span className="input-group-text">📍</span>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-6">

                              <input type="text" className="form-control teletoon" placeholder='Tel 1' />
                            </div>
                            <div className="col-md-6">

                              <input type="text" className="form-control teletoon" placeholder='Tel 2' />
                            </div>
                          </div>
                          {/* Subadmin Section */}
                          <div className="mb-3 d-flex">
                            <label className="form-label fw-bold me-3">Create subadmin?</label>
                            <div className="d-flex align-items-center">
                              <div className=" me-3">
                                <input
                                  type="radio"
                                  className=""
                                  name="subadmin"
                                  id="yes"
                                  onChange={() => setShowSubadminInfo(true)} // Affiche les informations Subadmin
                                />
                                <label className="form-check-label" htmlFor="yes">
                                  Yes
                                </label>
                              </div>
                              <div className="">
                                <input
                                  type="radio"
                                  className=""
                                  name="subadmin"
                                  id="no"
                                  onChange={() => setShowSubadminInfo(false)} // Masque les informations Subadmin
                                />
                                <label className="form-check-label" htmlFor="no">
                                  No
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Subadmin Information */}
                          {showSubadminInfo && (

                            <div className="mb-3">
                              <p>Enter subadmin information:</p>
                              <div>
                                <label className="form-label fw-bold jone">Admin’s firstname</label>
                                <input
                                  type="text"
                                  className="form-control mb-3 rtl"
                                  placeholder="Admin's firstname"
                                  defaultValue="DOMINGO"
                                />
                              </div>

                              <div className="row mt-4">
                                <div className="col-md-2 mb-3">
                                  <label className="form-label fw-bold disney">Civility</label>
                                  <select className="form-control cartoon">
                                    <option>M.</option>
                                    <option>Mrs.</option>
                                  </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                  <label className="form-label fw-bold  pop">Title</label>
                                  <input
                                    type="text"
                                    className="form-control boomrang"
                                    placeholder="Specialist / Doctor"
                                  />
                                </div>
                                <div className="col-md-4 mb-3 ">
                                  <label className="form-label fw-bold mtv">Email</label>
                                  <input
                                    type="email"
                                    className="form-control cstar"
                                    placeholder="maxy@mail.com"
                                  />
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-md-6 mb-3">

                                  <input type="text" className="form-control tf1" placeholder='Admins Tel 1' />
                                </div>
                                <div className="col-md-6 mb-3">

                                  <input type="text" className="form-control tf1" placeholder='Admins Tel 2' />
                                </div>
                              </div>
                            </div>
                          )}
                          <div>
                            {/* Votre contenu principal */}
                            <div className="text-end">
                              <button className="btn btn soglo" onClick={handleSave}>
                                Save <span>&#x2192;</span>
                              </button>
                            </div>

                            {/* Modal Toast */}
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
                          </div>

                        </div>
                      )}
                    </div>


                    {/* Speciality */}
                    <div className="dropdown-item mt-4 mb-3">
                      <button
                        className="btn btn-primary dropdown-toggle w-100 text-start"
                        type="button"
                        onClick={toggleSpecialities}
                      >
                        Speciality
                      </button>
                      {specialitiesOpen && (
                        <div className="p-3">
                          <div className="list d-flex flex-wrap">
                            {specialities.map((spec, index) => (
                              <span key={index} className="badge2  m-1">

                                <a href='#' className='switcase'>{spec} <FaArrowUp /></a>
                              </span>
                            ))}
                          </div>
                          <div className='bottle'>
                            <button
                              onClick={handleShowSpecialityModal}
                              className="btn btn-sm btn mt-3 soccer"
                            >
                              <FaListAlt /> Add Speciality
                            </button>
                          </div>

                        </div>
                      )}
                    </div>

                    {/* Departments Dropdown */}
                    <div className="dropdown-item mb-3">
                      <button
                        className="btn btn-primary dropdown-toggle w-100 text-start"
                        type="button"
                        onClick={toggleDepartments}
                      >
                        Departments
                      </button>
                      {departmentsOpen && (
                        <div className="p-3">
                          <div className="list d-flex flex-wrap">
                            {departments.map((dept, index) => (
                              <span key={index} className="badge1 m-1">
                                <a
                                  href="#"
                                  className="switcase"
                                  onClick={() => handleShowDepartmentDetails(dept)}
                                >
                                  {dept} <FaArrowUp />
                                </a>
                              </span>
                            ))}
                          </div>

                          <div className="produit">
                            <button onClick={handleShowModal} className="btn btn-sm btn primero mt-4">
                              <FaListAlt /> Add Department
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Services */}
                    <div className="dropdown-item mt-4">
                      <button
                        className="btn  btn-primary dropdown-toggle w-100 text-start"
                        type="button"
                        onClick={toggleServices}
                      >
                        Services
                      </button>
                      {servicesOpen && (
                        <div className="p-3">
                          <p className='ayra mb-3'>*Configurez les services que vous offrez  avec les prix</p>
                          <div className="list container">
                            {services.map((service, index) => (
                              <div key={index} className="row mb-3">
                                <div className="col-lg-6 position-relative mb-3">
                                  <label className="milk">Nom du service</label>
                                  <input
                                    type="text"
                                    className="form-control flower"
                                    placeholder="Nom du service"
                                    value={service.name}
                                    onChange={(e) => {
                                      const updatedServices = [...services];
                                      updatedServices[index].name = e.target.value;
                                      setServices(updatedServices);
                                    }}
                                  />
                                </div>

                                <div className='col-lg-1 mb-3'></div>
                                <div className="col-lg-5 position-relative mb-3">
                                  <label className="coktail">Prix du service</label>
                                  <div className="input-group mb-3">
                                    <input
                                      type="text"
                                      className="form-control bisola"
                                      placeholder="Prix du service"
                                      value={service.price}
                                      onChange={(e) => {
                                        const updatedServices = [...services];
                                        updatedServices[index].price = e.target.value;
                                        setServices(updatedServices);
                                      }}
                                    />
                                    <span className="input-group-text" id="basic-addon2">XOF</span>
                                  </div>
                                </div>


                              </div>
                            ))}
                          </div>
                          <div className='produit'>
                            <button onClick={addService} className="btn btn-sm btn mt-2 primero
                    ">
                              <FaListAlt /> Add Service
                            </button>
                          </div>

                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>



  );
};

export default Hospital;
