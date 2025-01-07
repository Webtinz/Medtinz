// patientController.js
const Patient = require('../../../Models/Patient.JS');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');


// patient register
// patientController.js
exports.registerPatient = async (req, res) => {
    try {
        const { hospitalId, name, gender, age, phone, email, address, medicalHistory, allergies, ongoingMedications, surgeries, familyMedicalHistory } = req.body;

        const newPatient = new Patient({
            hospitalId,
            name,
            gender,
            age,
            phone,
            email,
            address,
            medicalHistory,  // Ajout de l'historique médical
            allergies,       // Allergies
            ongoingMedications, // Médicaments en cours
            surgeries,       // Chirurgies passées
            familyMedicalHistory, // Antécédents médicaux familiaux
            patientId: `P-${Date.now()}` // ID du patient unique
        });

        await newPatient.save();

        res.status(201).json({
            message: 'Patient registered successfully',
            patient: newPatient,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering patient', error: error.message });
    }
};

exports.patientlists = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Récupérer les paramètres page et limit
    try {
        const patients = await Patient.find()
            .populate('hospitalId')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Patient.countDocuments();

        res.status(200).json({
            patients,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des patients:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};


// get patient info for edition
exports.getPatientById = async (req, res) => {
    try {
        console.log("Received ID:", req.params.id); // Vérifiez ici
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json(patient);
    } catch (error) {
        console.error("Error fetching patient:", error);
        res.status(500).json({ message: 'Error fetching patient data', error: error.message });
    }
};


// update patient information
exports.updatePatient = async (req, res) => {
    try {
        const { medicalHistory, visitLogs, ongoingMedications, allergies, surgeries } = req.body;

        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    medicalHistory,
                    visitLogs,
                    ongoingMedications,
                    allergies,
                    surgeries,
                }
            },
            { new: true }
        );

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({
            message: 'Patient record updated successfully',
            patient,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating patient record', error: error.message });
    }
};


// aiController.js
// const AI = require('../services/AI');

// exports.generateAIInsights = async (req, res) => {
//     try {
//         const patientId = req.params.id;
//         const patient = await Patient.findById(patientId);

//         if (!patient) {
//             return res.status(404).json({ message: 'Patient not found' });
//         }

//         const aiSuggestions = await AI.generateInsights(patient);
//         res.status(200).json({
//             message: 'AI insights generated successfully',
//             insights: aiSuggestions,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error generating AI insights', error: error.message });
//     }
// };

// SEARCH patients
exports.searchPatients = async (req, res) => {
    try {
        const { name, id, phone, email, medicalHistory } = req.query;
        const query = {};

        // Recherche par patientId (au lieu d'utiliser _id)
        if (id) {
            query.patientId = id; // Rechercher par patientId qui est une chaîne
        }

        // Recherche par nom
        if (name) {
            query.name = { $regex: name, $options: 'i' };  // Recherche insensible à la casse
        }

        // Recherche par téléphone
        if (phone) {
            query.phone = phone;
        }

        // Recherche par email
        if (email) {
            query.email = email;
        }

        // Recherche par antécédents médicaux
        if (medicalHistory) {
            query.medicalHistory = { $in: medicalHistory.split(',') };  // Recherche dans un tableau d'antécédents médicaux
        }

        const patients = await Patient.find(query);

        if (patients.length === 0) {
            return res.status(404).json({ message: 'No patients found' });
        }

        res.status(200).json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error searching patients', error: error.message });
    }
};


// Addprescription
exports.addPrescription = async (req, res) => {
    try {
        const { patientId, medicationName, dosage, frequency, duration, specialInstructions, prescribingDoctor, pharmacyNotes, attachment } = req.body;

        const patient = await Patient.findOne({ patientId });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Ajouter la prescription à l'historique des prescriptions du patient
        patient.prescriptions.push({
            medicationName,
            dosage,
            frequency,
            duration,
            specialInstructions,
            prescribingDoctor,
            pharmacyNotes,
            attachment
        });

        await patient.save();

        // Définir le contenu du PDF
        const docDefinition = {
            content: [
                { text: 'Prescription', style: 'header' },
                { text: `Patient Name: ${patient.name}`, style: 'subheader' },
                { text: `Medication: ${medicationName}`, style: 'text' },
                { text: `Dosage: ${dosage}`, style: 'text' },
                { text: `Frequency: ${frequency}`, style: 'text' },
                { text: `Duration: ${duration}`, style: 'text' },
                { text: `Special Instructions: ${specialInstructions}`, style: 'text' },
                { text: `Prescribing Doctor: ${prescribingDoctor}`, style: 'text' },
                { text: `Pharmacy Notes: ${pharmacyNotes}`, style: 'text' },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10],
                },
                subheader: {
                    fontSize: 14,
                    margin: [0, 10, 0, 5],
                },
                text: {
                    fontSize: 12,
                    margin: [0, 5, 0, 5],
                },
            },
        };

        // Charger les polices
        pdfMake.vfs = pdfFonts.pdfMake.vfs; // Ajouter le fichier des polices à pdfMake

        // Générer le PDF
        const pdfDoc = pdfMake.createPdf(docDefinition); // Générer le PDF

        // Définir le chemin où le PDF sera enregistré
        const filePath = path.join(__dirname, 'prescriptions', `Prescription_${patient.patientId}.pdf`);

        // Enregistrer le PDF dans un fichier
        pdfDoc.getBuffer((buffer) => {
            fs.writeFileSync(filePath, buffer);
            res.status(200).json({
                message: 'Prescription added successfully',
                patient,
                pdfPath: filePath // Retourner le chemin du PDF généré
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding prescription', error: error.message });
    }
};


// getall information about a patient
exports.getPatientRecords = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({
            patientId: patient.patientId,
            name: patient.name,
            gender: patient.gender,
            age: patient.age,
            contactInfo: patient.contactInfo,
            address: patient.address,
            medicalHistory: patient.medicalHistory,
            familyMedicalHistory: patient.familyMedicalHistory,
            surgeries: patient.surgeries,
            allergies: patient.allergies,
            ongoingMedications: patient.ongoingMedications,
            symptoms: patient.symptoms,
            diagnosis: patient.diagnosis,
            prescriptions: patient.prescriptions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving patient records', error: error.message });
    }
};

// addsymptoms
exports.addSymptoms = async (req, res) => {
    try {
        const { patientId, symptoms, severity, onsetDate, additionalNotes } = req.body;

        // Recherche le patient par son patientId, pas par _id
        const patient = await Patient.findOne({ patientId });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Ajouter les symptômes au log de visites du patient
        patient.symptoms.push({
            date: Date.now(),
            symptoms,
            severity,
            onsetDate,
            additionalNotes,
        });

        await patient.save();

        res.status(200).json({
            message: 'Symptoms added successfully',
            patient,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding symptoms', error: error.message });
    }
};

// adddiagonstic 
// patientController.js
exports.addDiagnosis = async (req, res) => {
    try {
        const { patientId, diagnosis, testsConducted, testResults, diagnosticNotes, nextSteps } = req.body;

        // Recherche le patient par son patientId, pas par _id
        const patient = await Patient.findOne({ patientId });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Ajouter le diagnostic dans les logs de visite
        patient.diagnosis.push({
            date: Date.now(),
            diagnosis,
            testsConducted,
            testResults,
            diagnosticNotes,
            nextSteps,
        });

        await patient.save();

        res.status(200).json({
            message: 'Diagnosis added successfully',
            patient,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding diagnosis', error: error.message });
    }
};

