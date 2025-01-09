import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {
    CButton,
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardHeader,
    CTab,
    CTabContent,
    CTabList,
    CTabPanel,
    CTabs,
    CHeader, CContainer, CHeaderNav, CNavItem, CNavLink,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle
} from '@coreui/react'
import { FaEdit, FaArrowLeft, FaSearch } from "react-icons/fa";
import { BsPersonPlus, BsChevronRight, BsChevronLeft, BsArrowRight, BsTrash3 } from 'react-icons/bs';
import '../../../assets/css/mainstyle.css';
import Doctorvector from '../../../assets/images/doctorvector.png';

const PatientList = () => {
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [modalContent, setModalContent] = useState('');  // Contenu dynamique du modal

    // Fonction pour ouvrir le modal et définir le contenu
    const handleIconClick = (content) => {
        setModalContent(content);  // Définit le contenu du modal
        setVisible1(true);  // Ouvre le modal
    };

    return (
        <div className="dashboard-header" >
            <CHeader position="sticky" style={{ backgroundColor: '#DFEAF5' }}>
                <CContainer fluid className="d-flex align-items-center">
                    {/* Barre de recherche */}
                    <div className="pagetittle">
                        <h4><b>Patient Management</b></h4>
                        <p>Home <BsChevronRight className='mx-2' style={{ fontSize: "12px" }} />  Dashboard <BsChevronRight style={{ fontSize: "12px" }} className='mx-2' />  <span style={{ color: '#191B1C' }}>Patient Management</span></p>
                    </div>
                    {/* Profil utilisateur */}
                    <CHeaderNav>
                        <CNavItem>
                            <CNavLink href="#" className="d-flex align-items-center">
                                <img src="src\assets\images\adminprofil.png" className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                                <div>
                                    <span className="ms-2">Semia BOKO</span>
                                    <p className="ms-2">Admin</p>
                                </div>
                            </CNavLink>
                        </CNavItem>
                    </CHeaderNav>
                </CContainer>
            </CHeader>

            <div className="Patientlist mt-2"  >
                <div className='tabsection'>
                    <CRow>
                        <CCol xs={12}>
                            <CCard className="card mb-4 p-4">
                                <CCardBody>
                                    <CTabs activeItemKey="Allusers">
                                        <CTabList variant="underline" className='border-bottom'>
                                            <CTab itemKey="Allusers">All Users</CTab>
                                            <CTab itemKey="Receptionist">Receptionist</CTab>
                                            <CTab itemKey="Doctors">Doctors</CTab>
                                        </CTabList>
                                        <CTabContent>
                                            <CTabPanel className="p-3" itemKey="Allusers">
                                                <div className='tablist' >
                                                    <CContainer fluid className='medicalhistory'>
                                                        {/* Header */}
                                                        <CRow className="my-3">
                                                            <CCol xs={12} md={4}>
                                                                <CButton className=" retourbtn">
                                                                    <FaArrowLeft /> Retour
                                                                </CButton>
                                                            </CCol>
                                                        </CRow>

                                                        <CRow className="my-3 patientinfo" >
                                                            <CCol xs={12} md={4}>
                                                                <CRow className="d-flex align-items-end">
                                                                    <CCol xs={12} md={4}>
                                                                        <img
                                                                            src="src/assets/images/man-438081_960_720.png"
                                                                            alt="Profile"
                                                                            className="img-fluid rounded-circle"
                                                                            style={{ width: '120px', height: '120px' }}
                                                                        />
                                                                    </CCol>
                                                                    <CCol xs={12} md={8}>
                                                                        <div className="flexcoldisposition">
                                                                            <h3>Nom :</h3>
                                                                            <p><b>Badoss</b></p>
                                                                        </div>
                                                                    </CCol>
                                                                </CRow>
                                                            </CCol>
                                                            <CCol xs={12} md={4}>
                                                                <div classname="flexcoldisposition">
                                                                    <h3>Prénom : </h3>
                                                                    <p><b>Austin Miller</b></p>
                                                                </div>
                                                            </CCol>
                                                            <CCol xs={12} md={4}>
                                                                <div classname="flexcoldisposition">
                                                                    <p>Membre depuis : <span style={{ textDecoration: "underline" }}>12 Nov 2019</span></p>
                                                                    <p><b>Dermatologist</b></p>
                                                                </div>
                                                            </CCol>
                                                        </CRow>

                                                        {/* Medical History */}
                                                        <CCard className="mt-5 " style={{ border: 'none' }}>
                                                            <CCardHeader style={{ border: 'none', background: 'transparent' }}>
                                                                <div className='d-flex align-items-center cardheader'>
                                                                    <span className='me-3' style={{ width:'70px',height:'5px', background: 'green' }}></span>
                                                                    <h4>Medical history</h4>
                                                                </div>
                                                            </CCardHeader>
                                                            <CCardBody>
                                                                <div className="history-item">
                                                                    <div className='col'>
                                                                        <p>1</p>
                                                                    </div>
                                                                    <div className='col'>
                                                                        <p>Updated on 20- Dec 2024</p>
                                                                    </div>
                                                                    <div className='col'>
                                                                        <p>Consultation</p>
                                                                    </div>
                                                                    <div className='col'>
                                                                        <p>Dermatology</p>
                                                                    </div>
                                                                </div>
                                                                <div className="history-item">
                                                                    <div className='col'>
                                                                        <p>1</p>
                                                                    </div>
                                                                    <div className='col'>
                                                                        <p>Updated on 20- Dec 2024</p>
                                                                    </div>
                                                                    <div className='col'>
                                                                        <p>Consultation</p>
                                                                    </div>
                                                                    <div className='col'>
                                                                        <p>Dermatology</p>
                                                                    </div>
                                                                </div>
                                                                <div className="history-item">
                                                                    <div className='col'>
                                                                        <p>1</p>
                                                                    </div>
                                                                    <div className='col'>
                                                                        <p>Updated on 20- Dec 2024</p>
                                                                    </div>
                                                                    <div className='col'>
                                                                        <p>Consultation</p>
                                                                    </div>
                                                                    <div className='col'>
                                                                        <p>Dermatology</p>
                                                                    </div>
                                                                </div>
                                                            </CCardBody>
                                                        </CCard>
                                                    </CContainer>
                                                </div>
                                            </CTabPanel>
                                            <CTabPanel className="p-3" itemKey="Receptionist">
                                                <div className='tablist' >
                                                    <div className='d-flex mt-4'>
                                                        <CButton onClick={() => setVisible(!visible)} className="registernewbtn ms-auto d-flex align-items-center" active tabIndex={-1}>
                                                            <BsPersonPlus className='mx-2' /> Register New user
                                                        </CButton>
                                                    </div>

                                                    {/* modal */}

                                                    <CModal className='newregistermodal'
                                                        alignment="center"
                                                        scrollable
                                                        size='lg'
                                                        visible={visible}
                                                        onClose={() => setVisible(false)}
                                                        aria-labelledby="VerticallyCenteredScrollableExample2"
                                                    >
                                                        <CModalHeader>
                                                            <CModalTitle id="VerticallyCenteredScrollableExample2" className='Titleformsmodal'>Register new user</CModalTitle>
                                                        </CModalHeader>
                                                        <CModalBody className='p-5'>
                                                            <form>
                                                                <div className="form-group">
                                                                    <div className="profile-photo d-flex">
                                                                        <div className="photo-container">
                                                                            <img src="src\assets\images\man-438081_960_720.png" alt="Profile" className="profile-image" />
                                                                        </div>
                                                                        <div className='photoedit'>
                                                                            <div>
                                                                                <label htmlFor="file-input">
                                                                                    <FaEdit />
                                                                                </label>
                                                                                <input type="file" id="file-input" accept="image/*" />
                                                                            </div>
                                                                            <p className='ms-2'>Upload profile photo (jpg, png, jpeg)</p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="form-group">
                                                                    <label htmlFor="name">Name</label>
                                                                    <input
                                                                        type="text"
                                                                        name="name"
                                                                        id="name"
                                                                        placeholder="Casos Billal"
                                                                    />
                                                                </div>

                                                                <div className="form-row row">
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="role">Role</label>
                                                                        <select name="role" id="role">
                                                                            <option value="">Select Role</option>
                                                                            <option value="admin">Admin</option>
                                                                            <option value="doctor">Doctor</option>
                                                                            <option value="nurse">Nurse</option>
                                                                        </select>
                                                                    </div>

                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="department">Department</label>
                                                                        <select name="department" id="department">
                                                                            <option value="">Select Department</option>
                                                                            <option value="cardiology">Cardiology</option>
                                                                            <option value="dermatology">Dermatology</option>
                                                                            <option value="neurology">Neurology</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="form-row row">
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="email">Email</label>
                                                                        <input
                                                                            type="eamil"
                                                                            name="email"
                                                                            id="email"
                                                                            placeholder="email"
                                                                        />
                                                                    </div>

                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="gender">Gender</label>
                                                                        <select name="gender" id="gender">
                                                                            <option value="">Select Gender</option>
                                                                            <option value="male">Male</option>
                                                                            <option value="female">Female</option>
                                                                            <option value="other">Other</option>
                                                                        </select>
                                                                    </div>
                                                                </div>



                                                                <div className="form-row row">
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="contact1">Contact 1</label>
                                                                        <input
                                                                            type="tel"
                                                                            name="contact1"
                                                                            id="contact1"
                                                                            placeholder="+229 01 90 00 00 00"
                                                                        />
                                                                    </div>

                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="contact2">Contact 2</label>
                                                                        <input
                                                                            type="tel"
                                                                            name="contact2"
                                                                            id="contact2"
                                                                            placeholder="+229 01 90 00 00 00"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="form-group">
                                                                    <label htmlFor="address">Address</label>
                                                                    <input
                                                                        name="address"
                                                                        id="address"
                                                                        placeholder="Your address here"
                                                                    />
                                                                </div>

                                                                <div className="form-group d-flex justify-content-center">
                                                                    <CButton color="primary" type="submit">
                                                                        Continue &nbsp; <BsArrowRight />
                                                                    </CButton>
                                                                </div>
                                                            </form>
                                                        </CModalBody>
                                                    </CModal>


                                                    <div className="search-container">
                                                        <div className="search-bar">
                                                            <FaSearch
                                                                size="sm"
                                                                className="search-icon" style={{ width: '20px', height: '20px' }}/>
                                                            <input
                                                                type="text"
                                                                placeholder="Search for a patient (Enter ID, name or Tel)"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <CTable hover className='mt-5' align="middle" responsive>
                                                            <CTableHead>
                                                                <CTableRow>
                                                                    <CTableHeaderCell scope="col">Profile</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                                                </CTableRow>
                                                            </CTableHead>
                                                            <CTableBody>
                                                                <CTableRow className='ctable-row'>
                                                                    <CTableHeaderCell align="middle">
                                                                        <img src={Doctorvector} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                                                                    </CTableHeaderCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableHeaderCell align="middle"><span className='coloredsucess'>Active</span></CTableHeaderCell>
                                                                    <CTableDataCell align="middle" >
                                                                        <div className='actionbtn'>
                                                                            <div className='left'>
                                                                                <FaEdit onClick={() => handleIconClick('Left icon clicked')} />
                                                                            </div>
                                                                            <div className='right'>
                                                                                <BsTrash3 onClick={() => handleIconClick('right icon clicked')} style={{ color: '#EF3826' }} />
                                                                            </div>
                                                                        </div>

                                                                        {/* Modal */}
                                                                        <CModal visible={visible1} onClose={() => setVisible1(false)}>
                                                                            <CModalHeader>
                                                                                <CModalTitle>Modal Title</CModalTitle>
                                                                            </CModalHeader>
                                                                            <CModalBody>
                                                                                <p>{modalContent}</p>  {/* Affiche le contenu dynamique du modal */}
                                                                            </CModalBody>
                                                                            <CModalFooter>
                                                                                <CButton color="secondary">
                                                                                    Close
                                                                                </CButton>
                                                                                <CButton color="primary">Save changes</CButton>
                                                                            </CModalFooter>
                                                                        </CModal>
                                                                    </CTableDataCell>
                                                                </CTableRow>
                                                                <CTableRow className=''>
                                                                    <CTableHeaderCell align="middle"><img src={Doctorvector} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableHeaderCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableHeaderCell align="middle" ><span className='coloredsucess'>Active</span></CTableHeaderCell>
                                                                    <CTableDataCell align="middle" >
                                                                        <div className='actionbtn'>
                                                                            <div className='left'>
                                                                                <FaEdit onClick={() => handleIconClick('Left icon clicked')} />
                                                                            </div>
                                                                            <div className='right'>
                                                                                <BsTrash3 onClick={() => handleIconClick('right icon clicked')} style={{ color: '#EF3826' }} />
                                                                            </div>
                                                                        </div>
                                                                    </CTableDataCell>                                                                </CTableRow>
                                                                <CTableRow className=''>
                                                                    <CTableHeaderCell align="middle"><img src={Doctorvector} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableHeaderCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableHeaderCell align="middle" ><span className='coloredechec'>Not Active</span></CTableHeaderCell>
                                                                    <CTableDataCell align="middle" >
                                                                        <div className='actionbtn'>
                                                                            <div className='left'>
                                                                                <FaEdit onClick={() => handleIconClick('Left icon clicked')} />
                                                                            </div>
                                                                            <div className='right'>
                                                                                <BsTrash3 onClick={() => handleIconClick('right icon clicked')} style={{ color: '#EF3826' }} />
                                                                            </div>
                                                                        </div>
                                                                    </CTableDataCell>
                                                                </CTableRow>
                                                            </CTableBody>
                                                        </CTable>
                                                    </div>
                                                </div>
                                            </CTabPanel>
                                            <CTabPanel className="p-3" itemKey="Doctors">
                                                <div className='tablist' >
                                                    <div className='d-flex mt-4'>
                                                        <CButton onClick={() => setVisible(!visible)} className="registernewbtn ms-auto d-flex align-items-center" active tabIndex={-1}>
                                                            <BsPersonPlus className='mx-2' /> Register New user
                                                        </CButton>
                                                    </div>

                                                    {/* modal */}

                                                    <CModal className='newregistermodal'
                                                        alignment="center"
                                                        scrollable
                                                        size='lg'
                                                        visible={visible}
                                                        onClose={() => setVisible(false)}
                                                        aria-labelledby="VerticallyCenteredScrollableExample2"
                                                    >
                                                        <CModalHeader>
                                                            <CModalTitle id="VerticallyCenteredScrollableExample2" className='Titleformsmodal'>Register new user</CModalTitle>
                                                        </CModalHeader>
                                                        <CModalBody className='p-5'>
                                                            <form>
                                                                <div className="form-group">
                                                                    <div className="profile-photo d-flex">
                                                                        <div className="photo-container">
                                                                            <img src="src\assets\images\man-438081_960_720.png" alt="Profile" className="profile-image" />
                                                                        </div>
                                                                        <div className='photoedit'>
                                                                            <div>
                                                                                <label htmlFor="file-input">
                                                                                    <FaEdit />
                                                                                </label>
                                                                                <input type="file" id="file-input" accept="image/*" />
                                                                            </div>
                                                                            <p className='ms-2'>Upload profile photo (jpg, png, jpeg)</p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="form-group">
                                                                    <label htmlFor="name">Name</label>
                                                                    <input
                                                                        type="text"
                                                                        name="name"
                                                                        id="name"
                                                                        placeholder="Casos Billal"
                                                                    />
                                                                </div>

                                                                <div className="form-row row">
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="role">Role</label>
                                                                        <select name="role" id="role">
                                                                            <option value="">Select Role</option>
                                                                            <option value="admin">Admin</option>
                                                                            <option value="doctor">Doctor</option>
                                                                            <option value="nurse">Nurse</option>
                                                                        </select>
                                                                    </div>

                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="department">Department</label>
                                                                        <select name="department" id="department">
                                                                            <option value="">Select Department</option>
                                                                            <option value="cardiology">Cardiology</option>
                                                                            <option value="dermatology">Dermatology</option>
                                                                            <option value="neurology">Neurology</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="form-row row">
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="email">Email</label>
                                                                        <input
                                                                            type="eamil"
                                                                            name="email"
                                                                            id="email"
                                                                            placeholder="email"
                                                                        />
                                                                    </div>

                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="gender">Gender</label>
                                                                        <select name="gender" id="gender">
                                                                            <option value="">Select Gender</option>
                                                                            <option value="male">Male</option>
                                                                            <option value="female">Female</option>
                                                                            <option value="other">Other</option>
                                                                        </select>
                                                                    </div>
                                                                </div>



                                                                <div className="form-row row">
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="contact1">Contact 1</label>
                                                                        <input
                                                                            type="tel"
                                                                            name="contact1"
                                                                            id="contact1"
                                                                            placeholder="+229 01 90 00 00 00"
                                                                        />
                                                                    </div>

                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="contact2">Contact 2</label>
                                                                        <input
                                                                            type="tel"
                                                                            name="contact2"
                                                                            id="contact2"
                                                                            placeholder="+229 01 90 00 00 00"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="form-group">
                                                                    <label htmlFor="address">Address</label>
                                                                    <input
                                                                        name="address"
                                                                        id="address"
                                                                        placeholder="Your address here"
                                                                    />
                                                                </div>

                                                                <div className="form-group d-flex justify-content-center">
                                                                    <CButton color="primary" type="submit">
                                                                        Continue &nbsp; <BsArrowRight />
                                                                    </CButton>
                                                                </div>
                                                            </form>
                                                        </CModalBody>
                                                    </CModal>


                                                    <div className="search-container">
                                                        <div className="search-bar">
                                                            <FaSearch
                                                                size="sm"
                                                                className="search-icon" style={{ width: '20px', height: '20px' }}/>
                                                            <input
                                                                type="text"
                                                                placeholder="Search for a patient (Enter ID, name or Tel)"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <CTable hover className='mt-5' align="middle" responsive>
                                                            <CTableHead>
                                                                <CTableRow>
                                                                    <CTableHeaderCell scope="col">Profile</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                                                </CTableRow>
                                                            </CTableHead>
                                                            <CTableBody>
                                                                <CTableRow className='ctable-row'>
                                                                    <CTableHeaderCell align="middle">
                                                                        <img src={Doctorvector} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                                                                    </CTableHeaderCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableHeaderCell align="middle"><span className='coloredsucess'>Active</span></CTableHeaderCell>
                                                                    <CTableDataCell align="middle" >
                                                                        <div className='actionbtn'>
                                                                            <div className='left'>
                                                                                <FaEdit onClick={() => handleIconClick('Left icon clicked')} />
                                                                            </div>
                                                                            <div className='right'>
                                                                                <BsTrash3 onClick={() => handleIconClick('right icon clicked')} style={{ color: '#EF3826' }} />
                                                                            </div>
                                                                        </div>

                                                                        {/* Modal */}
                                                                        <CModal visible={visible1} onClose={() => setVisible1(false)}>
                                                                            <CModalHeader>
                                                                                <CModalTitle>Modal Title</CModalTitle>
                                                                            </CModalHeader>
                                                                            <CModalBody>
                                                                                <p>{modalContent}</p>  {/* Affiche le contenu dynamique du modal */}
                                                                            </CModalBody>
                                                                            <CModalFooter>
                                                                                <CButton color="secondary">
                                                                                    Close
                                                                                </CButton>
                                                                                <CButton color="primary">Save changes</CButton>
                                                                            </CModalFooter>
                                                                        </CModal>
                                                                    </CTableDataCell>
                                                                </CTableRow>
                                                                <CTableRow className=''>
                                                                    <CTableHeaderCell align="middle"><img src={Doctorvector} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableHeaderCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableHeaderCell align="middle" ><span className='coloredsucess'>Active</span></CTableHeaderCell>
                                                                    <CTableDataCell align="middle" >
                                                                        <div className='actionbtn'>
                                                                            <div className='left'>
                                                                                <FaEdit onClick={() => handleIconClick('Left icon clicked')} />
                                                                            </div>
                                                                            <div className='right'>
                                                                                <BsTrash3 onClick={() => handleIconClick('right icon clicked')} style={{ color: '#EF3826' }} />
                                                                            </div>
                                                                        </div>
                                                                    </CTableDataCell>                                                                </CTableRow>
                                                                <CTableRow className=''>
                                                                    <CTableHeaderCell align="middle"><img src={Doctorvector} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableHeaderCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableHeaderCell align="middle" ><span className='coloredechec'>Not Active</span></CTableHeaderCell>
                                                                    <CTableDataCell align="middle" >
                                                                        <div className='actionbtn'>
                                                                            <div className='left'>
                                                                                <FaEdit onClick={() => handleIconClick('Left icon clicked')} />
                                                                            </div>
                                                                            <div className='right'>
                                                                                <BsTrash3 onClick={() => handleIconClick('right icon clicked')} style={{ color: '#EF3826' }} />
                                                                            </div>
                                                                        </div>
                                                                    </CTableDataCell>
                                                                </CTableRow>
                                                            </CTableBody>
                                                        </CTable>
                                                    </div>
                                                </div>
                                            </CTabPanel>
                                        </CTabContent>
                                    </CTabs>
                                    {/* paginate */}
                                    <div className='paginate me-5'>
                                        <p className='mt-3'>Showing 1-09 of 78</p>
                                        <div className='actionbtn'>
                                            <div className='left'>
                                                < BsChevronLeft className='pagicon' />
                                            </div>
                                            <div className='right'>
                                                < BsChevronRight className='pagicon' />
                                            </div>
                                        </div>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </div>
            </div>
        </div >


    );
}

export default PatientList;
