const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'In Transit', 'Received'], default: 'Pending' },
    items: [{
        drugId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
        quantity: { type: Number, required: true },
    }],
    receivedItems: [{
        drugId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },
        quantity: { type: Number },
        batchNumber: { type: String },
        expiryDate: { type: Date },
        discrepancies: { type: String }
    }],
});

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);

module.exports = PurchaseOrder;
