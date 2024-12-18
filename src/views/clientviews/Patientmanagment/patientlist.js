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
import { cilSearch } from '@coreui/icons';
import { FaEdit, FaRedoAlt, FaExchangeAlt, FaFilter } from "react-icons/fa";
import { BsPersonPlus, BsChevronRight, BsChevronLeft, BsArrowRight, BsTrash3, BsArrowUpLeft } from 'react-icons/bs';
import * as icon from '@coreui/icons';
import CIcon from '@coreui/icons-react'
import '../../../assets/css/mainstyle.css';

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
                                    <CTabs activeItemKey="Allpatient">
                                        <CTabList variant="underline" className='border-bottom mx-auto'>
                                            <CTab itemKey="Allpatient">All Patient</CTab>
                                            <CTab itemKey="dayrecord">Day's record</CTab>
                                        </CTabList>
                                        <CTabContent>
                                            <CTabPanel className="p-3" itemKey="Allpatient">
                                                <div className='tablist ' >
                                                    <div className='patientlistline'>
                                                        <div className="search-container">
                                                            <div className="search-bar">
                                                                <CIcon
                                                                    icon={cilSearch}
                                                                    size="sm"
                                                                    className="search-icon" />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search for a patient (Enter ID, name or Tel)"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='registeruserbtn ms-auto'>
                                                            <CButton onClick={() => setVisible(!visible)} className="registernewbtn ms-auto d-flex align-items-center" active tabIndex={-1}>
                                                                <BsPersonPlus className='mx-2' /> Register New user
                                                            </CButton>
                                                        </div>
                                                    </div>
                                                    <div className=''>
                                                        <div className="filter-bar">
                                                            <button className="filter-button">
                                                                Filter By<FaFilter className="icon" />
                                                            </button>
                                                            <button className="filter-button">
                                                                Order Type<FaExchangeAlt className="icon" />
                                                            </button>
                                                            <button className="reset-button">
                                                                <FaRedoAlt className="icon" /> Reset Filter
                                                            </button>
                                                        </div>
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
                                                            <CModalTitle id="VerticallyCenteredScrollableExample2" className='Titleformsmodal'>Register new patient</CModalTitle>
                                                        </CModalHeader>
                                                        <CModalBody className='p-5'>
                                                            <form>

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
                                                                    <div className="form-group col-md-4">
                                                                        <label htmlFor="age">Age</label>
                                                                        <input
                                                                            type="text"
                                                                            name="age"
                                                                            id="age"
                                                                            placeholder="23"
                                                                        />
                                                                    </div>
                                                                    <div className="form-group col-md-4">
                                                                        <label htmlFor="gender">Gender</label>
                                                                        <select name="gender" id="Gender">
                                                                            <option value="">Select Gender</option>
                                                                            <option value="male">Male</option>
                                                                            <option value="female">Female</option>
                                                                            <option value="other">Other</option>
                                                                        </select>
                                                                    </div>

                                                                    <div className="form-group col-md-4">
                                                                        <label htmlFor="birth">Name</label>
                                                                        <input
                                                                            type="date"
                                                                            name="birth"
                                                                            id="birth"
                                                                            placeholder="20-12-2000"
                                                                        />
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

                                                                <div className="form-group">
                                                                    <label htmlFor="details">Details</label>
                                                                    <input
                                                                        name="details"
                                                                        id="details"
                                                                        placeholder="Your Details here"
                                                                    />
                                                                </div>

                                                                <div className="savenewuser form-group d-flex justify-content-center">
                                                                    <CButton type="submit">
                                                                        Continue &nbsp; <BsArrowRight />
                                                                    </CButton>
                                                                </div>
                                                            </form>
                                                        </CModalBody>
                                                    </CModal>

                                                    <div className='patientlisttable'>
                                                        <CTable className="mt-5 ctable-no-border " align="middle" responsive>
                                                            <CTableHead>
                                                                <CTableRow className='tablehead'>
                                                                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">NAME</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">ADDRESS</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">LAST VISIT</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">PHONE</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">ACTION</CTableHeaderCell>
                                                                </CTableRow>
                                                            </CTableHead>
                                                            <CTableBody>
                                                                <CTableRow className='ctable-row'>
                                                                    <CTableDataCell align="middle">00001</CTableDataCell>
                                                                    <CTableDataCell>ASSESS Nourah</CTableDataCell>
                                                                    <CTableDataCell>Houeyiho 1 carre 1104</CTableDataCell>
                                                                    <CTableDataCell>04 Sep 2019</CTableDataCell>
                                                                    <CTableDataCell >+229 90 00 00 00</CTableDataCell>
                                                                    <CTableDataCell ><a className='openfilepatient'><BsArrowUpLeft />
                                                                        Open patient file</a></CTableDataCell>
                                                                </CTableRow>
                                                                <CTableRow className='ctable-row'>
                                                                    <CTableDataCell align="middle">00001</CTableDataCell>
                                                                    <CTableDataCell>ASSESS Nourah</CTableDataCell>
                                                                    <CTableDataCell>Houeyiho 1 carre 1104</CTableDataCell>
                                                                    <CTableDataCell>04 Sep 2019</CTableDataCell>
                                                                    <CTableDataCell >+229 90 00 00 00</CTableDataCell>
                                                                    <CTableDataCell ><a className='openfilepatient'><BsArrowUpLeft />
                                                                        Open patient file</a></CTableDataCell>
                                                                </CTableRow>
                                                                <CTableRow className='ctable-row'>
                                                                    <CTableDataCell align="middle">00001</CTableDataCell>
                                                                    <CTableDataCell>ASSESS Nourah</CTableDataCell>
                                                                    <CTableDataCell>Houeyiho 1 carre 1104</CTableDataCell>
                                                                    <CTableDataCell>04 Sep 2019</CTableDataCell>
                                                                    <CTableDataCell >+229 90 00 00 00</CTableDataCell>
                                                                    <CTableDataCell ><a className='openfilepatient'><BsArrowUpLeft />
                                                                        Open patient file</a></CTableDataCell>
                                                                </CTableRow>
                                                                <CTableRow className='ctable-row'>
                                                                    <CTableDataCell align="middle">00001</CTableDataCell>
                                                                    <CTableDataCell>ASSESS Nourah</CTableDataCell>
                                                                    <CTableDataCell>Houeyiho 1 carre 1104</CTableDataCell>
                                                                    <CTableDataCell>04 Sep 2019</CTableDataCell>
                                                                    <CTableDataCell >+229 90 00 00 00</CTableDataCell>
                                                                    <CTableDataCell ><a className='openfilepatient'><BsArrowUpLeft />
                                                                        Open patient file</a></CTableDataCell>
                                                                </CTableRow>
                                                                <CTableRow className='ctable-row'>
                                                                    <CTableDataCell align="middle">00001</CTableDataCell>
                                                                    <CTableDataCell>ASSESS Nourah</CTableDataCell>
                                                                    <CTableDataCell>Houeyiho 1 carre 1104</CTableDataCell>
                                                                    <CTableDataCell>04 Sep 2019</CTableDataCell>
                                                                    <CTableDataCell >+229 90 00 00 00</CTableDataCell>
                                                                    <CTableDataCell ><a className='openfilepatient'><BsArrowUpLeft />
                                                                        Open patient file</a></CTableDataCell>
                                                                </CTableRow>
                                                                <CTableRow className='ctable-row'>
                                                                    <CTableDataCell align="middle">00001</CTableDataCell>
                                                                    <CTableDataCell>ASSESS Nourah</CTableDataCell>
                                                                    <CTableDataCell>Houeyiho 1 carre 1104</CTableDataCell>
                                                                    <CTableDataCell>04 Sep 2019</CTableDataCell>
                                                                    <CTableDataCell >+229 90 00 00 00</CTableDataCell>
                                                                    <CTableDataCell ><a className='openfilepatient'><BsArrowUpLeft />
                                                                        Open patient file</a></CTableDataCell>
                                                                </CTableRow>
                                                                <CTableRow className='ctable-row'>
                                                                    <CTableDataCell align="middle">00001</CTableDataCell>
                                                                    <CTableDataCell>ASSESS Nourah</CTableDataCell>
                                                                    <CTableDataCell>Houeyiho 1 carre 1104</CTableDataCell>
                                                                    <CTableDataCell>04 Sep 2019</CTableDataCell>
                                                                    <CTableDataCell >+229 90 00 00 00</CTableDataCell>
                                                                    <CTableDataCell ><a className='openfilepatient'><BsArrowUpLeft />
                                                                        Open patient file</a></CTableDataCell>
                                                                </CTableRow>
                                                            </CTableBody>
                                                        </CTable>
                                                    </div>
                                                </div>
                                            </CTabPanel>
                                            <CTabPanel className="p-3" itemKey="Receptionist">

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
