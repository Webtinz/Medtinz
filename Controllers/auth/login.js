const { User } = require('../../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = process.env.private_key; // Assurez-vous que `private_key` est bien défini dans vos variables d'environnement
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { json } = require('body-parser');

// Créer le dossier uploads s'il n'existe pas
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configurer multer pour le téléchargement de l'image
const upload = multer({
  storage: multer.memoryStorage(),
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

// Fonction principale pour définir les routes
module.exports = (router) => {
  router.post('/login', (req, res, next) => {
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
      const { email, password } = req.body;

      // Vérifier que tous les champs obligatoires sont présents
      if (!email || !password) {
        return res.status(400).json({ message: "L'email et le mot de passe sont obligatoires." });
      }

      // Rechercher l'utilisateur par email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Cet utilisateur n'existe pas sur notre plateforme." });
      }
      if (user.is_otp_valid === false) {
        return res.status(409).json({ message: "Vous devez proceder a la validation par otp." });
        // console.log(user.is_otp_valid)
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Le mot de passe est incorrect." });
      }

      // Générer un token JWT
      const token = jwt.sign(
        { userId: user._id },
        privateKey,
        { expiresIn: '24h' }
      );

      const message = "L'utilisateur a été connecté avec succès.";
      return res.json({ message, data: user, token });
    } catch (error) {
      console.error(error);
      const message = "Une erreur est survenue lors de la connexion. Veuillez réessayer.";
      return res.status(500).json({ message, error: error.message });
    }
  });
};
