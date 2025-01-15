import React, { useState, useEffect } from 'react';
import { CModal, CModalHeader, CModalBody, CModalTitle, CButton } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import axios from 'axios';
import '../../../assets/css/mainstyle.css';
import api from '../../../service/caller'; // Axios instance configurée

const getUserIdFromToken = () => {
    const token = localStorage.getItem('access_token'); // Récupérer le token depuis le localStorage
    if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Décoder le payload du JWT
        return decodedToken.userId; // Retourner l'ID de l'utilisateur (assurez-vous que c'est bien ce qui est stocké dans le token)
    }
    return null; // Retourne null si aucun token n'est présent
};

const AddPatientModal = ({ visible, onClose, onPatientAdded }) => {
    const [hospitals, setHospitals] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [formData, setFormData] = useState({
        patientNPI: '',
        name: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        hospitalId: '',
        address: '',
        otherdetails: '',
    });

    const navigate = useNavigate();  // Utilisation de useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/clinic/patients/register', formData);
            console.log('Patient ajouté avec succès:', response.data);
            setMessage('Patient ajouté avec succès!');
            setMessageType('success');
            const patientId = response.data.patient._id;  // Accéder à l'ID à partir de `patient`

            console.log('Patient ID:', patientId);  // Affichez l'ID du patient dans la console

            if (patientId) {
                // Rediriger vers la carte du patient avec l'ID
                navigate(`/patientcard/${patientId}`);
            }

            setFormData({
                patientNPI: '',
                name: '',
                age: '',
                gender: '',
                phone: '',
                email: '',
                hospitalId: '',
                address: '',
                otherdetails: ''
            });
        } catch (error) {
            console.error('Erreur lors de l’ajout du patient:', error);
            setMessage('Une erreur est survenue lors de l’ajout du patient.');
            setMessageType('error');
        }
    };

    const userId = getUserIdFromToken(); // Récupérer l'ID de l'utilisateur à partir du token

    // Fonction pour récupérer la liste des hôpitaux pour l'administrateur
    useEffect(() => {
        const fetchHospitals = async () => {
            if (!userId) {
                setMessage('Utilisateur non authentifié.');
                return;
            }
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`http://localhost:5000/api/hospitals/admin/` + token, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                setHospitals(response.data); // Sauvegarder les hôpitaux dans l'état
            } catch (error) {
                console.error('Erreur lors de la récupération des hôpitaux:', error);
                setMessage('Erreur lors de la récupération des hôpitaux.');
            }
        };
        if (userId) {
            fetchHospitals(); // Appeler la fonction pour récupérer les hôpitaux uniquement si l'utilisateur est authentifié
        }
    }, [userId]); // Dépendance sur userId pour recharger si nécessaire

    return (
        <CModal className='newregistermodal'
            alignment="center"
            scrollable
            size='lg'
            visible={visible}
            onClose={onClose}
            aria-labelledby="VerticallyCenteredScrollableExample2">
            <CModalHeader>
                <CModalTitle>Register new patient</CModalTitle>
            </CModalHeader>
            <CModalBody className='p-5'>
                {message && (
                    <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="patientNPI">NPI</label>
                        <input
                            type="Number"
                            name="patientNPI"
                            id="patientNPI"
                            value={formData.patientNPI}
                            onChange={handleChange}
                            placeholder="0598677474333"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Casos Billal"
                            required
                        />
                    </div>

                    <div className="form-row row">
                        <div className="form-group col-md-4">
                            <label htmlFor="gender">Gender</label>
                            <select name="gender" id="gender" value={formData.gender} onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="form-group col-md-4">
                            <label htmlFor="age">Date of birth</label>
                            <input
                                type="date"
                                name="age"
                                id="age"
                                value={formData.age} onChange={handleChange} required
                                placeholder="20-12-2000"
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="hospitalId">Hospital</label>
                            <select name="hospitalId" id="hospitalId" value={formData.hospitalId} onChange={handleChange} required>
                                <option value="">Select Hospital</option>
                                {hospitals.map((hospital) => (
                                    <option key={hospital._id} value={hospital._id}>
                                        {hospital.hospital_name} {/* Assurez-vous que votre modèle contient un champ 'name' */}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row row">
                        <div className="form-group col-md-6">
                            <label htmlFor="phone">Contact</label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone" value={formData.phone}
                                onChange={handleChange}
                                placeholder="+229 01 90 00 00 00"
                            />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange} value={formData.email}
                                id="email"
                                placeholder="+229 01 90 00 00 00"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            name="address"
                            id="address" value={formData.address}
                            onChange={handleChange}
                            placeholder="Your address here"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="otherdetails">Details</label>
                        <input
                            name="otherdetails"
                            id="otherdetails" onChange={handleChange} value={formData.otherdetails}
                            placeholder="Your Details here"
                        />
                    </div>

                    <div className="savenewuser form-group d-flex justify-content-center">
                        <CButton type="submit">
                            Continue &nbsp; <BsArrowRight />
                        </CButton>
                    </div>
                </form>
            </CModalBody>
        </CModal>
    );
};

export default AddPatientModal;
