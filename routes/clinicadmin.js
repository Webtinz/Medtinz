const express = require('express');
const router = express.Router();
const patientController = require('../Controllers/clientInterface/PatientManagement/PatientController');
const supplierController = require('../Controllers/clientInterface/PharmacyManagment/SupplierController');
const InventoryPharmaController = require('../Controllers/clientInterface/PharmacyManagment/InventoryController');
const PurchaseOrderController = require('../Controllers/clientInterface/PharmacyManagment/PurchasePharmaController');
const { body, validationResult } = require('express-validator');
const appointmentController = require('../Controllers/clientInterface/AppointmentController');


// const aiController = require('./controllers/aiController');

// Routes pour gérer les patients
router.post('/patients/register', patientController.registerPatient);
router.get('/patients/:id', patientController.getPatientById);
router.put('/updatepatients/:id', patientController.updatePatient);
router.get('/patients/searchpatient', patientController.searchPatients);
router.get('/patients/records/:id', patientController.getPatientRecords);
router.post('/patients/addPrescription', patientController.addPrescription);
router.post('/patients/addDiagnosis', patientController.addDiagnosis);
router.post('/patients/addSymptoms', patientController.addSymptoms);

// Pharmacy and Inventory Management
// Inventory
router.post('/addinventoryItem', InventoryPharmaController.addInventoryItem);
router.put('/updateInventoryItem/:id', InventoryPharmaController.updateInventoryItem);
router.get('/searchInventory', InventoryPharmaController.searchInventory);

// purchase
router.post('/createPurchaseOrder', PurchaseOrderController.createPurchaseOrder);
router.put('/updatePurchaseOrderStatus/:id', PurchaseOrderController.updatePurchaseOrderStatus);
router.put('/receiveInventory', PurchaseOrderController.receiveInventory);
// Route pour enregistrer une transaction de dispense
router.post('/dispense', PurchaseOrderController.recordDispenseTransaction);

// AI Insights
// router.post('/patients/ai-insights/:id', aiController.generateAIInsights);

// Supplier managment
router.post('/supplier', supplierController.createSupplier);
router.get('/getAllSuppliers', supplierController.getAllSuppliers);
router.get('/getSupplierById/:id', supplierController.getSupplierById);
router.put('/updateSupplier/:id', supplierController.updateSupplier);
router.delete('/deleteSupplier/:id', supplierController.deleteSupplier);


// Appointment Managment
router.post('/addappointments', [
  body('patientId').isMongoId().withMessage('Invalid patient ID'),
  body('doctorId').isMongoId().withMessage('Invalid doctor ID'),
  body('appointmentDate').isDate().withMessage('Invalid appointment date'),
  body('appointmentTime').isString().withMessage('Invalid appointment time')
], appointmentController.createAppointment);
// Route pour mettre à jour un rendez-vous
router.put('/updateappointments/:id', [
  body('appointmentDate').isDate().withMessage('Invalid appointment date'),
  body('appointmentTime').isString().withMessage('Invalid appointment time')
], appointmentController.updateAppointment);
// Route pour annuler un rendez-vous
router.put('/cancelappointments/:id', appointmentController.cancelAppointment);
// Route pour voir un rendez-vous
router.get('/getappointments/:id', appointmentController.viewAppointment);
// Route pour synchroniser les rendez-vous hors ligne
router.post('/appointments/sync', appointmentController.syncOfflineAppointments);



module.exports = router;
