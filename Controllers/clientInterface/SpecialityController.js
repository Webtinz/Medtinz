const Specialty = require('../../Models/Specialty');
const Hospital = require('../../Models/Hospital');
const mongoose = require('mongoose');

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


exports.createSpecialty = async (req, res) => {
    try {
        const { name, description, departementId, hospital_id } = req.body;

        // Vérifier que l'ID de l'hôpital est fourni
        if (!hospital_id || !mongoose.Types.ObjectId.isValid(hospital_id)) {
            return res.status(400).json({ error: 'Invalid or missing hospital ID.' });
        }

        // Vérifier que l'hôpital existe dans la base de données
        const hospital = await Hospital.findById(hospital_id);
        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found.' });
        }

        // Créer la spécialité
        const specialty = new Specialty({
            name,
            description,
            departementId,
            hospital_id  // Ajout du champ hospital_id si nécessaire
        });

        // Sauvegarder la spécialité dans la base de données
        await specialty.save();

        // Répondre avec un message de succès
        res.status(201).json({ message: 'Spécialité créée avec succès.', specialty });
    } catch (error) {
        console.error(error);  // Pour déboguer
        res.status(400).json({ message: error.message });
    }
};

// Récupérer les spécialités par hospital_id
exports.getSpecialitiesByHospital = async (req, res) => {
    try {
        const hospitalId = req.params.hospitalId; // Récupérer l'ID de l'hôpital depuis les paramètres de l'URL

        // Trouver les spécialités qui correspondent à l'ID de l'hôpital
        const specialities = await Specialty.find({ hospital_id: hospitalId }); // Filtrer les spécialités par hospital_id

        // Si aucune spécialité n'est trouvée
        if (specialities.length === 0) {
            return res.status(404).json({ message: 'Aucune spécialité trouvée pour cet hôpital.' });
        }

        // Retourner les spécialités dans la réponse
        return res.status(200).json({ data: specialities });
    } catch (error) {
        // En cas d'erreur, retourner un message d'erreur avec un code 500
        return res.status(500).json({ message: error.message });
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
