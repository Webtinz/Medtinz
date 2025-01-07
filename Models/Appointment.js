// /models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  department: { type: String },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  purposeOfVisit: { type: String },
  nurseId: { type: String },
  notes: { type: String },
  status: { type: String, enum: ['Scheduled', 'Cancelled'], default: 'Scheduled' },
  reasonForCancellation: { type: String, default: '' },
  paymentStatus: { type: Boolean, default: false }, // Nouveau champ
},{
  timestamps: true,  // Pour gérer les dates de création et de mise à jour
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
