const express = require('express');
const router = express.Router();
const subscriptionController = require('../Controllers/Bakendadmin/SubscriptionController');
const hospitalController = require('../Controllers/Bakendadmin/HospitalController');
const contentController = require('../Controllers/Bakendadmin/ContentController');
const pathologieController = require('../Controllers/Bakendadmin/PathologieController');

// subscription admin manage
// Add subscription
router.post('/addsubscription', subscriptionController.addSubscription);
router.get('/subscriptions', subscriptionController.getAllSubscriptions);
router.get('/editsubscriptions/:id', subscriptionController.getSubscriptionById);
router.put('/updatesubscriptions/:id', subscriptionController.updateSubscription);
router.delete('/deletesubscriptions/:id', subscriptionController.deleteSubscription);


// Hospital manage

// Route pour ajouter un hôpital
router.post('/addhospital', hospitalController.addHospital);
router.get('/hospitals', hospitalController.getHospitals);
router.put('/deactivate/:hospitalId', hospitalController.deactivateHospital);
router.get('/:lang/content', contentController.getContent);
router.post('/content', contentController.addOrUpdateContent);


// Pathologie Managment
// Créer une pathologie
router.post('/addpathologies', pathologieController.createPathologie);
router.get('/pathologies', pathologieController.getAllPathologies);
router.get('/editpathologies/:id', pathologieController.getPathologieById);
router.put('/updatepathologies/:id', pathologieController.updatePathologie);
router.delete('/deletepathologies/:id', pathologieController.deletePathologie);

module.exports = router;
