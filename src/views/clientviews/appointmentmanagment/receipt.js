import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { CModal, CModalHeader, CModalBody, CModalTitle, CButton } from '@coreui/react';
import { BsArrowRight } from 'react-icons/bs';

const ReceiptPage = () => {
    const location = useLocation();
    const paymentData = location.state?.paymentData;

    if (!paymentData) {
        return <div>Loading...</div>;  // Ou un message d'erreur si les données sont manquantes
    }

    return (
        <div className="payment-page">
            <CModal
                className="ticket newregistermodal"
                alignment="center"
                scrollable
                size="lg"
                visible={true}
                onClose={() => { }}
            >
                <CModalHeader className="text-center">
                    <CModalTitle className="Titleformsmodal">Payment Receipt</CModalTitle>
                </CModalHeader>
                <CModalBody className="p-5 d-flex flex-column align-items-center">
                    {/* Rendu du reçu avec les données de paymentData */}
                    <div className="receipt-container border p-4 bg-white shadow">
                        <div className="text-center mb-4">
                            <img src="src/assets/images/Frame 1000005869.png" alt="Clinic Logo" style={{ width: '100px' }} />
                            <h5 className="mt-2">Clinique Polyvalente Oluwa Sheyi</h5>
                        </div>
                        <h6 className="text-center">Payment Receipt</h6>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <span>Amount</span>
                            <span>{paymentData.amount}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Payment Method</span>
                            <span>{paymentData.paymentMethod}</span>
                        </div>
                        {/* Ajoutez d'autres informations à partir de paymentData */}
                        <hr />
                        <p className="text-center mt-3">Thank you for your payment!</p>
                    </div>

                    <CButton className="mt-4 w-100" color="success">
                        Download Receipt
                    </CButton>
                </CModalBody>
            </CModal>
        </div>
    );
};


export default ReceiptPage;
