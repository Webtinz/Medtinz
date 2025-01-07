const Billing = require('../../Models/Billing');
const Patient = require('../../Models/Patient.JS');
const Appointment = require('../../Models/Appointment')
// const User = require('../models/User');

exports.createPayment = async (req, res) => {
    const { appointmentId, patientId, amount, currency, paymentMethod, purpose, department } = req.body;

    console.log('Received payment data:', req.body);

    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        const paymentId = paymentMethod === 'Cash' ? `CASH-${Date.now()}` : req.body.paymentId;

        const billing = new Billing({
            appointmentId,
            patientId,
            department,
            amount,
            currency,
            paymentMethod,
            paymentId,
            purpose,
        });

        await billing.save();

        appointment.paymentStatus = true;
        await appointment.save();

        console.log('Payment recorded and appointment updated.');

        res.status(201).json({ message: 'Payment recorded successfully', billing });
    } catch (error) {
        console.error('Error recording payment:', error);
        res.status(500).json({ message: 'Error recording payment', error: error.message });
    }
};



// Fonction pour générer un ID de paiement unique
const generatePaymentId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `cash-${timestamp}${randomDigits}`;
};
