const mongoose = require('mongoose');

const specialtySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
});

const Specialty = mongoose.model('Specialty', specialtySchema);
module.exports = { Specialty };
