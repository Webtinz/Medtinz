const { User } = require('../../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = process.env.private_key;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
      const { name, email, username, type, password } = req.body;

      // Vérifier que tous les champs obligatoires sont présents
      if (!name || !email || !username || !type || !password) {
        return res.status(400).json({ message: "Tous les champs obligatoires doivent être fournis." });
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

      // Générer un token JWT pour l'utilisateur enregistré
      const token = jwt.sign(
        { userId: newUser._id },
        privateKey,
        { expiresIn: '24h' }
      );

      // Retourner une réponse réussie
      const { password: _, ...userWithoutPassword } = newUser._doc;
      return res.status(201).json({
        message: "L'utilisateur a été créé avec succès.",
        data: userWithoutPassword,
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
