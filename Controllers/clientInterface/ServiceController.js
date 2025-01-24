const Service = require('../../Models/Service');
const Speciality = require('../../Models/Specialty');
const Hospital = require('../../Models/Hospital');

const { v4: uuidv4 } = require('uuid');

// Créer un département
const createService = async (req, res) => {
  try {
    const { name, description, hospital_id, price_service , specialityId } = req.body;

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
    const service = new Service({
      name,
      description,
      hospital_id,
      price_service,
      specialityId,
      codeSer: `SERVICE-${uuidv4().slice(0, 6).toUpperCase()}`, // Générer un code unique pour chaque département
    });

    // Sauvegarder le département
    await service.save();

    // Réponse en cas de succès
    return res.status(201).json({
      message: 'Service créé avec succès!',
      data: service,
    });
  } catch (error) {
    // Gestion des erreurs
    console.error('Error creating service:', error);
    return res.status(500).json({ message: 'Erreur lors de la création du service.' });
  }
};


// Backend - Récupérer les départements par hospital_id
const getServicesByHospital = async (req, res) => {
  try {
    const hospitalId = req.params.hospitalId; // Récupérer l'ID de l'hôpital depuis les paramètres

    const services = await Service.find({ hospital_id: hospitalId }); 

    return res.status(200).json({ data: services });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Récupérer tous les services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    return res.status(200).json({ data: services });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Récupérer un service par ID
const getServiceById = async (req, res) => {
  try {
    const { service_id } = req.params;

    const service = await Service.findById(service_id);
    if (!service) {
      return res.status(404).json({ message: 'Service non trouvé' });
    }

    return res.status(200).json({ data: service });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un service
// const updateDepartment = async (req, res) => {
//   try {
//     const { department_id, name, description, hospital_id } = req.body;

//     const department = await Department.findById(department_id);
//     if (!department) {
//       return res.status(404).json({ message: 'Département non trouvé' });
//     }

//     if (hospital_id) {
//       const hospital = await Hospital.findById(hospital_id);
//       if (!hospital) {
//         return res.status(404).json({ error: 'Hospital not found.' });
//       }
//     }

//     department.name = name || department.name;
//     department.description = description || department.description;
//     department.hospital_id = hospital_id || department.hospital_id;

//     await department.save();

//     return res.status(200).json({
//       message: 'Département mis à jour avec succès!',
//       data: department,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// Supprimer un département
// const deleteDepartment = async (req, res) => {
//   try {
//     const { department_id } = req.body;

//     const department = await Department.findById(department_id);
//     if (!department) {
//       return res.status(404).json({ message: 'Département non trouvé' });
//     }

//     await Department.findByIdAndDelete(department_id);

//     return res.status(200).json({
//       message: 'Département supprimé avec succès!',
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  createService,
  getServicesByHospital,
  getAllServices,
  getServiceById,
//   deleteDepartment,
//   getDepartmentsByHospital,
};
