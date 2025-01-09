const nodemailer = require('nodemailer');
require('dotenv').config(); // Assurez-vous d'avoir le fichier .env pour les variables d'environnement

// Configurer le transporteur Nodemailer pour utiliser Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Utilisation de la variable d'environnement
    pass: process.env.EMAIL_PASS  // Utilisation de la variable d'environnement
  }
});

// Fonction pour envoyer un email
const sendMail = (to, subject, text, html) => {  
  const mailOptions = {
    from: process.env.EMAIL_USER, // Utilisation de l'email configuré dans le fichier .env
    to: to, // L'email du destinataire
    subject: subject, // Sujet de l'email
    text: text, // Corps de l'email en texte brut
    html: html // Corps de l'email en HTML (optionnel)
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erreur lors de l\'envoi de l\'email: ', error);
    } else {
      console.log('Email envoyé: ' + info.response);
    }
  });
};

module.exports = { sendMail };
