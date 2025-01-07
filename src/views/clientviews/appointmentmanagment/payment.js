import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CModal, CModalHeader, CModalBody, CModalTitle, CButton } from '@coreui/react';
import { BsArrowRight } from 'react-icons/bs';

const PaymentPage = () => {
    const navigate = useNavigate(); // Initialisez useNavigate
    const location = useLocation();
    const appointment = location.state?.appointment;

    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [formData, setFormData] = useState({
        currency: 'XOF',
        amount: '',
        purpose: 'consultation',
        paymentId: '', // Pour MOMO uniquement
    });
    const [ticketModal, setTicketModal] = useState(false);

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const paymentData = {
            appointmentId: appointment?._id || '',
            patientId: appointment?.patientId || '',
            department: appointment?.department || 'Unknown',
            amount: formData.amount,
            currency: formData.currency,
            paymentMethod,
            purpose: formData.purpose,
            paymentId: paymentMethod === 'MOMO' ? formData.paymentId : `CASH-${Date.now()}`,
        };

        console.log('Submitting payment data:', paymentData);

        try {
            const response = await axios.post('http://localhost:5000/clinic/createPayment', paymentData);
            console.log('Payment recorded:', response.data);
            navigate('/client/receiptpay', {
                state: { paymentData: response.data }, // Transmettez les données à la page suivante
            });
        } catch (error) {
            console.error('Error recording payment:', error.response ? error.response.data : error.message);
            alert('Payment failed. Please try again.');
        }
    };


    return (
        <div className="payment-page">
            <CModal className='paymentbycash newregistermodal'
                alignment="center"
                scrollable
                size='lg'
                visible={true}
                onClose={() => { }}
                aria-labelledby="VerticallyCenteredScrollableExample2"
            >
                <CModalHeader className='text-center'>
                    <CModalTitle id="VerticallyCenteredScrollableExample2" className='Titleformsmodal'>New Appointment</CModalTitle>
                </CModalHeader>
                <CModalBody className='p-5'>

                    <section className='mb-5'>
                        <p><strong>Appointment Details:</strong></p>
                        <p>Patient: {appointment?.patientId}</p>
                        <p>Department: {appointment?.department}</p>
                        <p>Date: {appointment?.appointmentDate}</p>
                        <p>Time: {appointment?.appointmentTime}</p>
                    </section>
                    <section className='pamentoption'>
                        <div className='selectpaymentoption'>
                            <h4>Choose Payment Method</h4>
                            <div className='momopayment'>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="momopayment"
                                    value="MOMO"
                                    checked={paymentMethod === 'MOMO'}
                                    onChange={handlePaymentMethodChange}
                                />
                                <img src="src/assets/images/MoMo_Logo_RGB_Horizontal-on_LIGHT_BG 1.png" className='cardicon' alt="Consultation Icon" />
                            </div>

                            <div className='cashpayment'>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="cashpayment"
                                    value="Cash"
                                    checked={paymentMethod === 'Cash'}
                                    onChange={handlePaymentMethodChange}
                                />
                                <h3 className='cashtext'>Cash</h3>
                            </div>
                        </div>
                    </section>

                    <form onSubmit={handleSubmit}>
                        {paymentMethod === 'Cash' ? (
                            <>
                                <div className="form-row row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="currency">Currency</label>
                                        <select
                                            name="currency"
                                            id="currency"
                                            value={formData.currency}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="XOF">XOF</option>
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-8">
                                        <label htmlFor="amount">Enter Amount</label>
                                        <input
                                            type="number"
                                            name="amount"
                                            id="amount"
                                            value={formData.amount}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="form-group">
                                <label htmlFor="paymentId">MOMO Payment ID</label>
                                <input
                                    type="text"
                                    name="paymentId"
                                    id="paymentId"
                                    placeholder="Enter MOMO Payment ID"
                                    value={formData.paymentId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="purpose">Purpose</label>
                            <select
                                name="purpose"
                                id="purpose"
                                value={formData.purpose}
                                onChange={handleChange}
                                required
                            >
                                <option value="consultation">Consultation</option>
                                <option value="operation">Operation</option>
                            </select>
                        </div>
                        <div className="form-group d-flex justify-content-center">
                            <CButton type="submit" className="w-100">
                                Confirm Payment &nbsp; <BsArrowRight />
                            </CButton>
                        </div>
                    </form>
                </CModalBody>
            </CModal>

        </div>
    );
};

export default PaymentPage;
