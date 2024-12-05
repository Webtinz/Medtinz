import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Pour la navigation
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton,
} from '@coreui/react';

const Tables = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const navigate = useNavigate(); // Hook de navigation

    // Utiliser useEffect pour récupérer les souscriptions avec Axios
    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/subscriptions'); // Remplacez par l'URL de votre API
                setSubscriptions(response.data); // Mise à jour de l'état avec les données reçues
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
            }
        };

        fetchSubscriptions();
    }, []);

    // Fonction pour gérer l'édition d'un abonnement
    const handleEdit = (id) => {
        // Redirige vers la page d'édition avec l'ID de l'abonnement dans l'URL
        navigate(`/admin/editplan${id}`);
    };

    // Fonction de suppression avec confirmation
    const handleDeleteSubscription = (id) => {
        const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cet abonnement ?');
        if (confirmation) {
            handleDelete(id);
        }
    };

    // Fonction pour gérer la suppression d'un abonnement avec Axios
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/deletesubscriptions/${id}`);

            if (response.status === 200) {
                // Retirer l'abonnement supprimé de l'état
                setSubscriptions(subscriptions.filter(sub => sub._id !== id));
            } else {
                console.error('Erreur lors de la suppression de l\'abonnement');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'abonnement:', error);
        }
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardBody>
                        <div className="d-flex justify-content-between mb-3">
                            {/* Bouton Ajouter Plan */}
                            <CButton color="primary" onClick={() => navigate('/admin/addplan')}>
                                Ajouter Plan
                            </CButton>
                        </div>
                        <CTable striped bordered>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Duration</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {subscriptions.map((subscription) => (
                                    <CTableRow key={subscription._id}>
                                        <CTableHeaderCell scope="row">{subscription.name}</CTableHeaderCell>
                                        <CTableDataCell>{subscription.duration}</CTableDataCell>
                                        <CTableDataCell>{subscription.price}</CTableDataCell>
                                        <CTableDataCell>{subscription.description}</CTableDataCell>
                                        <CTableDataCell>
                                            {/* Boutons d'action */}
                                            <CButton color="info" style={{ color: 'white' }} onClick={() => handleEdit(subscription._id)}>
                                                Edit
                                            </CButton>
                                            <CButton
                                                color="danger"
                                                style={{ color: 'white' }}
                                                className="ms-2"
                                                onClick={() => handleDeleteSubscription(subscription._id)}
                                            >
                                                Delete
                                            </CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Tables;
