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
import CIcon from '@coreui/icons-react'
import '../../../../assets/css/mainstyle.css';

const PatientList = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div className="dashboard-header" >
            <CHeader position="sticky" style={{ backgroundColor: '#DFEAF5' }}>
                <CContainer fluid className="d-flex align-items-center">
                    {/* Barre de recherche */}
                    <div className="pagetittle">
                        <h4><b>Patient Management</b></h4>
                        <p>Home &gt; Dashboard &gt; <span style={{ color: '#191B1C' }}>Patient Management</span></p>
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

            <div className="Patientlist mt-5" >
                <div className='tabsection'>
                    <CRow>
                        <CCol xs={12}>
                            <CCard className="mb-4">
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
                                                    <div className='d-flex mt-4'>
                                                        <CButton onClick={() => setVisible(!visible)} className="registernewbtn ms-auto" active tabIndex={-1}>
                                                            Register New user
                                                        </CButton>
                                                    </div>

                                                    {/* modal */}

                                                    <CModal
                                                        alignment="center"
                                                        scrollable
                                                        visible={visible}
                                                        onClose={() => setVisible(false)}
                                                        aria-labelledby="VerticallyCenteredScrollableExample2"
                                                    >
                                                        <CModalHeader>
                                                            <CModalTitle id="VerticallyCenteredScrollableExample2">Modal title</CModalTitle>
                                                        </CModalHeader>
                                                        <CModalBody>
                                                            <p>
                                                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                                                                in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                                            </p>
                                                            <p>
                                                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
                                                                vel augue laoreet rutrum faucibus dolor auctor.
                                                            </p>
                                                            <p>
                                                                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                                                                scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                                                                auctor fringilla.
                                                            </p>
                                                            <p>
                                                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                                                                in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                                            </p>
                                                            <p>
                                                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
                                                                vel augue laoreet rutrum faucibus dolor auctor.
                                                            </p>
                                                        </CModalBody>
                                                        <CModalFooter>
                                                            <CButton color="secondary" onClick={() => setVisible(false)}>
                                                                Close
                                                            </CButton>
                                                            <CButton color="primary">Save changes</CButton>
                                                        </CModalFooter>
                                                    </CModal>

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
                                                    <div>
                                                        <CTable hover className='mt-5'>
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
                                                                <CTableRow className=''>
                                                                    <CTableHeaderCell><img src="src\assets\images\doctorvector.png" className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableHeaderCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableHeaderCell ><span className='coloredsucess'>Active</span></CTableHeaderCell>
                                                                    <CTableDataCell>Mark</CTableDataCell>
                                                                </CTableRow>
                                                                <CTableRow className=''>
                                                                    <CTableHeaderCell><img src="src\assets\images\doctorvector.png" className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableHeaderCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableHeaderCell ><span className='coloredsucess'>Active</span></CTableHeaderCell>
                                                                    <CTableDataCell>Mark</CTableDataCell>
                                                                </CTableRow>
                                                                <CTableRow className=''>
                                                                    <CTableHeaderCell><img src="src\assets\images\doctorvector.png" className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableHeaderCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableHeaderCell ><span className='coloredsucess'>Active</span></CTableHeaderCell>
                                                                    <CTableDataCell>Mark</CTableDataCell>
                                                                </CTableRow>
                                                            </CTableBody>
                                                        </CTable>
                                                    </div>
                                                </div>
                                            </CTabPanel>
                                            <CTabPanel className="p-3" itemKey="Receptionist">
                                                <div className='tablist' >
                                                    <Link to="" className='d-flex mt-4'>
                                                        <CButton className="registernewbtn ms-auto" active tabIndex={-1}>
                                                            Register New user
                                                        </CButton>
                                                    </Link>
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
                                                    <div>
                                                        <CTable hover className='mt-5'>
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
                                                                    <CTableHeaderCell className="ctable-cell">
                                                                        <img src="src/assets/images/doctorvector.png" className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                                                                    </CTableHeaderCell>
                                                                    <CTableDataCell className="ctable-cell">Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell className="ctable-cell">Receptionist</CTableDataCell>
                                                                    <CTableDataCell className="ctable-cell">Cardiologic</CTableDataCell>
                                                                    <CTableHeaderCell className="ctable-cell"><span className='coloredsucess'>Active</span></CTableHeaderCell>
                                                                    <CTableDataCell className="ctable-cell">Mark</CTableDataCell>
                                                                </CTableRow>
                                                                <CTableRow className=''>
                                                                    <CTableHeaderCell><img src="src\assets\images\doctorvector.png" className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableHeaderCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableHeaderCell ><span className='coloredsucess'>Active</span></CTableHeaderCell>
                                                                    <CTableDataCell>Mark</CTableDataCell>
                                                                </CTableRow>
                                                                <CTableRow className=''>
                                                                    <CTableHeaderCell><img src="src\assets\images\doctorvector.png" className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableHeaderCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableHeaderCell ><span className='coloredechec'>Active</span></CTableHeaderCell>
                                                                    <CTableDataCell>Mark</CTableDataCell>
                                                                </CTableRow>
                                                            </CTableBody>
                                                        </CTable>
                                                    </div>
                                                </div>
                                            </CTabPanel>
                                            <CTabPanel className="p-3" itemKey="Doctors">
                                                <div className='tablist' >
                                                    <Link to="" className='d-flex mt-4'>
                                                        <CButton className="registernewbtn ms-auto" active tabIndex={-1}>
                                                            Register New user
                                                        </CButton>
                                                    </Link>
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
                                                    <div>
                                                        <CTable hover className='mt-5'>
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
                                                                <CTableRow className=''>
                                                                    <CTableHeaderCell><img src="src\assets\images\doctorvector.png" className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableHeaderCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableHeaderCell ><span className='coloredsucess'>Active</span></CTableHeaderCell>
                                                                    <CTableDataCell>Mark</CTableDataCell>
                                                                </CTableRow>
                                                                <CTableRow className=''>
                                                                    <CTableHeaderCell><img src="src\assets\images\doctorvector.png" className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableHeaderCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableHeaderCell ><span className='coloredsucess'>Active</span></CTableHeaderCell>
                                                                    <CTableDataCell>Mark</CTableDataCell>
                                                                </CTableRow>
                                                                <CTableRow className=''>
                                                                    <CTableHeaderCell><img src="src\assets\images\doctorvector.png" className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableHeaderCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableHeaderCell ><span className='coloredsucess'>Active</span></CTableHeaderCell>
                                                                    <CTableDataCell>Mark</CTableDataCell>
                                                                </CTableRow>
                                                            </CTableBody>
                                                        </CTable>
                                                    </div>
                                                </div>
                                            </CTabPanel>
                                        </CTabContent>
                                    </CTabs>
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
