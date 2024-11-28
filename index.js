// src/app.js
const express = require('express');
const cors = require('cors');
const webRoutes = require('./routes/webroutes');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Pour analyser les requêtes JSON
app.use('/api', webRoutes);

connectDB(); // Connexion à MongoDB

app.listen(5000, () => console.log('Server running on port 5000'));
