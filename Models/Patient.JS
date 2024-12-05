const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    hospitalId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Hospital' }, // L'ID de l'hôpital est requis
    patientId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    medicalHistory: [{
        condition: { type: String }, // Condition médicale (ex. Diabète, Hypertension)
        description: { type: String }, // Détails supplémentaires sur la condition
        dateDiagnosed: { type: Date }, // Date du diagnostic
    }],
    allergies: [{
        type: { type: String }, // Type d'allergie (ex. Médicaments, Aliments)
        description: { type: String }, // Détails sur l'allergie
    }],
    ongoingMedications: [{
        medication: { type: String }, // Nom du médicament
        dosage: { type: String }, // Dosage (par exemple 500mg)
        frequency: { type: String }, // Fréquence (ex. Une fois par jour)
    }],
    surgeries: [{
        procedureName: { type: String }, // Nom de la procédure chirurgicale
        date: { type: Date }, // Date de la chirurgie
        additionalNotes: { type: String }, // Notes supplémentaires
    }],
    
    familyMedicalHistory: [String], // Antécédents médicaux familiaux (ex. Maladies cardiaques)

    symptoms: [{
        date: { type: Date, default: Date.now },
        symptoms : { type: String } ,
        severity: { type: String },
        onsetDate:{ type: String },
        additionalNotes : { type: String }
    }],

    diagnosis: [{
        date: { type: Date, default: Date.now },
        diagnosis : { type: String } ,
        testsConducted: { type: String },
        testResults:{ type: String },
        diagnosticNotes : { type: String },
        nextSteps : { type: String },
    }],

    visitLogs: [{
        date: { type: Date, default: Date.now }, 
        symptoms: { type: String }, 
        diagnosis: { type: String }, 
        treatment: { type: String }, 
    }],
    
    prescriptions: [{
        medicationName: { type: String }, // Nom du médicament
        dosage: { type: String }, // Dosage
        frequency: { type: String }, // Fréquence
        duration: { type: String }, // Durée du traitement
        specialInstructions: { type: String }, // Instructions spéciales (ex. à prendre avec de la nourriture)
        prescribingDoctor: { type: String }, // Médecin prescripteur
        pharmacyNotes: { type: String }, // Notes pour la pharmacie
        attachment: { type: String }, // Lien vers une pièce jointe (ex. prescription scannée)
    }],
},{
    timestamps: true,
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
