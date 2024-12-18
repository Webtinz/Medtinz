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
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import { BsPersonPlus, BsChevronRight, BsEye, BsTrash3} from 'react-icons/bs';
import * as icon from '@coreui/icons';
import CIcon from '@coreui/icons-react'
import '../../assets/css/mainstyle.css';

const Speciality = () => {
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
                        <h4><b>Speciality Management</b></h4>
                        <p>Home <BsChevronRight className='mx-2' style={{ fontSize: "12px" }} />  Dashboard <BsChevronRight style={{ fontSize: "12px" }} className='mx-2' />  <span style={{ color: '#191B1C' }}>Speciality Management</span></p>
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
                                    <section className='adddepartment newregistermodal'>
                                        <div className='d-flex align-items-center cardheader'>
                                            <span className='me-3' style={{ width: '70px', height: '5px', background: '#0056B3' }}></span>
                                            <h4>Add Speciality</h4>
                                        </div>
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

                                            <div className="form-group ">
                                                <textarea
                                                    type="text"
                                                    name="description"
                                                    id="description"
                                                    placeholder="Description"
                                                />
                                            </div>

                                            <div className="form-group d-flex justify-content-center">
                                                <CButton type='submit' className="ms-auto d-flex align-items-center" active tabIndex={-1}>
                                                    <BsPersonPlus className='mx-2' /> Add new speciality
                                                </CButton>
                                            </div>
                                        </form>
                                    </section>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </div>
            </div>
        </div >


    );
}

export default Speciality;
