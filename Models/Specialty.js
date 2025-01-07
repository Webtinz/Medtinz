const mongoose = require('mongoose');

const specialtySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    departementId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department', // Lien avec le modèle Department
        default: null,
    },
        hospital_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hospital', // Lien avec le modèle Hospital
            default: null,   // Par défaut, null
        },
});

const Specialty = mongoose.model('Specialty', specialtySchema);
module.exports = { Specialty };
