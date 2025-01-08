// models/Payment.js
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    amount: { type: Number, required: true },           // Montant du paiement
    currency: { type: String, required: true },         // Devise (USD, EUR, etc.)
    status: { type: String, required: true },           // Statut du paiement (success, pending, failed)
    method: { type: String, required: true },           // Méthode de paiement (Paypal, Stripe, etc.)
    transaction_id: { type: String, required: true },   // ID de transaction (PayPal ou autre)
    payer_id: { type: String },                         // ID du payeur (si disponible)
    payer_email: { type: String },                      // Email du payeur (si disponible)
    created_at: { type: Date, default: Date.now },      // Date de la transaction
    updated_at: { type: Date, default: Date.now }       // Date de mise à jour
});

// Optionnel : Ajouter un index pour rechercher rapidement par méthode de paiement ou statut
PaymentSchema.index({ method: 1, status: 1 });

module.exports = mongoose.model('Payment', PaymentSchema);
