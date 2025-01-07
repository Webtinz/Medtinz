import React, { useState,useEffect } from 'react';
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
import { BsPersonPlus, BsChevronRight, BsEye, BsTrash3 } from 'react-icons/bs';
import * as icon from '@coreui/icons';
import CIcon from '@coreui/icons-react'
import '../../../assets/css/mainstyle.css';

const getUserIdFromToken = () => {
    const token = localStorage.getItem('access_token'); // Récupérer le token depuis le localStorage
    if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Décoder le payload du JWT
        return decodedToken.userId; // Retourner l'ID de l'utilisateur (assurez-vous que c'est bien ce qui est stocké dans le token)
    }
    return null; // Retourne null si aucun token n'est présent
};

const Department = () => {
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [hospitals, setHospitals] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        hospitalId: '', // Added for the hospital selection
    });

    const userId = getUserIdFromToken(); // Récupérer l'ID de l'utilisateur à partir du token
    console.log(userId);
    
    // Fonction pour récupérer la liste des hôpitaux pour l'administrateur
    useEffect(() => {
        const fetchHospitals = async () => {
            if (!userId) {
                console.log('Utilisateur non authentifié');
                setMessage('Utilisateur non authentifié.');
                return;
            }
            try {
                const response = await axios.get(`http://localhost:5000/api/hospitals/admin/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200) {
                    console.log("Réponse des hôpitaux:", response.data);
                    setHospitals(response.data); // Sauvegarder les hôpitaux dans l'état
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des hôpitaux:', error);
                setMessage('Erreur lors de la récupération des hôpitaux.');
            }
        };
    
        if (userId) {
            fetchHospitals();
        }
    }, [userId]); // Dépendance sur userId pour recharger si nécessaire
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission
        console.log(formData);
        // Make API call to register the department
    };

    return (
        <div className="dashboard-header" >
            <CHeader position="sticky" style={{ backgroundColor: '#DFEAF5' }}>
                <CContainer fluid className="d-flex align-items-center">
                    {/* Barre de recherche */}
                    <div className="pagetittle">
                        <h4><b>Department Management</b></h4>
                        <p>Home <BsChevronRight className='mx-2' style={{ fontSize: "12px" }} />  Dashboard <BsChevronRight style={{ fontSize: "12px" }} className='mx-2' />  <span style={{ color: '#191B1C' }}>Department Management</span></p>
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
                                            <h4>Add Department</h4>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="name">Department Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Department Name"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="hospitalId">Hospital</label>
                                                <select
                                                    name="hospitalId"
                                                    id="hospitalId"
                                                    value={formData.hospitalId}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Hospital</option>
                                                    {hospitals.map((hospital) => (
                                                        <option key={hospital._id} value={hospital._id}>
                                                            {hospital.hospital_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <textarea
                                                    type="text"
                                                    name="description"
                                                    id="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    placeholder="Description"
                                                />
                                            </div>

                                            <div className="form-group d-flex justify-content-center">
                                                <CButton type="submit" className="ms-auto d-flex align-items-center">
                                                    <BsPersonPlus className='mx-2' /> Register New Department
                                                </CButton>
                                            </div>
                                        </form>
                                    </section>

                                    <section className='listdepartment'>
                                        <div className='d-flex align-items-center cardheader'>
                                            <span className='me-3' style={{ width: '70px', height: '5px', background: '#0056B3' }}></span>
                                            <h4>Departments List</h4>
                                        </div>
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
                                            <CTable className="mt-3 " align="middle" responsive>
                                                <CTableBody>
                                                    <CTableRow className='ctable-row'>
                                                        <CTableHeaderCell align="middle">
                                                            <img src="src/assets/images/Group 174.png" className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                                                        </CTableHeaderCell>
                                                        <CTableDataCell>Dermatology</CTableDataCell>
                                                        <CTableDataCell>This is the description of the department. This is the description of the department. This is the description of the department</CTableDataCell>
                                                        <CTableDataCell>4 Doctors <BsEye style={{ color: '#0056B3' }} /></CTableDataCell>
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
                                                            <CModal
                                                                alignment="center"
                                                                visible={visible1}
                                                                onClose={() => setVisible1(false)}
                                                                aria-labelledby="TooltipsAndPopoverExample"
                                                            >
                                                                <CModalHeader>
                                                                    <CModalTitle id="TooltipsAndPopoverExample">Modal title</CModalTitle>
                                                                </CModalHeader>
                                                                <CModalBody>
                                                                    <h5>Popover in a modal</h5>
                                                                    <hr />
                                                                    <h5>Tooltips in a modal</h5>
                                                                </CModalBody>
                                                            </CModal>
                                                        </CTableDataCell>
                                                    </CTableRow>
                                                    <CTableRow className='ctable-row'>
                                                        <CTableHeaderCell align="middle">
                                                            <img src="src/assets/images/Group 174.png" className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                                                        </CTableHeaderCell>
                                                        <CTableDataCell>Dermatology</CTableDataCell>
                                                        <CTableDataCell>This is the description of the department. This is the description of the department. This is the description of the department</CTableDataCell>
                                                        <CTableDataCell>4 Doctors <BsEye style={{ color: '#0056B3' }} /></CTableDataCell>
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
                                                            <CModal
                                                                alignment="center"
                                                                visible={visible1}
                                                                onClose={() => setVisible1(false)}
                                                                aria-labelledby="TooltipsAndPopoverExample"
                                                            >
                                                                <CModalHeader>
                                                                    <CModalTitle id="TooltipsAndPopoverExample">Modal title</CModalTitle>
                                                                </CModalHeader>
                                                                <CModalBody>
                                                                    <h5>Popover in a modal</h5>
                                                                    <hr />
                                                                    <h5>Tooltips in a modal</h5>
                                                                </CModalBody>
                                                            </CModal>
                                                        </CTableDataCell>
                                                    </CTableRow>
                                                </CTableBody>
                                            </CTable>
                                        </div>
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

export default Department;
