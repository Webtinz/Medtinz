const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    drugName: { type: String, required: true },
    drugDescription: { type: String },
    quantityInStock: { type: Number, required: true },
    reorderLevel: { type: Number, required: true }, // Niveau de stock minimum avant commande
    price: { type: Number, required: true },
    batchNumber: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }, // Référence vers un fournisseur
}, {
    timestamps: true,  // Pour gérer les dates de création et de mise à jour
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
