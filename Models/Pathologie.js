const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const pathologieSchema = new mongoose.Schema({
    name_fr: { type: String, required: true },  // Nom en français
    name_en: { type: String, required: true },  // Nom en anglais
}, {
    timestamps: true,  // Pour gérer les dates de création et de mise à jour
});

const Pathologie = mongoose.model('Pathologie', pathologieSchema);
module.exports = Pathologie;
