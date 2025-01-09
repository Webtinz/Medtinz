const Specialty = require('../../Models/Specialty');
const { Hospital } = require('../../Models/Hospital');

// Vérifie si l'utilisateur authentifié est l'admin de l'hôpital
async function verifyHospitalOwnership(hospitalId, userId) {
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
        throw new Error("L'hôpital spécifié n'existe pas.");
    }
    if (hospital.hospital_admin_id.toString() !== userId.toString()) {
        throw new Error("Vous n'êtes pas autorisé à gérer cet hôpital.");
    }
}

// Créer une spécialité
exports.createSpecialty = async (req, res) => {
    try {
        const { name, description, departementId, hospital_id } = req.body;
        
        // console.log(req.body);

        // Vérification de l'autorisation de l'hôpital seulement si hospital_id est défini
        if (hospital_id) {
            await verifyHospitalOwnership(hospital_id, req.user.id);
        }

        const specialty = new Specialty({
            name,
            description,
            departementId,
            hospital_id // Ajout du champ hospital_id si nécessaire
        });
        await specialty.save();

        res.status(201).json({ message: 'Spécialité créée avec succès.', specialty });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lire toutes les spécialités
exports.getAllSpecialties = async (req, res) => {
    try {
        const specialties = await Specialty.find();
        res.status(200).json(specialties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lire toutes les spécialités par département spécifié
exports.getAllSpecialtiesByDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;

        // Requête pour filtrer les spécialités par département
        const specialties = await Specialty.find({ departementId });
        res.status(200).json(specialties);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lire une spécialité par ID
exports.getSpecialtyById = async (req, res) => {
    try {
        const { id } = req.params;
        const specialty = await Specialty.findById(id);

        if (!specialty) {
            return res.status(404).json({ message: 'Spécialité non trouvée.' });
        }

        // Vous pouvez ajouter la vérification de l'hôpital ici si nécessaire
        // await verifyHospitalOwnership(specialty.hospital_id, req.user.id);

        res.status(200).json(specialty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Rechercher des spécialités par nom
exports.searchSpecialtiesByName = async (req, res) => {
    try {
        const { name } = req.query;
        const specialties = await Specialty.find({ name: { $regex: name, $options: 'i' } });
        res.status(200).json(specialties);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mettre à jour une spécialité
exports.updateSpecialtyById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, departementId, hospital_id } = req.body;

        const specialty = await Specialty.findById(id);
        if (!specialty) {
            return res.status(404).json({ message: 'Spécialité non trouvée.' });
        }

        // Vérification de l'autorisation de l'hôpital avant la mise à jour, si hospital_id est défini
        if (hospital_id) {
            await verifyHospitalOwnership(hospital_id, req.user.id);
        }

        specialty.name = name || specialty.name;
        specialty.description = description || specialty.description;
        specialty.departementId = departementId || specialty.departementId;
        specialty.hospital_id = hospital_id || specialty.hospital_id;

        await specialty.save();
        res.status(200).json({ message: 'Spécialité mise à jour avec succès.', specialty });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une spécialité
exports.deleteSpecialtyById = async (req, res) => {
    try {
        const { id } = req.params;
        const { hospital_id } = req.body;

        const specialty = await Specialty.findById(id);
        if (!specialty) {
            return res.status(404).json({ message: 'Spécialité non trouvée.' });
        }

        // Vérification de l'autorisation de l'hôpital avant la suppression, si hospital_id est défini
        if (hospital_id) {
            await verifyHospitalOwnership(hospital_id, req.user.id);
        }

        await Specialty.findByIdAndDelete(id);
        res.status(200).json({ message: 'Spécialité supprimée avec succès.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
