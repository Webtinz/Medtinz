const { User } = require('../../config/database');
const jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_SECRET; // Assurez-vous que `private_key` est bien défini dans vos variables d'environnement
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

// Middleware Multer
const uploadMiddleware = upload.single('picture'); // Middleware pour traiter un fichier "picture"

module.exports = (router) => {
  router.post('/verify-otp', uploadMiddleware, async (req, res) => {
    const { email, otp } = req.body;

    // Validation des champs
    if (!email) {
      return res.status(400).json({ message: "Email requis." });
    }
    if (!otp) {
      return res.status(400).json({ message: "OTP requis." });
    }

    try {
      // Rechercher l'utilisateur par email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }

      console.log(user.otp)
      console.log(parseInt(otp))
      // Vérifier l'OTP
      if (user.otp === parseInt(otp)) {
        // Mettre à jour le statut de validation de l'OTP
      // Rechercher l'utilisateur par email et mettre à jour directement is_otp_valid
      const user = await User.findOneAndUpdate(
        { email },  // Condition de recherche
        { $set: { is_otp_valid: true } },  // Mise à jour du champ
        { new: true }  // Retourner le document mis à jour
      );

        // Générer un token JWT
        const token = jwt.sign(
          { userId: user._id },
          privateKey,
          { expiresIn: '24h' }
        );
  
        const message = "OTP vérifié avec succès ! L'utilisateur a été connecté avec succès.";
        return res.status(200).json({ message, data: user, token });

        // return res.status(200).json({ message: "OTP vérifié avec succès." });
      } else {
        return res.status(400).json({ message: "OTP invalide." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur lors de la vérification de l'OTP.", error: error.message });
    }
  });
};
