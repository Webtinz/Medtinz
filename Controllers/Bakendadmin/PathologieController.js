const Pathologie = require('../../Models/Pathologie');

// Créer une nouvelle pathologie avec les noms en français et en anglais
exports.createPathologie = async (req, res) => {
    try {
        const { name_fr, name_en } = req.body;

        // Vérifier si la pathologie existe déjà avec les mêmes noms
        const existingPathologie = await Pathologie.findOne({ name_fr, name_en });
        if (existingPathologie) {
            return res.status(400).json({ message: 'Pathologie already exists in both languages' });
        }

        // Création de la pathologie
        const pathologie = new Pathologie({
            name_fr,
            name_en
        });

        await pathologie.save();
        res.status(201).json(pathologie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating pathologie', error: error.message });
    }
};

// Obtenir toutes les pathologies
exports.getAllPathologies = async (req, res) => {
    try {
        const pathologies = await Pathologie.find();
        if (pathologies.length === 0) {
            return res.status(404).json({ message: 'No pathologies found' });
        }
        res.status(200).json(pathologies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching pathologies', error: error.message });
    }
};

// Obtenir une pathologie par son ID
exports.getPathologieById = async (req, res) => {
    try {
        const { id } = req.params;
        const pathologie = await Pathologie.findById(id);

        if (!pathologie) {
            return res.status(404).json({ message: 'Pathologie not found' });
        }

        res.status(200).json(pathologie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching pathologie', error: error.message });
    }
};

// Mettre à jour une pathologie par son ID
exports.updatePathologie = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_fr, name_en } = req.body;

        const pathologie = await Pathologie.findById(id);
        if (!pathologie) {
            return res.status(404).json({ message: 'Pathologie not found' });
        }

        // Mettre à jour les noms en français et en anglais
        pathologie.name_fr = name_fr || pathologie.name_fr;
        pathologie.name_en = name_en || pathologie.name_en;
        await pathologie.save();

        res.status(200).json(pathologie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating pathologie', error: error.message });
    }
};

// Supprimer une pathologie par son ID
exports.deletePathologie = async (req, res) => {
    try {
        const { id } = req.params;

        const pathologie = await Pathologie.findByIdAndDelete(id);
        if (!pathologie) {
            return res.status(404).json({ message: 'Pathologie not found' });
        }

        res.status(200).json({ message: 'Pathologie deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting pathologie', error: error.message });
    }
};
