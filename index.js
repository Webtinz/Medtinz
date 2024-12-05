// src/app.js
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const cors = require('cors');
const webRoutes = require('./routes/webroutes');
const {connectDB} = require('./config/database');
const path = require('path');
const paymentRoute = require('./routes/paymentRoute');

require('dotenv').config();

const app = express();
app.use(cors())
    .use(express.json()) // Pour analyser les requêtes JSON
    .use(favicon(path.join(__dirname, 'favicon.ico')))
    .use(morgan('dev'))
    // Support des formulaires encodés en URL
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(express.urlencoded({ extended: true }))

app.use('/api', webRoutes);
app.use('/payment',paymentRoute);
// /payment/pay

// Routes Dynamiques
app.get('/teteyooo', (req, res) => {
    res.json('Hello Express AYOMAN 😊')
})

connectDB(); // Connexion à MongoDB

app.listen(5000, () => console.log('Server running on port 5000'));
