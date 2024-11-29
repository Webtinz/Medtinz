// controllers/hospitalController.js
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Hospital = require('../Models/Hospital'); 
const Subscription = require('../Models/Subscription'); 

// Ajouter un hôpital
exports.addHospital = async (req, res) => {
    try {
        // Décoder le JWT depuis l'en-tête Authorization
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is required.' });
        }

        // Décoder le token pour obtenir l'utilisateur connecté
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Remplacez `process.env.JWT_SECRET` par votre clé secrète
        const hospital_admin_id = decoded.userId; // Assurez-vous que l'ID de l'utilisateur est présent dans le payload

        const { hospital_name, hospital_country,hospital_state_province,hospital_city, hospital_phone } = req.body;
        const newHospital = new Hospital({ hospital_name, hospital_country, hospital_state_province, hospital_city, hospital_phone, hospital_admin_id });
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
        res.status(500).json({
            message: 'Error fetching hospitals',
            error: error.message
        });
    }
};

// Désactiver un hôpital
exports.deactivateHospital = async (req, res) => {
    try {
        const { hospitalId } = req.params;

        // Vérifier si l'identifiant est valide
        if (!hospitalId) {
            return res.status(400).json({ error: 'Hospital ID is required.' });
        }

        const hospital = await Hospital.findById(hospitalId);

        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found.' });
        }

        // Désactiver l'hôpital
        hospital.hospital_isActive = false;
        await hospital.save();

        res.status(200).json({
            message: 'Hospital deactivated successfully',
            hospital
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deactivating hospital',
            error: error.message
        });
    }
}


// Choose plan
exports.selectHospitalPlan = async (req, res) => {
    const { hospitalSpecId, subscription_id: selectPlanParam } = req.body;

    // Vérification si hospitalSpecId est défini
    if (!hospitalSpecId) {
        return res.status(400).json({ error: 'hospitalSpecId parameter is required.' });
    }

    // Vérification si l'ID est un ObjectId valide
    if (!mongoose.Types.ObjectId.isValid(selectPlanParam)) {
        return res.status(400).json({ message: 'The Subscription\'s plan that you selected is wrong.' });
    }

    try {
        // Décoder le JWT depuis l'en-tête Authorization
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is required.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Rechercher l'hôpital correspondant
        const hospital = await Hospital.findOne({ hospital_spec_id: hospitalSpecId });

        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found.' });
        }

        if (hospital.hospital_admin_id !== userId) {
            return res.status(403).json({ message: 'You are not authorized to access this hospital.' });
        }

        // Rechercher le plan sélectionné
        const planChoose = await Subscription.findOne({ _id: selectPlanParam });

        if (!planChoose) {
            return res.status(400).json({ message: 'You did not select an existing plan.' });
        }


        // Mettre à jour le champ subscription_id de l'hôpital
        hospital.subscription_id = selectPlanParam;
        await hospital.save();

        return res.status(200).json(hospital);
    } catch (error) {
        return res.status(500).json({ error: error.message || 'An error occurred while processing your request.' });
    }

};