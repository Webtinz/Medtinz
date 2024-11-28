// src/config/database.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Pour hasher les mots de passe
const { User }  = require('../Models/user')
require('dotenv').config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Pas besoin des options ici
    console.log('Connected to MongoDB');

    // Réinitialiser la collection User (optionnel)
    // await User.deleteMany({}); // Supprime tous les utilisateurs existants

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username: 'AdminHMS' });
    if (existingUser) {
        console.log('L\'utilisateur existe déjà avec ce username');
    } else {
        myDefaultOtp = Math.floor(1000 + Math.random() * 9000) //.toString()
        // Création d'un utilisateur par défaut
        // const hashedPassword = await bcrypt.hash('AdmEvt@123', 10);
        const user = new User({
            username: 'AdminHMS',
            name: 'Degkof',
            email: 'degkofittiq@gmail.com',
            otp: myDefaultOtp,
            type: 4,
            password: 'AdmEvt@123'
        });
        await user.save();

        console.log('Utilisateur créé :', user.toJSON());
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

module.exports = { connectDB, User };
