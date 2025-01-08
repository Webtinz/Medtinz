const paypal = require('paypal-rest-sdk');
// const mongoose = require('mongoose');
const Payment = require('../Models/Payment'); // Modèle Payment pour enregistrer les paiements

// Configuration de PayPal 
const { PAYPAL_MODE, PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY, BASE_URL } = process.env;
const configurePaypal = () => {
    paypal.configure({
        'mode': PAYPAL_MODE, // sandbox ou live
        'client_id': PAYPAL_CLIENT_KEY,
        'client_secret': PAYPAL_SECRET_KEY
    });
};

const renderBuyPage = async (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Erreur serveur.');
    }
};

// Fonction pour enregistrer un paiement dans la base de données
const savePayment = async (amount, currency, status, method, transaction_id, payer_id, payer_email) => {
    try {
        const payment = new Payment({
            amount,
            currency,
            status,
            method,
            transaction_id,
            payer_id,
            payer_email
        });
        await payment.save();
        console.log('Paiement enregistré avec succès!');
    } catch (error) {
        console.log('Erreur lors de l\'enregistrement du paiement:', error.message);
    }
};

// Fonction pour créer et exécuter un paiement PayPal
const payProduct = async (req, res) => {
    try {
        const { item_name, price, currency } = req.body;

        if (!item_name || !price || !currency) {
            return res.status(400).send('Paramètres manquants.');
        }

        configurePaypal();

        const create_payment_json = {
            "intent": "sale",
            "payer": { "payment_method": "paypal" },
            "redirect_urls": {
                "return_url": `${BASE_URL}/payment/success`,
                "cancel_url": `${BASE_URL}/payment/cancel`
            },
            "transactions": [{
                "item_list": { "items": [{ name: item_name, sku: "001", price, currency, quantity: 1 }] },
                "amount": { "currency": currency, "total": price },
                "description": `Purchase of ${item_name}`
            }]
        };

        paypal.payment.create(create_payment_json, async (error, payment) => {
            if (error) {
                console.error('Erreur PayPal:', error);
                return res.status(500).send('Erreur lors de la création du paiement PayPal.');
            }

            const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
            if (!approvalUrl) {
                return res.status(500).send('Impossible de trouver l\'URL de redirection.');
            }

            await savePayment(price, currency, 'pending', 'paypal', payment.id, null, null);

            // Renvoyer l'URL d'approbation
            return res.status(200).json({ approval_url: approvalUrl.href });
        });
    } catch (error) {
        console.error('Erreur lors du paiement:', error.message);
        res.status(500).send('Erreur serveur.');
    }
};

const getPaymentDetailsById = async (paymentId) => {
    try {
        const payment = await Payment.findOne({ transaction_id: paymentId });
        return payment;
    } catch (error) {
        console.error('Erreur lors de la récupération des détails du paiement:', error);
        throw new Error('Erreur lors de la récupération des détails du paiement.');
    }
};
// Fonction pour gérer la page de succès du paiement
const successPage = async (req, res) => {
    try {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        if (!payerId || !paymentId) {
            return res.status(400).send('Paramètres manquants dans l\'URL.');
        }

        // Récupérer les détails du paiement depuis la base de données
        const paymentDetails = await getPaymentDetailsById(paymentId);

        if (!paymentDetails) {
            return res.status(404).send('Paiement introuvable.');
        }

        const { currency, amount } = paymentDetails;

        // Configurer PayPal
        configurePaypal();

        // Préparer l'exécution du paiement
        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": currency,
                    "total": amount
                }
            }]
        };

        // Exécuter le paiement PayPal
        paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
            if (error) {
                console.error(error.response);
                return res.status(500).send('Erreur lors de l\'exécution du paiement.');
            } else {
                // Mettre à jour le statut du paiement existant dans la base de données
                await Payment.updateOne(
                    { transaction_id: paymentId }, // Chercher le paiement par son ID
                    { $set: { status: 'completed', payer_id: payerId, payer_email: payment.payer.payer_info.email } } // Mise à jour du statut
                );

                res.render('success');
            }
        });
    } catch (error) {
        console.error('Erreur:', error.message);
        res.status(500).send('Erreur serveur.');
    }
};


// Fonction pour gérer la page d'annulation du paiement
const cancelPage = async (req, res) => {
    try {
        // Sauvegarder le paiement avec le statut 'cancelled'
        await savePayment(0, 'USD', 'cancelled', 'paypal', '', '', '');
        res.render('cancel');
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Erreur serveur.');
    }
};

module.exports = {
    renderBuyPage,
    payProduct,
    successPage,
    cancelPage
};
