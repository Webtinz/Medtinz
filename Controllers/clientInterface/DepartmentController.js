const Department = require('../../Models/Department');
const Hospital = require('../../Models/Hospital');

// Créer un département
const createDepartment = async (req, res) => {
  try {
    const { name, description, hospital_id } = req.body;

    if (hospital_id) {
      const hospital = await Hospital.findById(hospital_id);
      if (!hospital) {
        return res.status(404).json({ error: 'Hospital not found.' });
      }
    }

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
};
