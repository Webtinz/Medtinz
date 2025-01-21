import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddAppointmentModal from '../appointmentmanagment/addappointment'; // Le composant modal
import {
    CButton,
    CRow,
    CCol,
    CCard,
    CCardBody,
    CHeader, CContainer, CHeaderNav, CNavItem, CNavLink,
} from '@coreui/react';
import { FaArrowLeft } from "react-icons/fa";
import { BsPersonPlus, BsChevronRight } from 'react-icons/bs';
import '../../../assets/css/mainstyle.css';
import axios from 'axios';

import Adminprofil from '../../../assets/images/adminprofil.png';
import folderempty from '../../../assets/images/Group 207.png';

const Patientfilemedical = () => {
    const [visible, setVisible] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [ticket, setticket] = useState(false);
    const { patientId } = useParams(); // Récupère l'ID du patient depuis l'URL
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Définissez la fonction navigate

    useEffect(() => {
        // Charge les données du patient
        const fetchPatientData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/clinic/getpatients/${patientId}`);
                setPatientData(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données du patient:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPatientData();
    }, [patientId]);

    if (loading) {
        return <p>Chargement...</p>;
    }

    const handleAppointmentAdded = (newAppointment) => {
        setAppointments((prev) => [...prev, newAppointment]);
    };

    return (
        <div className="dashboard-header" >
            <CHeader position="sticky" style={{ backgroundColor: '#DFEAF5' }}>
                <CContainer fluid className="d-flex align-items-center">
                    <div className='row w-100'>
                        {/* Barre de recherche */}
                        <div className="pagetittle col">
                            <h4><b>Patient Management</b></h4>
                            <p>Home <BsChevronRight className='mx-2' style={{ fontSize: "12px" }} />  Dashboard <BsChevronRight style={{ fontSize: "12px" }} className='mx-2' />  <span style={{ color: '#191B1C' }}>Patient Management</span></p>
                        </div>
                        {/* Profil utilisateur */}

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


            <div className="Patientlist filemedical mt-2"  >
                <div className='tabsection'>
                    <CRow>
                        <CCol xs={12}>
                            <CCard className="card mb-4 p-4">
                                <CCardBody>
                                    <div className='topbtn'>
                                        <div className="retourbtn">
                                            <CButton className="retourbtn" onClick={() => (navigate(-1) || navigate('/'))}>
                                                <FaArrowLeft /> Retour
                                            </CButton>
                                        </div>

                                        <div className='registeruserbtn ms-auto'>
                                            <CButton onClick={() => setVisible(!visible)} className="registernewbtn ms-auto d-flex align-items-center" active tabIndex={-1}>
                                                <BsPersonPlus className='mx-2' /> New Appointment
                                            </CButton>
                                        </div>
                                    </div>

                                    <AddAppointmentModal
                                        visible={visible}
                                        onClose={() => setVisible(false)}
                                        onAppointmentAdded={handleAppointmentAdded} patientId={patientId} patientName={patientData.name}
                                    />

                                    <div className='patientdetails'>
                                        <div className='d-flex align-items-center cardheader mb-5'>
                                            <span className='me-3' style={{ width: '70px', height: '5px', background: 'green' }}></span>
                                            <h4>Medical history</h4>
                                        </div>

                                        {patientData ? (
                                            <CRow className="my-3 patientinfo mb-5">
                                                <CCol xs={12} md={2}>
                                                    <div className="flexcoldisposition">
                                                        <p>Name :</p>
                                                        <p><b>{patientData.name}</b></p>
                                                    </div>
                                                </CCol>
                                                <CCol xs={12} md={2}>
                                                    <div className="flexcoldisposition">
                                                        <p>Email : </p>
                                                        <p><b>{patientData.email}</b></p>
                                                    </div>
                                                </CCol>
                                                <CCol xs={12} md={2}>
                                                    <div className="flexcoldisposition">
                                                        <p>Date of birth: </p>
                                                        <p><b>{patientData.age.split("T")[0]}</b></p>
                                                    </div>
                                                </CCol>
                                                <CCol xs={12} md={2}>
                                                    <div className="flexcoldisposition">
                                                        <p>Address : </p>
                                                        <p><b>{patientData.address}</b></p>
                                                    </div>
                                                </CCol>
                                                <CCol xs={12} md={2}>
                                                    <div className="flexcoldisposition">
                                                        <p>Gender :</p>
                                                        <p><b>{patientData.gender}</b></p>
                                                    </div>
                                                </CCol>
                                            </CRow>

                                        ) : (
                                            <p>No data available</p>
                                        )}
                                    </div>
                                    <div className='mt-5'>
                                        <div className='d-flex align-items-center cardheader'>
                                            <span className='me-3' style={{ width: '70px', height: '5px', background: 'green' }}></span>
                                            <h4>Medical history</h4>
                                        </div>

                                        {patientData?.medicalHistory && patientData.medicalHistory.length > 0 ? (
                                            // Affichez la liste des antécédents médicaux si disponible
                                            <div className='medical-history-list'>
                                                {patientData.medicalHistory.map((history, index) => (
                                                    <div key={index} className='history-item'>
                                                        <p><strong>Condition:</strong> {history.condition || 'N/A'}</p>
                                                        <p><strong>Description:</strong> {history.description || 'No description'}</p>
                                                        <p><strong>Date Diagnosed:</strong> {history.dateDiagnosed ? new Date(history.dateDiagnosed).toLocaleDateString() : 'Unknown'}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            // Affichez la div alternative si pas d'antécédents médicaux
                                            <div className='d-flex align-items-center justify-content-center' style={{ height: '300px' }}>
                                                <h4>No medical history yet</h4>
                                                <img src={folderempty} className='cardicon' alt="Consultation Icon" width={'100'} height={'100'} />
                                            </div>
                                        )}
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

export default Patientfilemedical;
