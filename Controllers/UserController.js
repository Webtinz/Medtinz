const jwt = require('jsonwebtoken'); // Assurez-vous d'importer jwt
const { User } = require('../Models/user');
const Hospital = require('../Models/Hospital');
const Department = require('../Models/Department');
const bcrypt = require('bcrypt');

// Ajouter un utilisateur
exports.addUser = async (req, res) => {
    try {
        const { hospital_id, lastname, firstname, username, email, password, role, specialties, contact, picture, departementId, civility, type } = req.body;

        
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
            departementId,
            civility: civility ?? '',
            type: type ?? ''
        });

        // Sauvegarde de l'utilisateur
        await user.save();
        res.status(200).json({ message: 'Utilisateur ajouté avec succès.', user });
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
        const user = await User.findById(userId).populate('hospital_id departementId specialties role');
        
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

// Récupérer les détails du profil de l'utilisateur connecté
exports.getProfileDetails = async (req, res) => {
    try {
        // Récupérer le token depuis l'en-tête Authorization
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is required.' });
        }

        // Décoder le token pour obtenir l'ID de l'utilisateur connecté
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Assurez-vous que votre clé secrète est correcte
        const userId = decoded.userId;

        if (!userId) {
            return res.status(400).json({ error: "Invalid token: userId not found." });
        }

        // Récupérer les informations de l'utilisateur
        const user = await User.findById(userId).populate('hospital_id departementId specialties role');

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Retourner les informations de l'utilisateur
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message });
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
        const { hospital_id, lastname, firstname, username, email, password, role, specialties, contact, picture, departementId, civility, type } = req.body;

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
        if (departementId && !await Department.findOne({ _id: departementId })) {
            return res.status(400).json({ message: 'Département non trouvé!' });
        }
        

        // Préparer les champs à mettre à jour
        const updates = {
            lastname: lastname || user.lastname,
            firstname: firstname || user.firstname,
            username: username || user.username,
            email: email || user.email,
            role: role || user.role,
            specialties: specialties || user.specialties,
            contact: contact || user.contact,
            picture: picture || user.picture,
            departementId: departementId || user.departementId,
            civility: civility || user.civility,
            type: type || user.type,
        };

        // Mettre à jour le mot de passe uniquement s'il est fourni
        if (password) {
            updates.password = password;
        }

        // Mise à jour de l'utilisateur
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $set: updates },
            { new: true, runValidators: true }
        );
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
// exports.getUsersByHospital = async (req, res) => {
//     try {
        
//         // Décoder le JWT depuis l'en-tête Authorization
//         const token = req.headers.authorization?.split(' ')[1];
//         if (!token) {
//             return res.status(401).json({ error: 'Authorization token is required.' });
//         }
    
//         // Décoder le token pour obtenir l'utilisateur connecté
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Remplacez `process.env.JWT_SECRET` par votre clé secrète
//         const token_user_id = decoded.userId; // Assurez-vous que l'ID de l'utilisateur est présent dans le payload
        

//         const { hospital_id } = req.query;

//         // Vérification de l'hôpital et de l'autorisation
//         const hospital = await Hospital.findById(hospital_id);
//         if (!hospital) {
//             return res.status(403).json({ message: 'Accès refusé. Vous devez soumettre l\'identifiant de l\'hôpital.' });
//         }
//         if (hospital.hospital_admin_id.toString() !== token_user_id) {
//             return res.status(403).json({ message: 'Accès refusé. Vous n\'êtes pas administrateur de cet hôpital.' });
//         }

//         // Récupération des utilisateurs
//         const users = await User.find({ hospital_id })
//                                 .populate({
//                                     path: 'hospital_id',
//                                     select: '_id hospital_name' // Inclut uniquement _id et hospital_name
//                                 })
//                                 .populate({
//                                     path: 'departementId',
//                                     select: '_id name' // Inclut uniquement _id et name
//                                 })
//                                 .populate({
//                                     path: 'role',
//                                     select: '_id name' // Inclut uniquement _id et name
//                                 })
//                                 .populate({
//                                     path: 'specialties',
//                                     select: '_id name' // Inclut uniquement _id et name
//                                 });

//         res.status(200).json(users);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: "error", message: error.message  });
//     }
// };

exports.getUsersByHospital = async (req, res) => {
    try {
        // Récupérer le tableau d'identifiants depuis les paramètres
        const { hospital_id } = req.query;

        if (!hospital_id) {
            return res.status(400).json({ message: 'Hospital IDs are required.' });
        }

        // Convertir la chaîne en tableau
        const hospitalIdArray = hospital_id.split(',');

        // Décoder le token pour vérifier l'autorisation
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is required.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const token_user_id = decoded.userId;

        // Vérifier que l'utilisateur est administrateur pour au moins un hôpital
        const hospitals = await Hospital.find({
            _id: { $in: hospitalIdArray },
            hospital_admin_id: token_user_id
        });

        if (!hospitals.length) {
            return res.status(403).json({ message: 'Access denied. You are not an admin for any of the specified hospitals.' });
        }

        // Récupérer les utilisateurs pour ces hôpitaux
        const users = await User.find({ hospital_id: { $in: hospitalIdArray } })
            .populate({
                path: 'hospital_id',
                select: '_id hospital_name'
            })
            .populate({
                path: 'departementId',
                select: '_id name'
            })
            .populate({
                path: 'role',
                select: '_id name'
            })
            .populate({
                path: 'specialties',
                select: '_id name'
            });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


