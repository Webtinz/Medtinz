import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CModal, CModalHeader, CModalBody, CModalTitle, CButton } from '@coreui/react';
import { BsArrowRight } from 'react-icons/bs';
import { useParams, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

import Hospitallogo from '../../../assets/images/Frame 1000005869.png';
import Codeqrimg from '../../../assets/images/codeqr.png';


const PatientCard = () => {
    const { patientId } = useParams();  // Récupérer l'ID du patient depuis l'URL
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    // Fonction pour récupérer les données du patient
    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/clinic/getpatients/${patientId}`);  // Remplacer par votre API
                setPatientData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données du patient', error);
                setError('Erreur lors de la récupération des données.');
                setLoading(false);
            }
        };

        if (patientId) {
            fetchPatientData();
        }
    }, [patientId]);  // Recharger les données si l'ID change

    if (loading) {
        return <div>Loading...</div>;  // Afficher un message de chargement
    }

    if (error) {
        return <div>{error}</div>;  // Afficher un message d'erreur si la récupération échoue
    }

    if (!patientData) {
        return <div>Aucun patient trouvé.</div>;  // Si aucune donnée de patient n'est trouvée
    }
    return (
        <div className="patientcard">
            <CModal
                className="ticket newregistermodal"
                alignment="center"
                scrollable
                size="lg"
                visible={true}
                onClose={() => { }}
            >
                <CModalHeader className="text-center">
                    <CModalTitle className="Titleformsmodal"> Register new Patient</CModalTitle>
                </CModalHeader>
                <CModalBody className="p-5 d-flex flex-column align-items-center">
                    {/* Rendu du reçu avec les données de paymentData */}
                    <div className="receipt-container border p-4 bg-white shadow">
                        <div className="d-flex">
                            <img src={Hospitallogo} className='ms-auto' alt="Clinic Logo" style={{ width: '100px' }} />
                            <h5 className="mt-2 me-auto">PATIENT CARD</h5>
                        </div>
                        <div className='patientinfo d-flex'>
                            <div className='table ms-auto'>
                                <table border="1">
                                    <thead>
                                        <tr>
                                            <th>Name : {patientData.name}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>Code Patient : {patientData.patientId}</tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='qrimg me-auto'>
                                <img src={Codeqrimg} alt="qr image" style={{ width: '100px' }} />
                            </div>
                        </div>
                        <div className='textdiv d-flex'>
                            <div className='textdivleft'>
                                <p>{patientData.address}</p>
                                <p>{patientData.phone}</p>
                                <br></br>
                                <span style={{ color: 'green' }}>{patientData.email}</span>
                            </div>
                            <div className='textdivright'>
                                <p>{patientData.patientNPI}</p>
                                <p>{patientData.gender}</p>
                                <br></br>
                                <span style={{ color: 'black' }}>{patientData.age}</span>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <CButton className="mt-4 w-50" style={{ backgroundColor: '#FF9800' }} onClick={() => {
                            // Fonction pour télécharger la carte
                            const link = document.createElement('a');
                            link.href = 'C:/Users/hp/Downloads';  // Spécifier le chemin pour télécharger le fichier
                            link.download = `${patientData.name}_PatientCard.pdf`;
                            link.click();
                        }}>
                            Telecharger
                        </CButton>
                        <CButton className="mt-4 w-50" style={{ backgroundColor: '#28A745' }}>
                            Validate
                        </CButton>
                    </div>
                </CModalBody>
            </CModal>
        </div>
    );
};


export default PatientCard;
