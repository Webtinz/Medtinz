const { User } = require('../../config/database');
const { sendMail } = require('../mails/mailController');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const privateKey = process.env.JWT_SECRET;

// Fonction pour générer un OTP aléatoire à 4 chiffres
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
  }
  
// Fonction pour l'oubli de mot de passe
module.exports = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Le champ 'email' est obligatoire." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Générer un OTP
    const otp = generateOTP();

    // Mettre à jour l'utilisateur avec le nouvel OTP
    await User.findOneAndUpdate(
      { email },
      { 
        otp: otp, 
        // is_otp_valid: false // Réinitialiser la validité de l'OTP
      },
      { new: true }
    );

    // Lien pour réinitialiser le mot de passe avec JWT (optionnel si OTP est utilisé)
    const resetToken = jwt.sign({ userId: user._id }, privateKey, { expiresIn: '1h' });
    const resetPasswordLink = `${process.env.BASE_URL}/reset-password/${resetToken}`;

    // Texte et HTML du mail pour l'OTP
    const emailSubject = 'Réinitialisation de votre mot de passe';
    const emailText = `Votre code OTP pour réinitialiser votre mot de passe est : ${otp}. 
    Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer ce message.`;
    
    const emailHtml = `
      <p>Votre code OTP pour réinitialiser votre mot de passe est : <strong>${otp}</strong></p>
      <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer ce message.</p>
      <p>Ou cliquez sur ce lien pour réinitialiser votre mot de passe : <a href="${resetPasswordLink}">Réinitialiser mon mot de passe</a></p>
    `;

    // Envoyer l'email avec l'OTP
    await sendMail(email, emailSubject, emailText, emailHtml);

    return res.status(200).json({ message: "Un code OTP de réinitialisation a été envoyé à votre adresse email.", otp: otp });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la demande de réinitialisation.", error: error.message });
  }
};
