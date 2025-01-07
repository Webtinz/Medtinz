const { User } = require('../../config/database');
const { sendMail } = require('../mails/mailController');
const jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_SECRET;

// Fonction pour générer un OTP aléatoire à 4 chiffres
function generateOTP() {
  return Math.floor(0 + Math.random() * 900000);
}

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
 const otp = generateOTP();

    // Utiliser findOneAndUpdate pour chercher et mettre à jour l'utilisateur
    const updatedUser = await User.findOneAndUpdate(
        { email: email },  // Condition pour trouver l'utilisateur
        { 
        otp: otp,            // Nouvelle valeur de l'OTP
        is_otp_valid: false, // Réinitialiser la validité de l'OTP
        },
        { new: true } // Cette option renvoie le document mis à jour au lieu de l'original
    );
    
    if (updatedUser) {
        // Si un utilisateur a été mis à jour
        return res.status(200).json({ message: 'OTP mis à jour avec succès', user: updatedUser });
    }
    const otpValidationToken = jwt.sign({ userId: user._id, otp }, privateKey, { expiresIn: '1h' });
    const otpValidationLink = `${process.env.BASE_URL}/api/validate-token/${otpValidationToken}`;

    const emailSubject = 'Nouveau code OTP';
    const emailText = `Votre nouveau code OTP est ${otp}.`;
    const emailHtml = `<p>Votre nouveau code OTP est <strong>${otp}</strong>.</p><p>Ou cliquez sur le lien suivant pour valider votre OTP :</p><a href="${otpValidationLink}">Valider mon OTP</a>`;

    await sendMail(email, emailSubject, emailText, emailHtml);

    return res.status(200).json({ message: "Un nouveau code OTP a été envoyé à votre adresse email." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de l'envoi de l'OTP.", error: error.message });
  }
};
