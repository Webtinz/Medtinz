// controllers/hospitalController.js
const Hospital = require('../Models/Hospital'); 

// Ajouter un hôpital
exports.addHospital = async (req, res) => {
    try {
        const { name, address, phone } = req.body;
        const newHospital = new Hospital({ name, address, phone });
        await newHospital.save();
        res.status(201).json({ message: 'Hospital added successfully', hospital: newHospital });
    } catch (error) {
        res.status(500).json({ message: 'Error adding hospital', error: error.message });
    }
};

// Récupérer la liste des hôpitaux
exports.getHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.status(200).json(hospitals);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hospitals', error: error.message });
    }
};

// Désactiver un hôpital
exports.deactivateHospital = async (req, res) => {
    try {
        const { hospitalId } = req.params;
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        hospital.isActive = false;
        await hospital.save();
        res.status(200).json({ message: 'Hospital deactivated successfully', hospital });
    } catch (error) {
        res.status(500).json({ message: 'Error deactivating hospital', error: error.message });
    }
};
