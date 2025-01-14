import React, { useState, useEffect } from 'react';
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
    CHeader,
    CContainer,
    CHeaderNav,
    CNavItem,
    CNavLink,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from '@coreui/react';
import { FaEdit, FaSearch } from "react-icons/fa";
import { BsPersonPlus, BsChevronRight, BsChevronLeft, BsTrash3 } from 'react-icons/bs';
import '../../../assets/css/mainstyle.css';
import Doctorvector from '../../../assets/images/doctorvector.png';
import Adminprofil from '../../../assets/images/adminprofil.png';
import AddStaffModal from './adduserstaff'; // Le composant modal
import { ToastContainer, toast } from 'react-toastify';
import EditStaffModal from './edituserstaff'; // Assurez-vous que le modal pour éditer est importé
import api from '../../../service/caller';

const StaffList = () => {
    const [visible, setVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [staffs, setStaffs] = useState([]); // Liste des utilisateurs filtrée
    const [activeRole, setActiveRole] = useState("Allusers"); // Rôle actif (par défaut "Allusers")
    const [myHospitalUser, setMyHospitalUser] = useState([]); // Liste des utilisateurs
    const [roles, setRoles] = useState([]); // Liste des rôles
    const [currentPage, setCurrentPage] = useState(1); // Page actuelle
    const [totalPages, setTotalPages] = useState(1); // Nombre total de pages
    const [selectedUser, setSelectedUser] = useState(null); // Utilisateur sélectionné pour modification

    useEffect(() => {
        const fetchMyHospitalUser = async () => {
            try {
                const response = await api.get(`api/usersbydepartment?hospital_id=6784d8be4bf5ef013005f84e`);
                setMyHospitalUser(response.data); // Assure-toi que l'API renvoie les utilisateurs dans un champ `users`
                setTotalPages(response.data); // Assure-toi que l'API renvoie `totalPages`
            } catch (error) {
                toast.error("Error fetching hospital users");
                console.error("Error fetching Hospital Users", error);
            }
        };

        const fetchRoles = async () => {
            try {
                const response = await api.get('api/getallroles');
                setRoles(response.data);
            } catch (error) {
                toast.error("Error fetching roles");
                console.error("Error fetching Roles:", error);
            }
        };

        fetchMyHospitalUser(); // Charger les utilisateurs
        fetchRoles(); // Charger les rôles
    }, []); // Exécuter cet effet une seule fois au montage

    const handleStaffAdded = (newStaff) => {
        setStaffs((prev) => [...prev, newStaff]);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleEditClick = (user) => {
        setSelectedUser(user); // Mettre l'utilisateur sélectionné
        setEditModalVisible(true); // Ouvrir le modal
    };

    const handleStaffUpdated = (updatedStaff) => {
        // Mettre à jour la liste des utilisateurs après la modification
        setStaffs((prevStaffs) =>
            prevStaffs.map((staff) => (staff._id === updatedStaff._id ? updatedStaff : staff))
        );
    };


    const filterUsersByRole = (role) => {
        if (role === "Allusers") {
            return myHospitalUser; // Si "Allusers", afficher tous les utilisateurs
        }
        return myHospitalUser.filter((user) => user.role._id === role); // Filtrer par rôle
    };

    return (
        <div className="dashboard-header">

        <EditStaffModal
            visible={isEditModalVisible}
            onClose={() => setEditModalVisible(false)}
            onStaffUpdated={handleStaffUpdated}
            user={selectedUser}
        />
            <CHeader position="sticky" style={{ backgroundColor: '#DFEAF5' }}>
                <CContainer fluid className="d-flex align-items-center">
                    <div className='row w-100'>
                        <div className="pagetittle col">
                            <h4><b>Staff Management</b></h4>
                            <p>Home <BsChevronRight className='mx-2' style={{ fontSize: "12px" }} />  Dashboard <BsChevronRight style={{ fontSize: "12px" }} className='mx-2' />  <span style={{ color: '#191B1C' }}>Staff Management</span></p>
                        </div>
                        <div className='d-flex col justify-content-end'>
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

            <div className="Patientlist mt-2">
                <div className='tabsection'>
                    <CRow>
                        <CCol xs={12}>
                            <CCard className="card mb-4 p-4">
                                <CCardBody>
                                    <CTabs activeItemKey={activeRole} onTabChange={setActiveRole}>
                                        <CTabList variant="underline" className="border-bottom">
                                            <CTab itemKey="Allusers">All Users</CTab>
                                            {/* Liste des rôles */}
                                            {roles.map((role) => (
                                                <CTab itemKey={role._id} key={role._id}>
                                                    {role.name}
                                                </CTab>
                                            ))}
                                        </CTabList>

                                        <CTabContent>
                                            {roles.map((role) => (
                                                <React.Fragment key={role._id}>
                                                    <CTabPanel className="p-3" itemKey={role._id}>
                                                        <div className="tablist">
                                                            <div className="d-flex mt-4">
                                                                <CButton
                                                                    onClick={() => setVisible(true)}
                                                                    className="registernewbtn ms-auto d-flex align-items-center"
                                                                    active
                                                                    tabIndex={-1}
                                                                >
                                                                    <BsPersonPlus className="mx-2" /> Register New User
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
                                                                        className="search-icon"
                                                                        style={{ width: '20px', height: '20px' }}
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Search for a patient (Enter ID, name or Tel)"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <CTable hover className="mt-5" align="middle" responsive>
                                                                    <CTableHead>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Profile</CTableHeaderCell>
                                                                            <CTableHeaderCell>Firstname</CTableHeaderCell>
                                                                            <CTableHeaderCell>Lastname</CTableHeaderCell>
                                                                            <CTableHeaderCell>Role</CTableHeaderCell>
                                                                            <CTableHeaderCell>Department</CTableHeaderCell>
                                                                            <CTableHeaderCell>Status</CTableHeaderCell>
                                                                            <CTableHeaderCell>Action</CTableHeaderCell>
                                                                        </CTableRow>
                                                                    </CTableHead>
                                                                    <CTableBody>
                                                                        {filterUsersByRole(role._id).map((user, index) => (
                                                                            <CTableRow key={index}>
                                                                                <CTableDataCell align="middle">
                                                                                    <img
                                                                                        src={Doctorvector}
                                                                                        className="cardicon"
                                                                                        alt="Consultation Icon"
                                                                                        width="50"
                                                                                        height="50"
                                                                                    />
                                                                                </CTableDataCell>
                                                                                <CTableDataCell>{user.firstname}</CTableDataCell>
                                                                                <CTableDataCell>{user.lastname}</CTableDataCell>
                                                                                <CTableDataCell>{user.role.name ?? 'Undefined'}</CTableDataCell>
                                                                                <CTableDataCell>
                                                                                    {user.departementId[0]?.name ?? 'Undefined'}
                                                                                </CTableDataCell>
                                                                                <CTableDataCell align="middle">
                                                                                    <span className="coloredsucess">Active</span>
                                                                                </CTableDataCell>
                                                                                <CTableDataCell align="middle">
                                                                                    <div className="actionbtn">
                                                                                        <div className="left">
                                                                                            <FaEdit onClick={() => handleEditClick(user)}  />
                                                                                        </div>
                                                                                        <div className="right">
                                                                                            <BsTrash3 style={{ color: '#EF3826' }} />
                                                                                        </div>
                                                                                    </div>
                                                                                </CTableDataCell>
                                                                            </CTableRow>
                                                                        ))}
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                        </div>
                                                    </CTabPanel>
                                                </React.Fragment>
                                            ))}
                                        </CTabContent>
                                    </CTabs>

                                    {/* Pagination */}
                                    <div className='paginate me-5'>
                                        <p className='mt-3'>
                                            Showing {(currentPage - 1) * 10 + 1} - {Math.min(currentPage * 10, 78)} of 78
                                        </p>
                                        <div className='actionbtn'>
                                            <div className='left'>
                                                <BsChevronLeft
                                                    className='pagicon'
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </div>
                                            <div className='right'>
                                                <BsChevronRight
                                                    className='pagicon'
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </div>
            </div>
        </div>
    );
};

export default StaffList;
