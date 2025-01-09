import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
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
} from '@coreui/react'
import { FaEdit, FaArrowLeft, FaSearch } from "react-icons/fa";
import { BsPersonPlus, BsChevronRight, BsEye, BsTrash3 } from 'react-icons/bs';
import '../../../assets/css/mainstyle.css';
import Adminprofil from '../../../assets/images/adminprofil.png';

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
    const [departments, setDepartments] = useState([]); // State to store departments
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        hospitalId: '', // Added for the hospital selection
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const userId = getUserIdFromToken(); // Récupérer l'ID de l'utilisateur à partir du token

    // Function to fetch hospitals for the admin
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
                    setHospitals(response.data); // Save hospitals to state
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des hôpitaux:', error);
                setMessage('Erreur lors de la récupération des hôpitaux.');
            }
        };

        if (userId) {
            fetchHospitals();
        }
    }, [userId]); // Dependency on userId to reload if necessary

    // Function to fetch departments dynamically
    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/myhospitaldepartments', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            setDepartments(response.data.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des départements:', error);
            setMessage('Erreur lors de la récupération des départements.');
        }
    };

    // Fetch departments when the component is mounted
    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.description || !formData.hospitalId) {
            console.error('Tous les champs sont requis.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/adddepartment', {
                name: formData.name,
                description: formData.description,
                hospital_id: formData.hospitalId
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            console.log('Département créé avec succès:', response.data);
            setMessage('Département créé avec succès!');
            setMessageType('success');
            fetchDepartments(); // Reload the departments list
            setFormData({
                name: '',
                description: '',
                hospitalId: ''
            }); // Reset the form
        } catch (error) {
            console.error('Erreur lors de la création du département:', error);
            setMessage('Erreur lors de la création du département.');
            setMessageType('error');
        }
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
                        <div className=' d-flex col justify-content-end'>
                            <CHeaderNav>
                                <CNavItem>
                                    <CNavLink href="#" className="d-flex align-items-center ms-auto">
                                        <img src={Adminprofil} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                                        <div>
                                            <span className="ms-2">Semia BOKO</span>
                                            <p className="ms-2">Admin</p>
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
                                {message && (
                                    <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`}>
                                        {message}
                                    </div>
                                )}
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
                                                    <BsPersonPlus className='mx-2' /> Add Department
                                                </CButton>
                                            </div>
                                        </form>
                                    </section>

                                    {/* List of Departments */}
                                    <section className='listdepartment'>
                                        <div className='d-flex align-items-center cardheader'>
                                            <span className='me-3' style={{ width: '70px', height: '5px', background: '#0056B3' }}></span>
                                            <h4>Departments List</h4>
                                        </div>
                                        <div>
                                            <CTable className="mt-3" align="middle" responsive>
                                                <CTableBody>
                                                    {departments.length > 0 ? (
                                                        departments.map(department => (
                                                            <CTableRow className='ctable-row' key={department._id}>
                                                                <CTableHeaderCell align="middle">
                                                                    <img src="src/assets/images/Group 174.png" className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                                                                </CTableHeaderCell>
                                                                <CTableDataCell>{department.name}</CTableDataCell>
                                                                <CTableDataCell>{department.description}</CTableDataCell>
                                                                <CTableDataCell>4 Doctors <BsEye style={{ color: '#0056B3' }} /></CTableDataCell>
                                                                <CTableDataCell align="middle">
                                                                    <div className='actionbtn'>
                                                                        <div className='left'>
                                                                            <BsEye onClick={() => console.log('View department')} />
                                                                        </div>
                                                                        <div className='right'>
                                                                            <BsTrash3 onClick={() => console.log('Delete department')} style={{ color: '#EF3826' }} />
                                                                        </div>
                                                                    </div>
                                                                </CTableDataCell>
                                                            </CTableRow>
                                                        ))
                                                    ) : (
                                                        <CTableRow>
                                                            <CTableDataCell colSpan="5">No departments available.</CTableDataCell>
                                                        </CTableRow>
                                                    )}
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
