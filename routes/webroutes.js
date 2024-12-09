const express = require('express');
const router = express.Router();
const subscriptionController = require('../Controllers/SubscriptionController');
const hospitalController = require('../Controllers/HospitalController');
const contentController = require('../Controllers/ContentController');
const departmentController = require('../Controllers/DepartmentController')
const authMiddleware = require('../middlewares/authMiddleware'); // Importer le middleware

const registerController = require('../Controllers/auth/register');
const loginController = require('../Controllers/auth/login');
const check_otpController = require('../Controllers/auth/check_otp');
const check_tokenController = require('../Controllers/auth/check_token');

// Appel de la fonction de configuration des routes
registerController(router);
loginController(router); // Appelle le contrôleur de login et associe la route `/login`
check_otpController(router); // Ajoute la route pour vérifier le check_otp
check_tokenController(router); // Ajoute la route pour vérifier le check_token

// subscription admin manage
router.post('/addsubscription', authMiddleware, subscriptionController.addSubscription); // Protégée par JWT
router.get('/subscriptions', authMiddleware, subscriptionController.getAllSubscriptions); // Protégée par JWT
router.get('/editsubscriptions/:id', authMiddleware, subscriptionController.getSubscriptionById); // Protégée
router.put('/updatesubscriptions/:id', authMiddleware, subscriptionController.updateSubscription); // Protégée
router.delete('/deletesubscriptions/:id', authMiddleware, subscriptionController.deleteSubscription); // Protégée

// Hospital manage
router.post('/addhospital', authMiddleware, hospitalController.addHospital); // Protégée
router.post('/addhospitallogo', authMiddleware, hospitalController.addHospitalLogo); // Protégée
router.get('/hospitals', authMiddleware, hospitalController.getHospitals); // Protégée
router.put('/deactivate/:hospitalId', authMiddleware, hospitalController.deactivateHospital); // Protégée
router.post('/selectplan', authMiddleware, hospitalController.selectHospitalPlan); // Protégée

// Department Management Routes (ajoutées ici)
router.post('/adddepartment', authMiddleware, departmentController.createDepartment); // Protégée-
router.get('/myhospitaldepartments', authMiddleware, departmentController.getMyHospitalAllDepartments); // Protégée
router.get('/departments', authMiddleware, departmentController.getAllDepartments); // Protégée
router.get('/department', authMiddleware, departmentController.getDepartmentById); // Protégée
router.put('/updatedepartment', authMiddleware, departmentController.updateDepartment); // Protégée
router.delete('/deletedepartment', authMiddleware, departmentController.deleteDepartment); // Protégée


// Users Management By Hospital Admin

// Content Management
router.get('/:lang/content', contentController.getContent); // Non protégée
router.post('/content', authMiddleware, contentController.addOrUpdateContent); // Protégée

module.exports = router;
