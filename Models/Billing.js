const mongoose = require('mongoose');

const BillingSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    department: { type: String, required: true },
    currency: { type: String, required: true },
    receptionistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    amount: { type: Number, required: true },
    paymentId: { type: String, unique: true, required: true },
    paymentMethod: { type: String, enum: ['Cash', 'MobileMoney', 'Card'], required: true },
    purpose: { type: String, required: true },
    paymentDate: { type: Date, default: Date.now },
}, {
    timestamps: true,  // Pour gérer les dates de création et de mise à jour
});

module.exports = mongoose.model('Billing', BillingSchema);