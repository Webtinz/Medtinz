const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
});

const Role = mongoose.model('Role', roleSchema);
module.exports = { Role };

