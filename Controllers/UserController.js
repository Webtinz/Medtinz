const jwt = require('jsonwebtoken');
const { User } = require('../Models/user');
const { Role } = require('../Models/Role');
const { Hospital } = require('../Models/Hospital'); // Exemple de modèle pour l'hôpital

exports.addUser = async (req, res) => {
    try {
        // Décoder le JWT
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is required.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Vérification de l'utilisateur connecté
        const currentUser = await User.findById(userId).populate('role');
        if (!currentUser) {
            return res.status(401).json({ error: 'Utilisateur non trouvé.' });
        }

        // Vérifier si l'utilisateur a le rôle requis
        if (currentUser.role.name !== 'master admin' || currentUser.role.name !== 'admin') {
            return res.status(403).json({ error: 'Vous n\'avez pas les autorisations nécessaires.' });
        }

        // Vérification de l'hôpital
        const { hospitalId, email, name, username, role, specialties, contact, password } = req.body;

        if (!hospitalId) {
            return res.status(400).json({ error: 'L\'ID de l\'hôpital est requis.' });
        }

        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ error: 'Hôpital introuvable.' });
        }

        // Validation du rôle
        if (!role || !(await Role.findById(role))) {
            return res.status(400).json({ error: 'Le rôle fourni est invalide.' });
        }
        

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Un utilisateur avec cet email existe déjà." });
        }
        const existingUserUname = await User.findOne({ username });
        if (existingUserUname) {
            return res.status(409).json({ message: "Un utilisateur avec ce nom d'utilisateur existe déjà." });
        }

        // Création de l'utilisateur
        const newUser = new User({
            email,
            name,
            username,
            role,  // Un seul rôle
            specialties,
            contact,
            password,
        });

        await newUser.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès!', user: newUser });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Token invalide ou expiré.' });
        }

        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: 'Erreur de validation.', details: validationErrors });
        }

        res.status(500).json({ error: 'Une erreur est survenue.', details: error.message });
    }
};
