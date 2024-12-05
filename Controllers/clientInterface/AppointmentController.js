// /controllers/appointmentController.js
const Appointment = require('../../Models/Appointment');
const Patient = require('../../Models/Patient.JS');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Créer un rendez-vous
exports.createAppointment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { patientId, doctorId, appointmentDate, appointmentTime, purposeOfVisit, notes } = req.body;

        // Vérifier si l'ID du patient existe dans la base de données
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found with the provided ID' });
        }

        const newAppointment = new Appointment({
            patientId,
            doctorId,
            appointmentDate,
            appointmentTime,
            purposeOfVisit,
            notes,
        });

        await newAppointment.save();

        // Envoyer une alerte par email après la mise à jour
        sendEmailAlert(updatedAppointment);  // Appeler la fonction pour envoyer l'email

        res.status(201).json({
            message: 'Appointment scheduled successfully',
            appointment: newAppointment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error scheduling appointment', error: error.message });
    }
};

// Mettre à jour un rendez-vous
exports.updateAppointment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { patientId, doctorId, appointmentDate, appointmentTime, purposeOfVisit, notes } = req.body;

        // Vérifier si l'ID du patient existe dans la base de données
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found with the provided ID' });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { patientId, doctorId, appointmentDate, appointmentTime, purposeOfVisit, notes },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Envoyer une alerte par email après la mise à jour
        sendEmailAlert(updatedAppointment);  // Appeler la fonction pour envoyer l'email

        res.status(200).json({ message: 'Appointment rescheduled successfully', appointment: updatedAppointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error rescheduling appointment', error: error.message });
    }
};

// Annuler un rendez-vous
exports.cancelAppointment = async (req, res) => {
    try {
        const { reasonForCancellation = 'No reason provided' } = req.body;

        const canceledAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: 'Cancelled', reasonForCancellation },
            { new: true }
        );

        if (!canceledAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment cancelled successfully', appointment: canceledAppointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error canceling appointment', error: error.message });
    }
};

// Voir un rendez-vous
exports.viewAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching appointment', error: error.message });
    }
};

// Synchroniser les rendez-vous hors ligne
exports.syncOfflineAppointments = async (req, res) => {
    try {
        const { appointments } = req.body; // Liste des rendez-vous à synchroniser

        // Synchroniser chaque rendez-vous
        for (let appointment of appointments) {
            switch (appointment.action) {
                case 'create':
                    const newAppointment = new Appointment(appointment);
                    await newAppointment.save();
                    break;
                case 'update':
                    await Appointment.findByIdAndUpdate(appointment.appointmentId, appointment);
                    break;
                case 'cancel':
                    await Appointment.findByIdAndUpdate(appointment.appointmentId, { status: 'Cancelled' });
                    break;
                default:
                    break;
            }
        }

        res.status(200).json({ message: 'Appointments synchronized successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error synchronizing appointments', error: error.message });
    }
};

// Fonction pour envoyer une alerte par email
const sendEmailAlert = (appointment) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "houenafab@gmail.com",
        subject: 'Appointment Reminder',
        text: `Dear ${appointment.patientName},\n\nThis is a reminder for your appointment with Dr. ${appointment.doctorName} on ${appointment.appointmentDate} at ${appointment.appointmentTime}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};
