const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    drugId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
    quantity: { type: Number, required: true },
    transactionDate: { type: Date, default: Date.now },
    transactionType: { type: String, enum: ['dispense', 'restock'], required: true }, // dispense or restock
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
