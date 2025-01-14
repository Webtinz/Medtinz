const jwt = require('jsonwebtoken'); // Assurez-vous d'importer jwt
const { User } = require('../Models/user');
const Hospital = require('../Models/Hospital');
const Department = require('../Models/Department');
const bcrypt = require('bcrypt');

// Ajouter un utilisateur
exports.addUser = async (req, res) => {
    try {
        const { hospital_id, lastname, firstname, username, email, password, role, specialties, contact, picture, departementId } = req.body;

        
        // Décoder le JWT depuis l'en-tête Authorization
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is required.' });
        }
    
        // Décoder le token pour obtenir l'utilisateur connecté
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Remplacez `process.env.JWT_SECRET` par votre clé secrète
        const token_user_id = decoded.userId; // Assurez-vous que l'ID de l'utilisateur est présent dans le payload
        
        // Vérification si l'hôpital existe et si l'admin a bien l'autorisation
        const hospital = await Hospital.findById(hospital_id);
        
        // console.log("hopital adminId :" + hospital.hospital_admin_id.toString() );
        // console.log("req user id :" + token_user_id );

        if (!hospital || hospital.hospital_admin_id.toString() !== token_user_id) {
            return res.status(403).json({ message: 'Accès refusé. Vous n\'êtes pas administrateur de cet hôpital.' });
        }

        // Vérification de l'existence du département
        if (departementId && !await Department.findOne({ _id: departementId })) {
            return res.status(400).json({ message: 'Département non trouvé ou ne correspond pas à cet hôpital.' });
        }

        // Création de l'utilisateur
        const user = new User({
            lastname,
            firstname,
            username: username ?? '',
            email,
            password,
            role,
            specialties,
            contact,
            picture,
            hospital_id,
            departementId
        });

        // Sauvegarde de l'utilisateur
        await user.save();
        res.status(201).json({ message: 'Utilisateur ajouté avec succès.', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message  });
    }
};

// Obtenir les détails d'un utilisateur
exports.getUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Récupération de l'utilisateur
        const user = await User.findById(userId).populate('hospital_id departementId specialties');
        
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        
        // console.log(user);

        
        // Décoder le JWT depuis l'en-tête Authorization
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is required.' });
        }
    
        // Décoder le token pour obtenir l'utilisateur connecté
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Remplacez `process.env.JWT_SECRET` par votre clé secrète
        const token_user_id = decoded.userId; // Assurez-vous que l'ID de l'utilisateur est présent dans le payload
        

        // Vérification si l'utilisateur appartient à l'hôpital de l'admin connecté
        const hospital = await Hospital.findById(user.hospital_id);
        if (hospital.hospital_admin_id.toString() !== token_user_id) {
            return res.status(403).json({ message: 'Accès interdit à ces informations.' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message  });
    }
};

// Mettre à jour les détails d'un utilisateur
exports.updateUser = async (req, res) => {
    try {
        
        // Décoder le JWT depuis l'en-tête Authorization
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is required.' });
        }
    
        // Décoder le token pour obtenir l'utilisateur connecté
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Remplacez `process.env.JWT_SECRET` par votre clé secrète
        const token_user_id = decoded.userId; // Assurez-vous que l'ID de l'utilisateur est présent dans le payload
        

        const { userId } = req.params;
        const { hospital_id, lastname, firstname, username, email, password, role, specialties, contact, picture, departementId } = req.body;

        // Récupérer l'utilisateur à mettre à jour
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Vérification de l'hôpital et de l'autorisation
        const hospital = await Hospital.findById(hospital_id);
        if (!hospital || hospital.hospital_admin_id.toString() !== token_user_id) {
            return res.status(403).json({ message: 'Accès refusé. Vous n\'êtes pas administrateur de cet hôpital.' });
        }

        // Vérification de l'existence du département
        if (departementId && !await Department.findOne({ _id: departementId, hospital_id })) {
            return res.status(400).json({ message: 'Département non trouvé ou ne correspond pas à cet hôpital.' });
        }

        // Mise à jour des informations
        user.lastname = lastname || user.lastname;
        user.firstname = firstname || user.firstname;
        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password; // ? await bcrypt.hash(password, 10) : user.password;
        user.role = role || user.role;
        user.specialties = specialties || user.specialties;
        user.contact = contact || user.contact;
        user.picture = picture || user.picture;
        user.departementId = departementId || user.departementId;

        // Sauvegarde des modifications
        await user.save();
        res.status(200).json({ message: 'Utilisateur mis à jour avec succès.', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message  });
    }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        
        // Décoder le JWT depuis l'en-tête Authorization
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is required.' });
        }
    
        // Décoder le token pour obtenir l'utilisateur connecté
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Remplacez `process.env.JWT_SECRET` par votre clé secrète
        const token_user_id = decoded.userId; // Assurez-vous que l'ID de l'utilisateur est présent dans le payload
        

        const { userId } = req.params;

        // Récupérer l'utilisateur à supprimer
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Vérification de l'hôpital et de l'autorisation
        const hospital = await Hospital.findById(user.hospital_id);
        if (!hospital || hospital.hospital_admin_id.toString() !== token_user_id) {
            return res.status(403).json({ message: 'Accès refusé. Vous n\'êtes pas administrateur de cet hôpital.' });
        }

        // Suppression de l'utilisateur
        // const role = await Role.findByIdAndDelete(req.params.id);
        await user.deleteOne();
        res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message  });
    }
};

// Obtenir les utilisateurs d'un hôpital et d'un département
exports.getUsersByHospital = async (req, res) => {
    try {
        
        // Décoder le JWT depuis l'en-tête Authorization
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is required.' });
        }
    
        // Décoder le token pour obtenir l'utilisateur connecté
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Remplacez `process.env.JWT_SECRET` par votre clé secrète
        const token_user_id = decoded.userId; // Assurez-vous que l'ID de l'utilisateur est présent dans le payload
        

        const { hospital_id } = req.query;

        // Vérification de l'hôpital et de l'autorisation
        const hospital = await Hospital.findById(hospital_id);
        if (!hospital) {
            return res.status(403).json({ message: 'Accès refusé. Vous devez soumettre l\'identifiant de l\'hôpital.' });
        }
        if (hospital.hospital_admin_id.toString() !== token_user_id) {
            return res.status(403).json({ message: 'Accès refusé. Vous n\'êtes pas administrateur de cet hôpital.' });
        }

        // Récupération des utilisateurs
        const users = await User.find({ hospital_id })
                                .populate({
                                    path: 'hospital_id',
                                    select: '_id hospital_name' // Inclut uniquement _id et hospital_name
                                })
                                .populate({
                                    path: 'departementId',
                                    select: '_id name' // Inclut uniquement _id et name
                                })
                                .populate({
                                    path: 'role',
                                    select: '_id name' // Inclut uniquement _id et name
                                })
                                .populate({
                                    path: 'specialties',
                                    select: '_id name' // Inclut uniquement _id et name
                                });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message  });
    }
};
