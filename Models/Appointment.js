// /models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  AppointmentCode: { type: String, unique: true, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  motif: { type: String ,required:true },
  type_consultation: { type: String , required:true},
  department: { type: String },
  appointmentDate: { type: Date},
  appointmentTime: { type: String},
  purposeOfVisit: { type: String },
  nurseId: { type: String },
  price: { type: String , required:true},
  notes: { type: String },
  status: { type: String, enum: ['Scheduled', 'Cancelled'], default: 'Scheduled' },
  reasonForCancellation: { type: String, default: '' },
  paymentStatus: { type: Boolean, default: false }, // Nouveau champ
},{
  timestamps: true,  // Pour gérer les dates de création et de mise à jour
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
