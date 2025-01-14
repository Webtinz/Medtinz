import React, { useState } from 'react';
import {
    CButton,
    CRow,
    CCol,
    CCard,
    CCardBody,
    CTab,
    CTabContent,
    CTabList,
    CTabPanel,
    CTabs,
    CHeader, CContainer, CHeaderNav, CNavItem, CNavLink,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from '@coreui/react'
import { FaEdit, FaSearch } from "react-icons/fa";
import { BsPersonPlus, BsChevronRight, BsChevronLeft, BsTrash3 } from 'react-icons/bs';
import '../../../assets/css/mainstyle.css';
import Doctorvector from '../../../assets/images/doctorvector.png';
import Adminprofil from '../../../assets/images/adminprofil.png';
import AddStaffModal from './adduserstaff'; // Le composant modal

const StaffList = () => {
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [Staffs, setStaffs] = useState([]);

    const handleStaffAdded = (newStaff) => {
        setStaffs((prev) => [...prev, newStaff]);
    };

    return (
        <div className="dashboard-header" >
            <CHeader position="sticky" style={{ backgroundColor: '#DFEAF5' }}>
                <CContainer fluid className="d-flex align-items-center">
                    <div className='row w-100'>
                        <div className="pagetittle col">
                            <h4><b>Staff Management</b></h4>
                            <p>Home <BsChevronRight className='mx-2' style={{ fontSize: "12px" }} />  Dashboard <BsChevronRight style={{ fontSize: "12px" }} className='mx-2' />  <span style={{ color: '#191B1C' }}>Staff Management</span></p>
                        </div>
                        <div className=' d-flex col justify-content-end' >
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
                                                    <div className='d-flex mt-4'>
                                                        <CButton onClick={() => setVisible(true)} className="registernewbtn ms-auto d-flex align-items-center" active tabIndex={-1}>
                                                            <BsPersonPlus className='mx-2' /> Register New user
                                                        </CButton>
                                                    </div>
                                                    <AddStaffModal
                                                        visible={visible}
                                                        onClose={() => setVisible(false)}
                                                        onPatientAdded={handleStaffAdded}
                                                    />

                                                    <div className="search-container">
                                                        <div className="search-bar">
                                                            <FaSearch
                                                                size="sm"
                                                                className="search-icon" style={{ width: '20px', height: '20px' }} />
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
                                                                    <CTableDataCell align="middle">
                                                                        <img src={Doctorvector} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                                                                    </CTableDataCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableDataCell align="middle"><span className='coloredsucess'>Active</span></CTableDataCell>
                                                                    <CTableDataCell align="middle" >
                                                                        <div className='actionbtn'>
                                                                            <div className='left'>
                                                                                <FaEdit />
                                                                            </div>
                                                                            <div className='right'>
                                                                                <BsTrash3  style={{ color: '#EF3826' }} />
                                                                            </div>
                                                                        </div>
                                                                    </CTableDataCell>
                                                                </CTableRow>
                                                                <CTableRow className=''>
                                                                    <CTableDataCell align="middle"><img src={Doctorvector} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableDataCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableDataCell align="middle" ><span className='coloredsucess'>Active</span></CTableDataCell>
                                                                    <CTableDataCell align="middle" >
                                                                        <div className='actionbtn'>
                                                                            <div className='left'>
                                                                                <FaEdit />
                                                                            </div>
                                                                            <div className='right'>
                                                                                <BsTrash3  style={{ color: '#EF3826' }} />
                                                                            </div>
                                                                        </div>
                                                                    </CTableDataCell>                                                                </CTableRow>
                                                                <CTableRow className=''>
                                                                    <CTableDataCell align="middle"><img src={Doctorvector} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableDataCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableDataCell align="middle" ><span className='coloredechec'>Not Active</span></CTableDataCell>
                                                                    <CTableDataCell align="middle" >
                                                                        <div className='actionbtn'>
                                                                            <div className='left'>
                                                                                <FaEdit />
                                                                            </div>
                                                                            <div className='right'>
                                                                                <BsTrash3  style={{ color: '#EF3826' }} />
                                                                            </div>
                                                                        </div>
                                                                    </CTableDataCell>
                                                                </CTableRow>
                                                            </CTableBody>
                                                        </CTable>
                                                    </div>
                                                </div>
                                            </CTabPanel>
                                            <CTabPanel className="p-3" itemKey="Receptionist">
                                                <div className='tablist' >
                                                    <div className='d-flex mt-4'>
                                                        <CButton onClick={() => setVisible(true)} className="registernewbtn ms-auto d-flex align-items-center" active tabIndex={-1}>
                                                            <BsPersonPlus className='mx-2' /> Register New user
                                                        </CButton>
                                                    </div>
                                                    <AddStaffModal
                                                        visible={visible}
                                                        onClose={() => setVisible(false)}
                                                        onPatientAdded={handleStaffAdded}
                                                    />

                                                    <div className="search-container">
                                                        <div className="search-bar">
                                                            <FaSearch
                                                                size="sm"
                                                                className="search-icon" style={{ width: '20px', height: '20px' }} />
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
                                                                    <CTableDataCell align="middle">
                                                                        <img src={Doctorvector} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                                                                    </CTableDataCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableDataCell align="middle"><span className='coloredsucess'>Active</span></CTableDataCell>
                                                                    <CTableDataCell align="middle" >
                                                                        <div className='actionbtn'>
                                                                            <div className='left'>
                                                                                <FaEdit />
                                                                            </div>
                                                                            <div className='right'>
                                                                                <BsTrash3  style={{ color: '#EF3826' }} />
                                                                            </div>
                                                                        </div>
                                                                    </CTableDataCell>
                                                                </CTableRow>
                                                                <CTableRow className=''>
                                                                    <CTableDataCell align="middle"><img src={Doctorvector} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableDataCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableDataCell align="middle" ><span className='coloredsucess'>Active</span></CTableDataCell>
                                                                    <CTableDataCell align="middle" >
                                                                        <div className='actionbtn'>
                                                                            <div className='left'>
                                                                                <FaEdit />
                                                                            </div>
                                                                            <div className='right'>
                                                                                <BsTrash3  style={{ color: '#EF3826' }} />
                                                                            </div>
                                                                        </div>
                                                                    </CTableDataCell>                                                                </CTableRow>
                                                                <CTableRow className=''>
                                                                    <CTableDataCell align="middle"><img src={Doctorvector} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableDataCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableDataCell align="middle" ><span className='coloredechec'>Not Active</span></CTableDataCell>
                                                                    <CTableDataCell align="middle" >
                                                                        <div className='actionbtn'>
                                                                            <div className='left'>
                                                                                <FaEdit />
                                                                            </div>
                                                                            <div className='right'>
                                                                                <BsTrash3  style={{ color: '#EF3826' }} />
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
                                                        <CButton onClick={() => setVisible(true)} className="registernewbtn ms-auto d-flex align-items-center" active tabIndex={-1}>
                                                            <BsPersonPlus className='mx-2' /> Register New user
                                                        </CButton>
                                                    </div>
                                                    <AddStaffModal
                                                        visible={visible}
                                                        onClose={() => setVisible(false)}
                                                        onPatientAdded={handleStaffAdded}
                                                    />

                                                    <div className="search-container">
                                                        <div className="search-bar">
                                                            <FaSearch
                                                                size="sm"
                                                                className="search-icon" style={{ width: '20px', height: '20px' }} />
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
                                                                    <CTableDataCell align="middle">
                                                                        <img src={Doctorvector} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                                                                    </CTableDataCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableDataCell align="middle"><span className='coloredsucess'>Active</span></CTableDataCell>
                                                                    <CTableDataCell align="middle" >
                                                                        <div className='actionbtn'>
                                                                            <div className='left'>
                                                                                <FaEdit />
                                                                            </div>
                                                                            <div className='right'>
                                                                                <BsTrash3  style={{ color: '#EF3826' }} />
                                                                            </div>
                                                                        </div>
                                                                    </CTableDataCell>
                                                                </CTableRow>
                                                                <CTableRow className=''>
                                                                    <CTableDataCell align="middle"><img src={Doctorvector} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableDataCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableDataCell align="middle" ><span className='coloredsucess'>Active</span></CTableDataCell>
                                                                    <CTableDataCell align="middle" >
                                                                        <div className='actionbtn'>
                                                                            <div className='left'>
                                                                                <FaEdit />
                                                                            </div>
                                                                            <div className='right'>
                                                                                <BsTrash3  style={{ color: '#EF3826' }} />
                                                                            </div>
                                                                        </div>
                                                                    </CTableDataCell>                                                                </CTableRow>
                                                                <CTableRow className=''>
                                                                    <CTableDataCell align="middle"><img src={Doctorvector} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} /></CTableDataCell>
                                                                    <CTableDataCell>Sabine MoMo</CTableDataCell>
                                                                    <CTableDataCell>Receptionist</CTableDataCell>
                                                                    <CTableDataCell>Cardiologic</CTableDataCell>
                                                                    <CTableDataCell align="middle" ><span className='coloredechec'>Not Active</span></CTableDataCell>
                                                                    <CTableDataCell align="middle" >
                                                                        <div className='actionbtn'>
                                                                            <div className='left'>
                                                                                <FaEdit />
                                                                            </div>
                                                                            <div className='right'>
                                                                                <BsTrash3  style={{ color: '#EF3826' }} />
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

export default StaffList;
