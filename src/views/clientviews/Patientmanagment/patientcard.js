import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CModal, CModalHeader, CModalBody, CModalTitle, CButton } from '@coreui/react';
import { BsArrowRight, BsArrowBarDown } from 'react-icons/bs';
import { useParams, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { toast } from 'react-toastify';  // Importer le toast
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

    const handleDownload = () => {
        const doc = new jsPDF();

        // Sélectionner la div "receipt-container" pour la convertir en image et l'ajouter dans le PDF
        const element = document.querySelector('.receipt-container');

        if (element) {
            doc.html(element, {
                callback: function (doc) {
                    doc.save(`${patientData.name}_PatientCard.pdf`);
                },
                x: 10,
                y: 10
            });
        }
    };

    // Fonction pour la redirection avec le toast de succès
    const handleValidate = () => {
        // Afficher le toast de succès
        toast.success("Patient ajouté avec succès!", {
            position: "top-right",  // Utilisation de la chaîne de caractères pour la position
            autoClose: 3000,
        });

        // Rediriger vers la page des patients
        navigate('/hospitaladmin/patientlist');
    };


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
                    <CModalTitle className="Titleformsmodal"><p className='text-center'>Register new Patient</p> </CModalTitle>
                </CModalHeader>
                <CModalBody className="p-5 d-flex flex-column align-items-center">
                    {/* Rendu du reçu avec les données de paymentData */}
                    <div className="receipt-container border p-4 bg-white shadow">
                        <div className="d-flex align-items-center mb-5">
                            <img src={Hospitallogo} className='me-auto' alt="Clinic Logo" style={{ width: '150px', height: 'auto' }} />
                            <h5 className="ms-auto fw-2">PATIENT CARD</h5>
                        </div>
                        <div className='patientinfo d-flex'>
                            <div className='table me-auto'>
                                <table className=''>
                                    <tbody>
                                        <tr>
                                            <p className='ps-3 pt-1'>Name : <span>{patientData.name}</span></p>
                                        </tr>
                                        <tr> <p className='ps-3 pt-1'>Code Patient : <span>{patientData.patientId}</span></p></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='qrimg ms-auto'>
                                <img src={Codeqrimg} alt="qr image" style={{ width: '100px' }} />
                            </div>
                        </div>
                        <div className='textdiv d-flex'>
                            <div className='textdivleft me-auto'>
                                <p>{patientData.address}</p>
                                <p>{patientData.phone}</p>
                                <br></br>
                                <p style={{ color: 'green' }}>{patientData.email}</p>
                            </div>
                            <div className='textdivright ms-auto'>
                                <p>{patientData.patientNPI}</p>
                                <p>{patientData.gender}</p>
                                <p style={{ color: '#000000' }}><b>{patientData.age}</b></p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 btnactionpatientcard' >
                        <CButton className="w-100" style={{ backgroundColor: '#FF9800' }} onClick={handleDownload} >
                            Telecharger<BsArrowBarDown className='ms-2' />
                        </CButton>
                        <CButton className="w-100" style={{ backgroundColor: '#28A745' }} onClick={handleValidate} >
                            Validate <BsArrowRight className='ms-2' />
                        </CButton>
                    </div>
                </CModalBody>
            </CModal>
        </div>
    );
};


export default PatientCard;
