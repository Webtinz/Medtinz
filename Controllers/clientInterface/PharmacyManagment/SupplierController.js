const Supplier = require('../../../Models/Supplier'); 
const Hospital = require('../../../Models/Hospital'); 

// Créer un fournisseur
exports.createSupplier = async (req, res) => {
    try {
        const { hospitalId, name, contactName, contactEmail, contactPhone, address } = req.body;

        // Vérifier si l'hôpital existe
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        const newSupplier = new Supplier({
            hospitalId,
            name,
            contactName,
            contactEmail,
            contactPhone,
            address,
        });

        await newSupplier.save();

        res.status(201).json({
            message: 'Supplier created successfully',
            supplier: newSupplier,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating supplier', error: error.message });
    }
};

// Récupérer tous les fournisseurs
exports.getAllSuppliers = async (req, res) => {
    try {
        const { hospitalId } = req.query;  

        const query = hospitalId ? { hospitalId } : {}; 

        const suppliers = await Supplier.find(query).populate('hospitalId'); 

        res.status(200).json(suppliers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching suppliers', error: error.message });
    }
};

// Récupérer un fournisseur par ID
exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id).populate('hospitalId'); // Remplir les données de l'hôpital

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json(supplier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching supplier', error: error.message });
    }
};

// Mettre à jour un fournisseur
exports.updateSupplier = async (req, res) => {
    try {
        const { name, contactName, contactEmail, contactPhone, address, hospitalId } = req.body;

        // Vérifier si l'hôpital existe
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        const supplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            {
                name,
                contactName,
                contactEmail,
                contactPhone,
                address,
                hospitalId,
            },
            { new: true } // Retourner le fournisseur mis à jour
        );

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json({
            message: 'Supplier updated successfully',
            supplier,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating supplier', error: error.message });
    }
};

// Supprimer un fournisseur
exports.deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting supplier', error: error.message });
    }
};
