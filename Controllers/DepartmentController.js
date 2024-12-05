const jwt = require('jsonwebtoken'); // Assurez-vous d'importer jwt
const Department = require('../Models/Department'); // Assurez-vous d'importer le modèle Department
const Hospital = require('../Models/Hospital'); // Importez le modèle Hospital

// Créer un département
const createDepartment = async (req, res) => {
  try {
    const { name, description, hospital_id } = req.body;

    // Décoder le JWT depuis l'en-tête Authorization
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authorization token is required.' });
    }

    // Décoder le token pour obtenir l'utilisateur connecté
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Remplacez `process.env.JWT_SECRET` par votre clé secrète
    const hospital_admin_id_get = decoded.userId; // Assurez-vous que l'ID de l'utilisateur est présent dans le payload

    // Vérifier si l'utilisateur est bien associé à l'hôpital spécifié
    const hospital = await Hospital.findById(hospital_id);
    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found.' });
    }

    console.log(hospital.hospital_admin_id)
    console.log(hospital_admin_id_get)
    // Vérifier que l'utilisateur connecté est bien associé à l'hôpital
    if (hospital.hospital_admin_id !== hospital_admin_id_get) {
      return res.status(403).json({ error: 'You are not authorized to manage this hospital.' });
    }

    // Créer le département
    const department = new Department({ name, description, hospital_id });
    await department.save();

    return res.status(201).json({
      message: 'Département créé avec succès!',
      data: department,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Récupérer tous les départements
const getMyHospitalAllDepartments = async (req, res) => {
    try {
      const departments = await Department.find();
      return res.status(200).json({ data: departments });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};
  
// Récupérer tous les départements
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ data: departments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getDepartmentById = async (req, res) => {
    try {
      const { department_id } = req.body; // ID du département dans le corps de la requête

      // Décoder le JWT pour récupérer l'utilisateur connecté
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Authorization token is required.' });
      }
      const department = await Department.findById(department_id); // Recherche du département par ID
      if (!department) {
        return res.status(404).json({ message: 'Département non trouvé' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const hospital_admin_id_get = decoded.userId; // ID de l'utilisateur connecté
  
      // Vérifier si l'utilisateur connecté est bien lié à l'hôpital du département
      const hospital = await Hospital.findById(department.hospital_id);
      if (!hospital) {
        return res.status(404).json({ error: 'Hospital not found for this department.' });
      }
  
      if (hospital.hospital_admin_id.toString() !== hospital_admin_id_get.toString()) {
        return res.status(403).json({ error: 'You are not authorized to view this department.' });
      }
  
      return res.status(200).json({ data: department });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

const updateDepartment = async (req, res) => {
    try {
      const { department_id, name, description, hospital_id } = req.body; // ID du département et autres informations dans le corps de la requête
  
      // Décoder le JWT depuis l'en-tête Authorization
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Authorization token is required.' });
      }
  
      // Décoder le token pour obtenir l'utilisateur connecté
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      const hospital_admin_id_get = decoded.userId; // ID de l'utilisateur connecté
  
      // Récupérer le département à mettre à jour
      const department = await Department.findById(department_id); // Recherche par ID depuis le corps de la requête
      if (!department) {
        return res.status(404).json({ message: 'Département non trouvé' });
      }
  
      // Vérifier l'existence de l'hôpital et la liaison de l'utilisateur
      const hospital = await Hospital.findById(hospital_id);
      if (!hospital) {
        return res.status(404).json({ error: 'Hospital not found.' });
      }
  
      // Vérifier que l'utilisateur connecté est bien associé à l'hôpital
      if (hospital.hospital_admin_id.toString() !== hospital_admin_id_get.toString()) {
        return res.status(403).json({ error: 'You are not authorized to manage this hospital.' });
      }
  
      // Mettre à jour le département
      department.name = name;
      department.description = description;
      department.hospital_id = hospital_id;
  
      await department.save(); // Sauvegarder les changements
  
      return res.status(200).json({
        message: 'Département mis à jour avec succès!',
        data: department,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};
  
const deleteDepartment = async (req, res) => {
    try {
      const { department_id } = req.body; // ID du département dans le corps de la requête
  
      // Décoder le JWT depuis l'en-tête Authorization
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Authorization token is required.' });
      }
  
      // Décoder le token pour obtenir l'utilisateur connecté
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      const hospital_admin_id_get = decoded.userId; // ID de l'utilisateur connecté
  
      // Vérifier l'existence du département
      const department = await Department.findById(department_id); // Recherche par ID depuis le corps de la requête
      if (!department) {
        return res.status(404).json({ message: 'Département non trouvé' });
      }
  
      // Vérifier l'hôpital associé au département
      const hospital = await Hospital.findById(department.hospital_id);
      if (!hospital) {
        return res.status(404).json({ error: 'Hospital not found for this department.' });
      }
  
      // Vérifier que l'utilisateur est bien lié à l'hôpital
      if (hospital.hospital_admin_id.toString() !== hospital_admin_id_get.toString()) {
        return res.status(403).json({ error: 'You are not authorized to delete this department.' });
      }
  
      // Supprimer le département
      await Department.findByIdAndDelete(department_id); // Suppression par ID depuis le corps de la requête
  
      return res.status(200).json({
        message: 'Département supprimé avec succès!',
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};
   

module.exports = {
  createDepartment,
  getMyHospitalAllDepartments,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
