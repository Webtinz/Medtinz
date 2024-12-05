const PurchaseOrder = require('../../../Models/PurchaseOrders');
const Transaction = require('../../../Models/TransactionsPharma');
const Inventory = require('../../../Models/InventoryPharma');
const nodemailer = require('nodemailer');

// alert and Notification

//  mail alert

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Adresse email
        pass: process.env.EMAIL_PASS,  // Mot de passe (ou mot de passe spécifique à l'application)
    },
    debug: true, 
});

// Fonction pour envoyer une alerte par email
const sendEmailAlert = (inventoryItem) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'houenafab@gmail.com',
        subject: 'Stock Alert: Medication Low',
        text: `The stock for ${inventoryItem.drugName} is low. Only ${inventoryItem.quantityInStock} units left. Please reorder soon.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};


// Envoyer une notification en temps réel via Socket.io
const sendRealTimeNotification = (inventoryItem) => {
    io.emit('stockAlert', {
        message: `Alert: Stock for ${inventoryItem.drugName} is low. Only ${inventoryItem.quantityInStock} units left. Please reorder!`
    });
};

const sendStockAlert = (inventoryItem) => {
    console.log(`Alert: Stock for ${inventoryItem.drugName} is low. Only ${inventoryItem.quantityInStock} units left. Please reorder!`);
    // Envoyer une notification en temps réel
    sendEmailAlert(inventoryItem);
};


// create purchase
exports.createPurchaseOrder = async (req, res) => {
    try {
        const { supplierId, items } = req.body;

        const newOrder = new PurchaseOrder({
            supplierId,
            items,
        });

        await newOrder.save();

        res.status(201).json({
            message: 'Purchase order created successfully',
            order: newOrder,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating purchase order', error: error.message });
    }
};

// updat commande state
exports.updatePurchaseOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await PurchaseOrder.findByIdAndUpdate(id, { status }, { new: true });

        if (!order) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }

        res.status(200).json({
            message: 'Purchase order status updated successfully',
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating purchase order status', error: error.message });
    }
};


// Fonction pour recevoir l'inventaire
exports.receiveInventory = async (req, res) => {
    try {
        const { purchaseOrderId, receivedItems } = req.body; // Liste des articles reçus et leurs informations (quantité, lot, expiration)

        const purchaseOrder = await PurchaseOrder.findById(purchaseOrderId);
        if (!purchaseOrder) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }

        // Parcourir les articles reçus et mettre à jour l'inventaire
        for (const item of receivedItems) {
            const { drugId, quantityReceived, batchNumber, expiryDate, discrepancies } = item;

            // Vérifier si le médicament existe dans l'inventaire
            const inventoryItem = await Inventory.findById(drugId);
            if (!inventoryItem) {
                return res.status(404).json({ message: `Drug with ID ${drugId} not found in inventory` });
            }

            // Mettre à jour les quantités dans l'inventaire
            inventoryItem.quantityInStock += quantityReceived;
            inventoryItem.batchNumber = batchNumber;
            inventoryItem.expiryDate = expiryDate;

            // Si des anomalies sont signalées, les enregistrer dans les logs
            if (discrepancies && discrepancies.length > 0) {
                inventoryItem.discrepancies = discrepancies; // Ajouter des informations sur les anomalies (par exemple, articles manquants ou endommagés)
            }

            await inventoryItem.save();

            // Enregistrer dans receivedItems dans l'ordre d'achat
            purchaseOrder.receivedItems.push({
                drugId: inventoryItem._id,
                quantity: quantityReceived,
                batchNumber: batchNumber,
                expiryDate: expiryDate,
                discrepancies: discrepancies || 'None',  // Enregistrement des anomalies
            });
        }

        // Sauvegarder les modifications dans la commande d'achat
        await purchaseOrder.save();

        res.status(200).json({
            message: 'Inventory received and updated successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error receiving inventory', error: error.message });
    }
};

// transaction of Dispense
// Fonction pour enregistrer une transaction de dispense
exports.recordDispenseTransaction = async (req, res) => {
    try {
        const { patientId, drugId, quantity, doctorName } = req.body;

        // Vérifier si le médicament existe dans l'inventaire
        const inventoryItem = await Inventory.findById(drugId);
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Drug not found in inventory' });
        }

        // Vérifier la disponibilité du stock
        if (inventoryItem.quantityInStock < quantity) {
            return res.status(400).json({ message: 'Not enough stock to dispense' });
        }

        // Enregistrer la transaction de dispense
        const newTransaction = new Transaction({
            patientId,
            drugId,
            quantity,
            transactionType: 'dispense',
            doctorName,  // Ajout du nom du médecin prescripteur
            dispenseDate: Date.now(), // Date de dispense
        });

        await newTransaction.save();

        // Mettre à jour l'inventaire
        inventoryItem.quantityInStock -= quantity;
        await inventoryItem.save();

        if (inventoryItem.quantityInStock <= inventoryItem.reorderLevel) {
            // Envoyer une notification d'alerte
            sendStockAlert(inventoryItem);
        }

        // Retourner les résultats
        res.status(200).json({
            message: 'Medication dispensed successfully',
            transaction: newTransaction,
            updatedInventory: inventoryItem,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error recording dispense transaction', error: error.message });
    }
};

