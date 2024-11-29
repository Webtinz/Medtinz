const { User } = require('../../config/database');
const jwt = require('jsonwebtoken');
const privateKey = process.env.private_key; // Assurez-vous que `private_key` est bien défini dans vos variables d'environnement

module.exports = (router) => {
  // Définition de la route pour valider le token
  router.get('/validate-token/:token', async (req, res) => {
    const token = req.params.token;  // Le token envoyé dans l'URL via `:token`

    // console.log(token)

    if (!token) {
      return res.status(400).json({ message: "Token manquant." });
    }

    try {
      // Vérification du token
      const decoded = jwt.verify(token, privateKey);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }

      // Mise à jour de l'utilisateur pour valider l'OTP
      await User.findByIdAndUpdate(user._id, { is_otp_valid: true });
      
      // Rechercher l'utilisateur par email
      const userUpdate = await User.findById(decoded.userId);

      // Répondre avec un message de succès
      return res.status(200).json({ message: "Token validé et utilisateur mis à jour.", userUpdate });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur lors de la vérification du token.", error: error.message });
    }
  });
};
