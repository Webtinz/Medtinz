const { Feature } = require('../Models/Feature');

// Créer un rôle
exports.createFeature = async (req, res) => {
    try {
        const { name, description } = req.body;
        const feature = new Feature({ name, description });
        await feature.save();
        res.status(201).json(feature);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lire tous les rôles
exports.getAllFeatures = async (req, res) => {
    try {
        const features = await Feature.find();
        res.json(features);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lire un rôle par ID
exports.getFeatureById = async (req, res) => {
    try {
        const feature = await Feature.findById(req.params.id);
        if (!feature) {
            return res.status(404).json({ message: 'Feature non trouvé' });
        }
        res.json(feature);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Rechercher des rôles par similarité de nom
exports.searchFeaturesByName = async (req, res) => {
    try {
        const { name } = req.query; // Récupère le paramètre 'name' dans la requête
        if (!name) {
            return res.status(400).json({ message: 'Le paramètre "name" est requis.' });
        }

        // Créer une expression régulière insensible à la casse et convertir le nom en minuscule
        const regex = new RegExp(name.toLowerCase(), 'i');

        // Rechercher les rôles dont le nom correspond au pattern
        const features = await Feature.find({ name: { $regex: regex } });

        if (features.length === 0) {
            return res.status(404).json({ message: 'Aucun rôle correspondant trouvé.' });
        }

        res.json(features);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Mettre à jour un rôle par ID
exports.updateFeatureById = async (req, res) => {
    try {
        const { name, description } = req.body;
        const feature = await Feature.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true, runValidators: true }
        );
        if (!feature) {
            return res.status(404).json({ message: 'Feature non trouvé' });
        }
        res.json(feature);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un rôle par ID
exports.deleteFeatureById = async (req, res) => {
    try {
        const feature = await Feature.findByIdAndDelete(req.params.id);
        if (!feature) {
            return res.status(404).json({ message: 'Feature non trouvé' });
        }
        res.json({ message: 'Feature supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
