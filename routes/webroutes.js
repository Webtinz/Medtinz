const express = require('express');
const router = express.Router();
const subscriptionController = require('../Controllers/SubscriptionController');
const hospitalController = require('../Controllers/HospitalController');
const contentController = require('../Controllers/ContentController');
const departmentController = require('../Controllers/DepartmentController');
const userController = require('../Controllers/userController');
const roleController = require('../Controllers/RoleController'); // Importer le contrôleur des rôles
const featureController = require('../Controllers/FeatureController'); // Importer le contrôleur des rôles
const specialtyController = require('../Controllers/SpecialityController'); // Import du contrôleur Specialty

const resendOtpController = require('../Controllers/auth/resend_otp');
const forgotPasswordController = require('../Controllers/auth/forgot_password');
const resetPasswordController = require('../Controllers/auth/reset_password');

const authMiddleware = require('../middlewares/authMiddleware'); // Importer le middleware

const registerController = require('../Controllers/auth/register');
const loginController = require('../Controllers/auth/login');
const check_otpController = require('../Controllers/auth/check_otp');
const check_tokenController = require('../Controllers/auth/check_token');

// Route pour renvoyer l'OTP
router.post('/resend-otp', resendOtpController);
// Route pour mot de passe oublié
router.post('/forgot-password', forgotPasswordController);

// Route pour reset-password
router.post('/reset-password', resetPasswordController);

// Appel de la fonction de configuration des routes
registerController(router);
loginController(router); // Appelle le contrôleur de login et associe la route `/login`
check_otpController(router); // Ajoute la route pour vérifier le check_otp
check_tokenController(router); // Ajoute la route pour vérifier le check_token

// subscription admin manage
router.post('/addsubscription', authMiddleware, subscriptionController.addSubscription); // Protégée par JWT
router.get('/subscriptions', /* authMiddleware, */  subscriptionController.getAllSubscriptions); // Protégée par JWT
// Route pour récupérer une souscription spécifique
router.get('/subscriptions/:id', /* authMiddleware, */  subscriptionController.getSubscriptionById);

router.get('/editsubscriptions/:id', authMiddleware, subscriptionController.getSubscriptionByIdForEdit); // Protégée
router.put('/updatesubscriptions/:id', authMiddleware, subscriptionController.updateSubscription); // Protégée
router.delete('/deletesubscriptions/:id', authMiddleware, subscriptionController.deleteSubscription); // Protégée

// Hospital manage
router.post('/addhospital', authMiddleware, hospitalController.addHospital); // Protégée
router.post('/addhospitallogo', authMiddleware, hospitalController.addHospitalLogo); // Protégée
router.get('/hospitals', authMiddleware, hospitalController.getHospitals); // Protégée
router.put('/deactivate/:hospitalId', authMiddleware, hospitalController.deactivateHospital); // Protégée
// Récupérer les hôpitaux par hospital_admin_id
router.get('/hospitals/admin/:hospital_admin_id', hospitalController.getHospitalsByAdmin);
// router.get('/hospitals/admin/:hospital_admin_id', hospitalController.getHospitalsByAdmin);
// router.get('/hospital/:hospitalAdminId', authMiddleware, hospitalController.getHospitalByAdminId);

router.post('/selectplan',  authMiddleware,  hospitalController.selectHospitalPlan); // Protégée

// Department Management Routes (ajoutées ici)
router.post('/adddepartment', authMiddleware, departmentController.createDepartment); // Protégée
router.get('/myhospitaldepartments', authMiddleware, departmentController.getMyHospitalAllDepartments); // Protégée
router.get('/departments', authMiddleware, departmentController.getAllDepartments); // Protégée
router.get('/department', authMiddleware, departmentController.getDepartmentById); // Protégée
router.put('/updatedepartment', authMiddleware, departmentController.updateDepartment); // Protégée
router.delete('/deletedepartment', authMiddleware, departmentController.deleteDepartment); // Protégée

// CRUD Specialty
router.post('/specialities', authMiddleware, specialtyController.createSpecialty); // Créer une spécialité
router.get('/specialities', authMiddleware, specialtyController.getAllSpecialties); // Lire toutes les spécialités
router.get('/specialitiesbydepartment/:departmentId', authMiddleware, specialtyController.getAllSpecialtiesByDepartment); // Lire toutes les spécialités par departement specifie
router.get('/specialitiy/:id', authMiddleware, specialtyController.getSpecialtyById); // Lire une spécialité par ID
router.get('/specialities/search', authMiddleware, specialtyController.searchSpecialtiesByName); // Rechercher par nom
router.put('/specialities/:id', authMiddleware, specialtyController.updateSpecialtyById); // Mettre à jour une spécialité
router.delete('/specialities/:id', authMiddleware, specialtyController.deleteSpecialtyById); // Supprimer une spécialité

// Users Management By Hospital Admin
router.post('/adduser', authMiddleware, userController.addUser);
router.get('/users/:userId', authMiddleware, userController.getUserDetails);
router.put('/users/:userId', authMiddleware, userController.updateUser);
router.delete('/users/:userId', authMiddleware, userController.deleteUser);
router.get('/usersbydepartment', authMiddleware, userController.getUsersByHospitalAndDepartment);

// Content Management
router.get('/:lang/content', contentController.getContent); // Non protégée
router.post('/content', authMiddleware, contentController.addOrUpdateContent); // Protégée

// Role Management
router.post('/addroles', authMiddleware, roleController.createRole); // Créer un rôle
router.get('/getallroles', authMiddleware, roleController.getAllRoles); // Lire tous les rôles
router.get('/getoneroles/:id', authMiddleware, roleController.getRoleById); // Lire un rôle par ID
router.put('/updateroles/:id', authMiddleware, roleController.updateRoleById); // Mettre à jour un rôle
router.delete('/deleteroles/:id', authMiddleware, roleController.deleteRoleById); // Supprimer un rôle
// Rechercher un rôle par name
router.get('/roles/search', authMiddleware, roleController.searchRolesByName); // Protégée par JWT


// Feature Management
router.post('/addfeatures', /*authMiddleware,*/ featureController.createFeature); // Créer un rôle
router.get('/getallfeatures', /*authMiddleware,*/ featureController.getAllFeatures); // Lire tous les rôles
router.get('/getonefeatures/:id', /*authMiddleware,*/ featureController.getFeatureById); // Lire un rôle par ID
router.put('/updatefeatures/:id', /*authMiddleware,*/ featureController.updateFeatureById); // Mettre à jour un rôle
router.delete('/deletefeatures/:id', /*authMiddleware,*/ featureController.deleteFeatureById); // Supprimer un rôle
// Rechercher un rôle par name
router.get('/features/search', /*authMiddleware,*/ featureController.searchFeaturesByName); // Protégée par JWT



module.exports = router;