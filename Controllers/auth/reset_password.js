const { User } = require('../../config/database');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const { email, resetToken, otp, newPassword, confirmPassword } = req.body;

  // Vérifiez si tous les champs nécessaires sont présents
  if (!email || (!resetToken && !otp) || !newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "Tous les champs sont requis : email, resetToken ou otp, newPassword, confirmPassword.",
    });
  }

  // Vérifiez si les mots de passe correspondent
  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      message: "Les mots de passe ne correspondent pas.",
    });
  }

  try {
    // Trouver l'utilisateur correspondant à l'email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    // Vérification du resetToken ou de l'OTP
    if (resetToken) {
      // Vérifier si le resetToken est valide
      try {
        const decodedToken = jwt.verify(resetToken, process.env.JWT_SECRET);
        if (decodedToken.email !== email) {
          return res.status(403).json({ message: "Le token de réinitialisation est invalide." });
        }
      } catch (error) {
        return res.status(403).json({ message: "Le token de réinitialisation est invalide ou a expiré." });
      }
    } else if (otp) {
      // Vérifier si l'OTP est valide
      if (user.otp !== otp) {
        return res.status(400).json({ message: "OTP invalide ou déjà utilisé." });
      }

      // Marquer l'OTP comme utilisé
      user.is_otp_valid = true;
    }
    
    // Mettre à jour le mot de passe
    user.password = newPassword;

    // Sauvegarder les modifications (avec le hachage automatique du mot de passe via le middleware)
    await user.save();
      
    // Répondre avec succès
    return res.status(200).json({
      message: "Le mot de passe a été réinitialisé avec succès.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Une erreur est survenue lors de la réinitialisation du mot de passe.",
      error: "Une erreur interne est survenue, veuillez réessayer plus tard.",
    });
  }
};
