const { Role } = require('../Models/Role');

// Créer un rôle
exports.createRole = async (req, res) => {
    try {
        const { name, description } = req.body;
        const role = new Role({ name, description });
        await role.save();
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lire tous les rôles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lire un rôle par ID
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Rôle non trouvé' });
        }
        res.json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Rechercher des rôles par similarité de nom
exports.searchRolesByName = async (req, res) => {
    try {
        const { name } = req.query; // Récupère le paramètre 'name' dans la requête
        if (!name) {
            return res.status(400).json({ message: 'Le paramètre "name" est requis.' });
        }

        // Créer une expression régulière insensible à la casse et convertir le nom en minuscule
        const regex = new RegExp(name.toLowerCase(), 'i');

        // Rechercher les rôles dont le nom correspond au pattern
        const roles = await Role.find({ name: { $regex: regex } });

        if (roles.length === 0) {
            return res.status(404).json({ message: 'Aucun rôle correspondant trouvé.' });
        }

        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Mettre à jour un rôle par ID
exports.updateRoleById = async (req, res) => {
    try {
        const { name, description } = req.body;
        const role = await Role.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true, runValidators: true }
        );
        if (!role) {
            return res.status(404).json({ message: 'Rôle non trouvé' });
        }
        res.json(role);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un rôle par ID
exports.deleteRoleById = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Rôle non trouvé' });
        }
        res.json({ message: 'Rôle supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
