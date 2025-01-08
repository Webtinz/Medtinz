const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
});

const Feature = mongoose.model('Feature', featureSchema);
module.exports = { Feature };

