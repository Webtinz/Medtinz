import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import { CModal, CModalHeader, CModalBody, CModalTitle, CButton } from '@coreui/react';
import { BsArrowRight } from 'react-icons/bs';
import axios from 'axios';
import '../../../assets/css/mainstyle.css';
import api from '../../../service/caller';

const AddAppointmentModal = ({ visible, onClose, onAppointmentAdded, patientId, patientName }) => {
    const navigate = useNavigate(); // Initialisez useNavigate
    const [departments, setDepartments] = useState([]);
    const [hospitalId, setHospitalId] = useState(null);
    const [message, setMessage] = useState('');
    const [appointmentInfo, setAppointmentInfo] = useState(null);
    const [appointmentData, setAppointmentData] = useState({
        patient_Name: patientName || '',
        motif: '',
        type_consultation: '',
        department: '',
        price: '',
        notes: '',
        patientId: patientId,

    });

    // const [doctors, setDoctors] = useState([]); // Liste des médecins
    // const [selectedDoctor, setSelectedDoctor] = useState(null); // Médecin sélectionné
    // const [showDoctorModal, setShowDoctorModal] = useState(false); // Modal pour la sélection du médecin
    // const [appointmentDate, setAppointmentDate] = useState(null); // Date de l'appartement
    // const [doctorMessage, setDoctorMessage] = useState(''); // Message d'erreur ou info pour la sélection du médecin

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('access_token'); // Récupérer le token depuis localStorage
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Décoder le payload du JWT
            return decodedToken.userId; // Retourner l'ID de l'utilisateur
        }
        return null; // Retourne null si aucun token n'est présent
    };

    // Fonction pour récupérer l'hôpital de l'utilisateur
    const fetchUserHospital = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setMessage('Token d\'authentification absent');
                return;
            }

            // Ajoutez le token dans l'URL de la requête
            const response = await api.get(`/api/hospitals/admin/${token}`); // Passez le token directement dans l'URL

            // Récupérer l'ID de l'hôpital et le stocker dans l'état
            const hospitalId = response.data[0]?._id;
            if (hospitalId) {
                setHospitalId(hospitalId); // Mettre à jour l'état avec l'ID de l'hôpital
            } else {
                setMessage('Aucun hôpital trouvé pour cet utilisateur.');
            }

        } catch (error) {
            setMessage('Erreur lors de la récupération des données hospitalières.');
        }
    };

    useEffect(() => {
        fetchUserHospital(); // Récupérer l'hôpital dès que le composant est monté
    }, []);


    useEffect(() => {
        if (!hospitalId) {
            return; // Si hospitalId est undefined ou null, on arrête l'exécution
        }

        const fetchDepartments = async () => {
            try {
                const response = await api.get(`/api/departments/hospital/${hospitalId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    }
                });

                // Mettre à jour les départements dans l'état
                setDepartments(response.data.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des départements:', error);
                setMessage('Erreur lors de la récupération des départements.');
            }
        };

        fetchDepartments(); // Appel de la fonction pour récupérer les départements
    }, [hospitalId]); // Dépendance sur hospitalId, la requête sera effectuée dès qu'il est défini


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'department') {
            // Trouver le département correspondant dans la liste des départements
            const selectedDepartment = departments.find(department => department._id === value); // Utilisation de _id pour identifier le département
            console.log('dep', selectedDepartment);
            setAppointmentData({
                ...appointmentData,
                department: value, // Mettre à jour le département sélectionné
                price: selectedDepartment ? selectedDepartment.price_consult : '', // Mettre à jour le prix avec la valeur du département
            });
        } else {
            setAppointmentData({
                ...appointmentData,
                [name]: value, // Mettre à jour les autres champs
            });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await api.post('/clinic/createBaseAppointment', appointmentData);
            // console.log('Appointment added:', response.data);
            // onAppointmentAdded(response.data.appointment);
            // onClose(); // Fermez le modal
            const data = {
                hospitalId,
                appointmentData,
            };
            setAppointmentInfo(data); // Stockez temporairement les informations
            navigate('/hospitaladmin/schedulerdv', { state: data });
            // setShowDoctorModal(true); // Ouvre le modal pour choisir le médecin
            // // navigate('/hospitaladmin/payment', { state: { appointment: response.data.appointment } }); // Redirigez avec les données de rendez-vous
        } catch (error) {
            console.error('Error adding appointment:', error);
            alert('Failed to add appointment');
        }
    };


    // Fonction pour récupérer la liste des médecins
    // const fetchDoctors = async () => {
    //     if (!hospitalId) return;

    //     try {
    //         const response = await api.get(`/api/doctors/hospital/${hospitalId}`, {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    //             }
    //         });
    //         setDoctors(response.data);
    //     } catch (error) {
    //         console.error('Error fetching doctors:', error);
    //         setDoctorMessage('Erreur lors de la récupération des médecins.');
    //     }
    // };

    // useEffect(() => {
    //     if (showDoctorModal) {
    //         fetchDoctors();
    //     }
    // }, [showDoctorModal]);

    // const handleDoctorSelection = (doctor) => {
    //     setSelectedDoctor(doctor);
    // };

    // const handleDateChange = (date) => {
    //     setAppointmentDate(date);
    // };

    // const handleFinalSubmit = () => {
    //     if (!selectedDoctor || !appointmentDate) {
    //         alert('Veuillez sélectionner un médecin et une date.');
    //         return;
    //     }

    //     const finalAppointmentData = { ...appointmentData, doctorId: selectedDoctor._id, appointmentDate };
    //     // Finaliser l'appartement et naviguer vers la page de paiement
    //     console.log('Final appointment data:', finalAppointmentData);
    //     navigate('/hospitaladmin/payment', { state: { appointment: finalAppointmentData } });
    // };




    return (
        
        <CModal className='newregistermodal '
            alignment="center"
            scrollable
            size='lg'
            visible={visible}
            onClose={onClose}
            aria-labelledby="VerticallyCenteredScrollableExample2"
        >
            <CModalHeader>
                <CModalTitle id="VerticallyCenteredScrollableExample2" className='Titleformsmodal'>Register New Appointment</CModalTitle>
            </CModalHeader>
            <CModalBody className="p-5">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="patient_Name">Patient Name</label>
                        <input
                            type="text"
                            name="patient_Name"
                            value={appointmentData.patient_Name}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="motif">Motif</label>
                        <select name="motif" value={appointmentData.motif} onChange={handleChange} required>
                            <option value="">Select Motif</option>
                            <option value="consultation">Consultation</option>
                            <option value="control">Control</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="type_consultation">Type consultation</label>
                        <select name="type_consultation" value={appointmentData.type_consultation} onChange={handleChange} required>
                            <option value="">Select Type Consultation</option>
                            <option value="inperson">In Person</option>
                            <option value="online">Telemedicine</option>
                        </select>
                    </div>
                    <div className="form-group">
                        {message && <p>{message}</p>}
                        <label htmlFor="department">Department</label>
                        <select name="department" value={appointmentData.department} onChange={handleChange} required>
                            <option>Selectionner le departement</option>
                            {departments.map((department) => (
                                <option key={department._id} value={department._id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Prix</label>
                        <input
                            type="number"
                            name="price"
                            value={appointmentData.price}
                            onChange={handleChange}
                            disabled required
                        />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="notes">Notes</label> */}
                        <textarea
                            name="notes"
                            value={appointmentData.notes}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="savenewuser form-group d-flex justify-content-center">
                        <CButton type="submit">
                            Save Appointment &nbsp; <BsArrowRight />
                        </CButton>
                    </div>
                </form>
            </CModalBody>
        </CModal>

        

    );
};

export default AddAppointmentModal;
