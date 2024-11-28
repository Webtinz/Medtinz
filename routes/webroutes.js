const express = require('express');
const router = express.Router();
const subscriptionController = require('../Controllers/SubscriptionController');
const hospitalController = require('../Controllers/HospitalController');
const contentController = require('../Controllers/ContentController');

const registerController = require('../Controllers/auth/register');
const loginController = require('../Controllers/auth/login');
const check_otpController = require('../Controllers/auth/check_otp');

// Appel de la fonction de configuration des routes
registerController(router);
loginController(router); // Appelle le contrôleur de login et associe la route `/login`
check_otpController(router); // Ajoute la route pour vérifier l'check_otp

// subscription admin manage
// Add subscription
router.post('/addsubscription', subscriptionController.addSubscription);
// List subscription
router.get('/subscriptions', subscriptionController.getAllSubscriptions);
//edit subscription get
router.get('/editsubscriptions/:id', subscriptionController.getSubscriptionById);
//update subscription get
router.put('/updatesubscriptions/:id', subscriptionController.updateSubscription);
//delete
router.delete('/deletesubscriptions/:id', subscriptionController.deleteSubscription);


// Hospital manage

// Route pour ajouter un hôpital
router.post('/addhospital', hospitalController.addHospital);

// Route pour récupérer la liste des hôpitaux
router.get('/hospitals', hospitalController.getHospitals);

// Route pour désactiver un hôpital
router.put('/deactivate/:hospitalId', hospitalController.deactivateHospital);

// Content Managment
router.get('/:lang/content', contentController.getContent);
// Route pour ajouter ou mettre à jour le contenu
router.post('/content', contentController.addOrUpdateContent);

module.exports = router;
