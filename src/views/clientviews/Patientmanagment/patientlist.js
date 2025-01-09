import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import AddPatientModal from './addPatient'; // Le composant modal

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
import { FaRedoAlt, FaExchangeAlt, FaFilter, FaSearch } from "react-icons/fa";
import { BsPersonPlus, BsChevronRight, BsChevronLeft, BsArrowUpLeft } from 'react-icons/bs';
import '../../../assets/css/mainstyle.css';
import '../../../assets/css/ClientSidebar.css';

import Adminprofil from '../../../assets/images/adminprofil.png';

const PatientList = () => {
    const [visible, setVisible] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalPatients, setTotalPatients] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const limit = 10; // Nombre de patients par page

    // Fonction pour ouvrir le modal et définir le contenu
    // const handleIconClick = (content) => {
    //     setModalContent(content);  // Définit le contenu du modal
    //     setVisible1(true);  // Ouvre le modal
    // };

    // GEt patients list
    const fetchPatients = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/clinic/patients?page=${page}&limit=${limit}`);
            setPatients(response.data.patients);
            setTotalPages(response.data.totalPages);
            setTotalPatients(response.data.totalPatients);
            setCurrentPage(response.data.currentPage);
        } catch (error) {
            console.error('Erreur lors de la récupération des patients:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/clinic/getAppointmentlist');
                console.log('API Response:', response.data); // Vérifiez ce que l'API retourne
                setAppointments(response.data); // Mettre à jour les données des rendez-vous
            } catch (error) {
                console.error('Error fetching appointments:', error);
                alert('Failed to fetch appointments');
            }
        };

        fetchAppointments();
    }, []);



    // search

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (!value) {
            // Si le champ est vide, rechargez la liste complète
            fetchPatients(currentPage);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/clinic/patients/searchpatient`, {
                params: { name: value, id: value, phone: value },
            });
            setPatients(response.data);
        } catch (error) {
            console.error('Erreur lors de la recherche des patients:', error);
            setPatients([]); // Vide la liste en cas d'erreur
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients(currentPage); // Récupère les données de la page actuelle au chargement
    }, [currentPage]);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
    };

    const handlePatientAdded = (newPatient) => {
        setPatients((prev) => [...prev, newPatient]);
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
                                                                <FaSearch size="sm" className="search-icon" style={{ width: '20px', height: '20px' }} />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search for a patient (Enter ID, name or Tel)"
                                                                    value={searchTerm}
                                                                    onChange={handleSearchChange}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='registeruserbtn ms-auto'>
                                                            <CButton onClick={() => setVisible(true)} className="registernewbtn ms-auto d-flex align-items-center" active tabIndex={-1}>
                                                                <BsPersonPlus className='mx-2' /> Register New patient
                                                            </CButton>
                                                        </div>
                                                    </div>
                                                    <AddPatientModal
                                                        visible={visible}
                                                        onClose={() => setVisible(false)}
                                                        onPatientAdded={handlePatientAdded}
                                                    />
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
                                                                {patients.map((patient) => (
                                                                    <CTableRow className='ctable-row'>
                                                                        <CTableDataCell align="middle">{patient.patientId}</CTableDataCell>
                                                                        <CTableDataCell>{patient.name}</CTableDataCell>
                                                                        <CTableDataCell>{patient.address}</CTableDataCell>
                                                                        <CTableDataCell>{patient.email}</CTableDataCell>
                                                                        <CTableDataCell>{patient.phone}</CTableDataCell>
                                                                        <CTableDataCell>
                                                                            <Link to={`/hospitaladmin/patientfilemedical/${patient._id}`} className='openfilepatient'>
                                                                                <BsArrowUpLeft /> Open patient file
                                                                            </Link>
                                                                        </CTableDataCell>
                                                                    </CTableRow>
                                                                ))}
                                                            </CTableBody>
                                                        </CTable>
                                                    </div>
                                                </div>
                                            </CTabPanel>
                                            <CTabPanel className="p-3" itemKey="dayrecord">
                                                <div className='tablist ' >
                                                    <div className='patientlistline'>
                                                        <div className="search-container">
                                                            <div className="search-bar">
                                                                <FaSearch size="sm" className="search-icon" style={{ width: '20px', height: '20px' }} />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search for a patient (Enter ID, name or Tel)"
                                                                    value={searchTerm}
                                                                    onChange={handleSearchChange}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='registeruserbtn ms-auto'>
                                                            <CButton onClick={() => setVisible(true)} className="registernewbtn ms-auto d-flex align-items-center" active tabIndex={-1}>
                                                                <BsPersonPlus className='mx-2' /> Register New patient
                                                            </CButton>
                                                        </div>
                                                    </div>
                                                    <AddPatientModal
                                                        visible={visible}
                                                        onClose={() => setVisible(false)}
                                                        onPatientAdded={handlePatientAdded}
                                                    />
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


                                                    <div className='patientlisttable'>
                                                        <CTable className="mt-5 ctable-no-border " align="middle" responsive>
                                                            <CTableHead>
                                                                <CTableRow className='tablehead'>
                                                                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">NAME</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">ADDRESS</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">PHONE</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">STATUS</CTableHeaderCell>
                                                                </CTableRow>
                                                            </CTableHead>
                                                            <CTableBody>
                                                                {appointments.map((appointment) => (
                                                                    <CTableRow className="ctable-row" key={appointment._id}>
                                                                        <CTableDataCell>{appointment.patientId?.patientId || 'N/A'}</CTableDataCell>
                                                                        <CTableDataCell>{appointment.patientId?.name || 'Unknown'}</CTableDataCell>
                                                                        <CTableDataCell>{appointment.patientId?.address || 'N/A'}</CTableDataCell>
                                                                        <CTableDataCell>
                                                                            <span className={appointment.status === 'Scheduled' ? 'coloredsucess' : 'coloredechec'}>
                                                                                {appointment.status}
                                                                            </span>
                                                                        </CTableDataCell>
                                                                        <CTableDataCell>{appointment.patientId?.phone || 'N/A'}</CTableDataCell>
                                                                        <CTableDataCell>
                                                                            <Link to={`/hospitaladmin/patientfilemedical/${appointment.patientId?._id}`} className="openfilepatient">
                                                                                <BsArrowUpLeft /> Open patient file
                                                                            </Link>
                                                                        </CTableDataCell>
                                                                    </CTableRow>
                                                                ))}

                                                            </CTableBody>
                                                        </CTable>
                                                    </div>
                                                </div>
                                            </CTabPanel>
                                        </CTabContent>
                                    </CTabs>
                                    {/* paginate */}
                                    <div className='paginate me-5'>
                                        <p className='mt-3'>
                                            Showing {(currentPage - 1) * limit + 1}-{Math.min(currentPage * limit, totalPatients)} of {totalPatients}
                                        </p>
                                        <div className='actionbtn'>
                                            <div className='left' onClick={goToPreviousPage}>
                                                <BsChevronLeft className='pagicon' />
                                            </div>
                                            <div className='right' onClick={goToNextPage}>
                                                <BsChevronRight className='pagicon' />
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
