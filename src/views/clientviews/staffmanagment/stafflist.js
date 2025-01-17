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
import { useNavigate, useLocation } from 'react-router-dom'; // Importez useNavigate

import '@coreui/coreui/dist/css/coreui.min.css';
import '@coreui/coreui/dist/js/coreui.bundle.min.js';


const StaffList = () => {

    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [modalValue, setModalValue] = useState(null); // Valeur à passer au modal
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [staffs, setStaffs] = useState([]); // Liste des utilisateurs filtrée
    const [activeRole, setActiveRole] = useState("Allusers"); // Rôle actif (par défaut "Allusers")
    const [myHospitalUser, setMyHospitalUser] = useState([]); // Liste des utilisateurs
    const [roles, setRoles] = useState([]); // Liste des rôles
    const [currentPage, setCurrentPage] = useState(1); // Page actuelle
    const [totalPages, setTotalPages] = useState(1); // Nombre total de pages
    const [selectedUser, setSelectedUser] = useState(null); // Utilisateur sélectionné pour modification
    
    const [UserData, setUserData] = useState([]);  

    const [HospitalsList, setHospitalsList] = useState([]);

    useEffect(() => {

        const fetchHospitalsList = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await api.get(`api/hospitals/admin/${token}`);
                // console.log(response.data);
        
                // Récupérer les _id des hôpitaux et les combiner en une seule chaîne
                const hospitalIds = response.data.map(hospital => hospital._id).join(',');
        
                // console.log(hospitalIds);  // Afficher la chaîne des ids
        
                // Passer la chaîne d'ids dans la fonction suivante, si nécessaire
                fetchMyHospitalUser(hospitalIds);  // Appeler la fonction avec les hospitalIds
        
                setHospitalsList(response.data);
            } catch (error) {                
                toast.error(error); // Toast erreur
                console.error("Error fetching Hospitals List:", error);
            }
        };
        
        // La liste des user des hopitaux dont l'admin est actuellement connecte
        const fetchMyHospitalUser = async (hospitalIds) => {
            try {
                const response = await api.get(`api/usersbydepartment?hospital_id=${hospitalIds}`);
                // console.log(response.data);
                
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
        
        const fetchLoggedUserData = async () => {
        try {
            const response = await api.get('api/usersprofile');

            // response.data.role.name.includes('Admin') ? console.log(response.data.role.name) : console.log('RAS');
        //    console.log(response.data);
    
            setUserData(response.data);
        } catch (error) {
            toast.error("Failed to fetch data");
        }
        };
        fetchHospitalsList();
        fetchLoggedUserData();
        // fetchMyHospitalUser(); // Charger les utilisateurs
        fetchRoles(); // Charger les rôles
    }, []); // Exécuter cet effet une seule fois au montage


    const handleButtonClick = (value) => {
        // console.log(value);
        if (value !== 'Allusers') {
            setModalValue(value); // Met à jour la valeur à passer            
        }else{
            setModalValue("Allusers"); // Met à jour la valeur à passer   
        }
        setVisible(true); // Ouvre le modal
    };

    const handleStaffAdded = (newStaff) => {
        setStaffs((prev) => [...prev, newStaff]);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleEditClick = (user) => {
        // console.log(user);
        
        setSelectedUser(user); // Mettre l'utilisateur sélectionné
        setEditModalVisible(true); // Ouvrir le modal
    };

    const handleDetailsClick = (id) => {
        // Ajouter les données aux paramètres de l'URL
        navigate({
          pathname: '/hospitaladmin/staff_details',
          search: `?_id=${id}`
        });
    }
    
    const handleDeleteUserClick = async(id) => {
        // Ajouter les données aux paramètres de l'URL
            try {
                const response = await api.delete('api/users/' + id);

                // console.log(response);
                if (response.status == 200 || response.status == 201 /*  && response.data.success */) {
                    // Succès
                    
                    toast.success("Staff Deleted successfully!");
                } else {
                    // Échec géré dans la réponse
                    toast.error(response.data.message || "Failed to delete staff. Please try again.");
                }
            } catch (error) {
                toast.error(`Registration failed: ${error?.response?.data?.message || 'An unexpected error occurred. Please try again.'}`);
                console.error('Error:', error?.response|| 'No error message available.');

            }
    }

    const handleStaffUpdated = (updatedStaff) => {
        // Mettre à jour la liste des utilisateurs après la modification
        setStaffs((prevStaffs) =>
            prevStaffs.map((staff) => (staff._id === updatedStaff._id ? updatedStaff : staff))
        );
    };


    const filterUsersByRole = (role) => {
        // console.log(role);
        
        if (role === "Allusers") {
            return myHospitalUser; // Si "Allusers", afficher tous les utilisateurs
        }
        return myHospitalUser.filter((user) => user.role?._id === role); // Filtrer par rôle
    };

    return (
        <div className="dashboard-header">
        <ToastContainer /> {/* Conteneur pour afficher les toasts */}

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
                                            <span className="ms-2">{UserData.firstname} {UserData.lastname}</span>
                                            <p className="ms-2">{UserData.role?.name}</p>
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
                                            <CTabPanel className="p-3" itemKey="Allusers">
                                                <div className='tablist' >
                                                    <div className='d-flex mt-4'>
                                                        <CButton onClick={() =>  handleButtonClick('Allusers')} className="registernewbtn ms-auto d-flex align-items-center" active tabIndex={-1}>
                                                            <BsPersonPlus className='mx-2' /> Register New user
                                                        </CButton>
                                                    </div>
                                                    <AddStaffModal
                                                        visible={visible}
                                                        onClose={() => setVisible(false)}
                                                        onPatientAdded={handleStaffAdded}

                                                        handleStaffAdded={handleStaffAdded}
                                                        setVisible={setVisible} 
                                                        modalValue={modalValue} 
                                                        handleButtonClick={handleButtonClick} 
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
                                                                    <CTableHeaderCell scope="col">Fonction</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                                                </CTableRow>
                                                            </CTableHead>
                                                            <CTableBody>
                                                                        {myHospitalUser.map((user, index) => (
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
                                                                                <CTableDataCell>{user?.firstname} {user?.lastname}</CTableDataCell>
                                                                                {/* <CTableDataCell>{user.hospital_id.hospital_name}</CTableDataCell> */}
                                                                                <CTableDataCell>{user?.role?.name ?? 'Undefined'}</CTableDataCell>
                                                                                <CTableDataCell>
                                                                                    {user.departementId[0]?.name ?? 'Undefined'}
                                                                                </CTableDataCell>
                                                                                <CTableDataCell align="middle">
                                                                                    <span className="coloredsucess">Active</span>
                                                                                </CTableDataCell>
                                                                                <CTableDataCell align="middle">
                                                                                    <div className="actionbtn">
                                                                                        <div className="left">
                                                                                            <div class="dropdown-center p-0 bg-none" style={{ border: 'none' }}>
                                                                                                <FaEdit className="bg-none border-0 p-0"
                                                                                                    data-coreui-toggle="dropdown"
                                                                                                    aria-expanded="true"
                                                                                                    style={{ border: 'none' }} />
                                                                                                <ul class="dropdown-menu">
                                                                                                    <li><a class="dropdown-item" href="#" onClick={() => handleEditClick(user)} >Edit</a></li>
                                                                                                    <li><a class="dropdown-item" href="#" onClick={() => handleDetailsClick(user?._id)} >View Details</a></li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="right">
                                                                                            <div class="dropdown-center p-0 bg-none" style={{ border: 'none' }}>
                                                                                            <BsTrash3 style={{ color: '#EF3826', border: 'none' }} className="bg-none border-0 p-0"
                                                                                                    data-coreui-toggle="dropdown"
                                                                                                    aria-expanded="true"/>
                                                                                                <ul className="dropdown-menu" style={{ color: '#EF3826', borderRadius: '25px'}} >
                                                                                                <li>
                                                                                                    <a className="dropdown-item text-center"
                                                                                                    style={{
                                                                                                        borderBottom: '1px solid #979797',
                                                                                                        maxWidth: '100%',
                                                                                                        wordBreak: 'break-word', // Force le retour à la ligne pour les mots longs
                                                                                                        whiteSpace: 'normal', // Permet au texte de s'étendre sur plusieurs lignes
                                                                                                    }}
                                                                                                    href="#"
                                                                                                    >
                                                                                                    Are you sure you want to delete this user ?
                                                                                                    </a>
                                                                                                </li>
                                                                                                <li>
                                                                                                    <a className="dropdown-item my-3" href="#">
                                                                                                    <button
                                                                                                        className="btn mx-2"
                                                                                                        style={{
                                                                                                        backgroundColor: '#000',
                                                                                                        color: 'white',
                                                                                                        }}
                                                                                                    >
                                                                                                        No
                                                                                                    </button>
                                                                                                    <button
                                                                                                        className="btn mx-2"
                                                                                                        style={{
                                                                                                        backgroundColor: '#ff0000',
                                                                                                        color: 'white',
                                                                                                        }}
                                                                                                        onClick={() => handleDeleteUserClick(user?._id)}
                                                                                                    >
                                                                                                        Delete
                                                                                                    </button>
                                                                                                    </a>
                                                                                                </li>
                                                                                                </ul>

                                                                                            </div>
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
                                            {roles.map((role) => (
                                                <React.Fragment key={role._id}>
                                                    <CTabPanel className="p-3" itemKey={role._id}>
                                                        <div className="tablist">
                                                            <div className="d-flex mt-4">
                                                                <CButton
                                                                    onClick={() => handleButtonClick(role._id)}
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
                                                                handleStaffAdded={handleStaffAdded}
                                                                setVisible={setVisible} 
                                                                modalValue={modalValue} 
                                                                handleButtonClick={handleButtonClick} 
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
                                                                            <CTableHeaderCell>Names</CTableHeaderCell>
                                                                            <CTableHeaderCell>Hospitals</CTableHeaderCell>
                                                                            <CTableHeaderCell>Fonction</CTableHeaderCell>
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
                                                                                <CTableDataCell>{user.firstname} {user.lastname}</CTableDataCell>
                                                                                <CTableDataCell>{user.hospital_id.hospital_name}</CTableDataCell>
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
                                                                                            <div class="dropdown-center p-0 bg-none" style={{ border: 'none' }}>
                                                                                                <FaEdit className="bg-none border-0 p-0"
                                                                                                    data-coreui-toggle="dropdown"
                                                                                                    aria-expanded="true"
                                                                                                    style={{ border: 'none' }} />
                                                                                                <ul class="dropdown-menu">
                                                                                                    <li><a class="dropdown-item" href="#"   onClick={() => handleEditClick(user)} >Edit</a></li>
                                                                                                    <li><a class="dropdown-item" href="#" onClick={() => handleDetailsClick(user?._id)} >View Details</a></li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="right">
                                                                                            <div class="dropdown-center p-0 bg-none" style={{ border: 'none' }}>
                                                                                            <BsTrash3 style={{ color: '#EF3826', border: 'none' }} className="bg-none border-0 p-0"
                                                                                                    data-coreui-toggle="dropdown"
                                                                                                    aria-expanded="true"/>
                                                                                                <ul class="dropdown-menu">
                                                                                                    <li><a class="dropdown-item" href="#">No</a></li>
                                                                                                    <li><a class="dropdown-item" href="#"  onClick={() => handleDeleteUserClick(user?._id)}>Delete</a></li>
                                                                                                </ul>
                                                                                            </div>
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
