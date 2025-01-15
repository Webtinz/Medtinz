const Department = require('../../Models/Department');
const Hospital = require('../../Models/Hospital');

const { v4: uuidv4 } = require('uuid');

// Créer un département
const createDepartment = async (req, res) => {
  try {
    const { name, description, hospital_id, price_consult } = req.body;

    // Vérifier que l'ID de l'hôpital est fourni
    if (!hospital_id) {
      return res.status(400).json({ error: 'Hospital ID is required.' });
    }

    // Vérifier que l'hôpital existe dans la base de données
    const hospital = await Hospital.findById(hospital_id);
    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found.' });
    }

    // Créer un département avec les données fournies
    const department = new Department({
      name,
      description,
      hospital_id,
      price_consult,
      codeDep: `DEP-${uuidv4().slice(0, 4).toUpperCase()}`, // Générer un code unique pour chaque département
    });

    // Sauvegarder le département
    await department.save();

    // Réponse en cas de succès
    return res.status(201).json({
      message: 'Département créé avec succès!',
      data: department,
    });
  } catch (error) {
    // Gestion des erreurs
    console.error('Error creating department:', error);
    return res.status(500).json({ message: 'Erreur lors de la création du département.' });
  }
};

// Backend : Récupérer la liste des départements associés à un hôpital
const getDepartments = async (req, res) => {
  try {
    const hospitalId = req.params.hospitalId;
    const hospital = await Hospital.findById(hospitalId).populate('departments');
    
    if (!hospital) {
      return res.status(404).json({ error: 'Hôpital non trouvé' });
    }

    return res.status(200).json(hospital.departments); // Retourner la liste des départements
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Backend - Récupérer les départements par hospital_id
const getDepartmentsByHospital = async (req, res) => {
  try {
    const hospitalId = req.params.hospitalId; // Récupérer l'ID de l'hôpital depuis les paramètres

    const departments = await Department.find({ hospital_id: hospitalId }); // Filtrer les départements par hospital_id

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

// Récupérer un département par ID
const getDepartmentById = async (req, res) => {
  try {
    const { department_id } = req.params;

    const department = await Department.findById(department_id);
    if (!department) {
      return res.status(404).json({ message: 'Département non trouvé' });
    }

    return res.status(200).json({ data: department });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un département
const updateDepartment = async (req, res) => {
  try {
    const { department_id, name, description, hospital_id } = req.body;

    const department = await Department.findById(department_id);
    if (!department) {
      return res.status(404).json({ message: 'Département non trouvé' });
    }

    if (hospital_id) {
      const hospital = await Hospital.findById(hospital_id);
      if (!hospital) {
        return res.status(404).json({ error: 'Hospital not found.' });
      }
    }

    department.name = name || department.name;
    department.description = description || department.description;
    department.hospital_id = hospital_id || department.hospital_id;

    await department.save();

    return res.status(200).json({
      message: 'Département mis à jour avec succès!',
      data: department,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Supprimer un département
const deleteDepartment = async (req, res) => {
  try {
    const { department_id } = req.body;

    const department = await Department.findById(department_id);
    if (!department) {
      return res.status(404).json({ message: 'Département non trouvé' });
    }

    await Department.findByIdAndDelete(department_id);

    return res.status(200).json({
      message: 'Département supprimé avec succès!',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  getDepartmentsByHospital,
};
