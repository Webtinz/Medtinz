const { User } = require('../../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = process.env.private_key;
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Hospital = require('../../Models/Hospital');
 
// Créer le dossier uploads s'il n'existe pas
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configurer multer pour le téléchargement de l'image
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    const fileTypes = /\.(jpg|jpeg|png|gif|svg)$/i;
    if (!fileTypes.test(file.originalname)) {
      return cb(new Error('Extension de fichier invalide'), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // Limite à 5MB
  }
});

// Fonction pour générer un OTP aléatoire à 4 chiffres
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

// Fonction principale pour définir les routes
module.exports = (router) => {
  router.post('/register', (req, res, next) => {
    upload.single('picture')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      } else if (err) {
        return res.status(500).json({ message: err.message });
      }
      next();
    });
  }, async (req, res) => {
    try {
      const {
        name,
        email,
        username,
        type,
        password,
        hospital_name,
        hospital_country,
        hospital_state_province,
        hospital_city,
        hospital_phone,
        hospital_isActive,
        // hospital_admin_id,
      } = req.body;
      
      // Liste des champs obligatoires et leurs messages d'erreur
      const requiredFields = {
        name: "Le champ 'name' est obligatoire.",
        email: "Le champ 'email' est obligatoire.",
        username: "Le champ 'username' est obligatoire.",
        type: "Le champ 'type' est obligatoire.",
        password: "Le champ 'password' est obligatoire.",
        hospital_name: "Le champ 'hospital name' est obligatoire.",
        hospital_country: "Le champ 'hospital country' est obligatoire.",
        hospital_state_province: "Le champ 'hospital state province' est obligatoire.",
        hospital_city: "Le champ 'hospital city' est obligatoire.",
        hospital_phone: "Le champ 'hospital phone' est obligatoire.",
        // hospital_isActive: "Le champ 'hospital isActive' est obligatoire.",
        // hospital_admin_id: "Le champ 'hospital admin id' est obligatoire.",
      };
      
      // Trouver les champs manquants
      const missingFields = Object.keys(requiredFields).filter(
        (field) => !req.body[field]
      );
      
      // Si des champs sont manquants, renvoyer un message d'erreur
      if (missingFields.length > 0) {
        const errors = missingFields.map((field) => requiredFields[field]);
        return res.status(400).json({
          message: "Certains champs obligatoires sont manquants.",
          errors,
        });
      }
      
      // Tous les champs sont présents
      // return res.status(200).json({ message: "Tous les champs sont valides." });
      

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "Un utilisateur avec cet email existe déjà." });
      }
      const existingUserUname = await User.findOne({ username });
      if (existingUserUname) {
        return res.status(409).json({ message: "Un utilisateur avec ce nom d'utilisateur existe déjà." });
      }

      // Générer un OTP aléatoire à 4 chiffres
      const otp = generateOTP();

      // Créer un nouvel utilisateur avec OTP et is_otp_valid
      const newUser = new User({
        name,
        email,
        username,
        picture: req.file ? req.file.filename : null, // Stocker uniquement le nom du fichier
        type,
        password,
        otp, // Ajouter le code OTP
      });

      // Enregistrer l'utilisateur dans la base de données
      await newUser.save();



      // Récupérer l'ID du nouvel utilisateur
      const userIdGet = newUser._id;

      // Générer un token JWT pour l'utilisateur enregistré
      const token = jwt.sign(
        { userId: userIdGet },
        privateKey,
        { expiresIn: '24h' }
      );

      // Retourner une réponse réussie
      const { password: _, ...userWithoutPassword } = newUser._doc;

      req.body.hospital_admin_id = userIdGet; // Assigner l'ID de l'utilisateur récupéré au champ hospital_admin_id

      // Créer une nouvelle instance de l'hôpital
      const newHospital = new Hospital({
        hospital_name: req.body.hospital_name,
        hospital_country: req.body.hospital_country,
        hospital_state_province: req.body.hospital_state_province,
        hospital_city: req.body.hospital_city,
        hospital_phone: req.body.hospital_phone,
        hospital_admin_id: req.body.hospital_admin_id, // Inclure l'ID de l'administrateur
      });

      await newHospital.save();

      console.log('newUser: ' + newUser);
      console.log('newHospital: ' + newHospital);

      return res.status(201).json({
        message: "L'utilisateur a été créé avec succès.",
        userData: userWithoutPassword,
        hospitalData: newHospital,
        token,
        otp // Vous pouvez renvoyer l'OTP à l'utilisateur pour qu'il puisse le vérifier
      });
    } catch (error) {
      console.error(error);
      const message = "Une erreur est survenue lors de l'inscription.";
      return res.status(500).json({ message, error: error.message });
    }
  });
};
