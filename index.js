const express = require('express');
const cors = require('cors');
const webRoutes = require('./routes/webroutes');
const clinicAdmin = require('./routes/clinicadmin');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Pour analyser les requêtes JSON
app.use('/api', webRoutes);  // Routes d'API principales
app.use('/clinic', clinicAdmin);  // Routes de gestion de la clinique

// Connexion à la base de données MongoDB
connectDB();

// Lancer le serveur
app.listen(5000, () => console.log('Server running on port 5000'));
