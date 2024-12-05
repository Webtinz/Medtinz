const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Hospital'  // Référence au modèle Hospital
    },
    name: { type: String, required: true },
    contactName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;
