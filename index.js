const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const webRoutes = require('./routes/webroutes');
const paymentRoute = require('./routes/paymentRoute');
const clinicAdmin = require('./routes/clinicadmin');
const {connectDB} = require('./config/database');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();

// Middleware
app
.use(cors())
.use(morgan('dev'))

app.use(express.json()); // Pour analyser les requêtes JSON
app.use('/api', webRoutes);  // Routes d'API principales
app.use('/payment',paymentRoute);
app.use('/clinic', clinicAdmin);  // Routes de gestion de la clinique

/* Start code for call */

// Définir le dossier public comme dossier contenant les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route pour servir la page HTML
app.get('/call', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/join-call', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'join.html'));
});

// Connexion à la base de données MongoDB
connectDB();

// Lancer le serveur
app.listen(5000, () => console.log('Server running on port 5000'));
