const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Création des répertoires si non existants
const uploadDir = path.join(__dirname, '../uploads');
const processedDir = path.join(uploadDir, 'processed');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(processedDir)) fs.mkdirSync(processedDir);

// Schéma utilisateur
const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    lastname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
        trim: true,
    },
    firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        unique: true,
        trim: true,
    },
    title: {
        type: String,
        required: false,
        trim: true,
    },
    civility: {
        type: String,
        required: false,
        trim: true,
    },
    type: {
        type: String,
        required: false,
        trim: true,
    },
    picture: {
        type: String,
        validate: {
            validator: (value) => !value || /\.(jpg|jpeg|png|gif|svg)$/i.test(value),
            message: 'Le fichier doit avoir une extension valide (jpg, jpeg, png, gif, svg)!',
        },
        default: null,
    },
    role: { // Rôle de l'utilisateur (en lien avec le modèle Role)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', // Lien avec le modèle Role
        // required: true,
    },
    specialties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialty'
    }],
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    },
    contact: {
        phone: { type: String, required: false },
        phone2: { type: String, required: false },
        address: { type: String, required: false },
    },
    password: {
        type: String,
        required: true,
        maxlength: 128,  // Limite de 128 caractères
        validate: {
            validator: (value) =>{
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/.test(value);
            },
            message:
                'Le mot de passe doit contenir au moins 8 caractères, avec une majuscule, une minuscule, un chiffre, et un caractère spécial compris dans ce lot(@,#,$,!,%,*,?,&).',
        },
    },
    otp: {
        type: Number,
        default: null,
    },
    is_otp_valid: {
        type: Boolean,
        default: false,
    },
    hospital_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital', // Lien avec le modèle Hospital
        default: null,   // Par défaut, null
    },
    departementId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department', // Lien avec le modèle Department
        default: null,
    }],
}, {
    timestamps: true,
});

// Middleware pour hasher le mot de passe avant la sauvegarde
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Middleware pour traiter l'image avant la sauvegarde
userSchema.pre('save', async function (next) {
    if (this.isModified('picture') && this.picture) {
        const imagePath = this.picture;
        const extname = path.extname(imagePath).toLowerCase();
        
        // Vérifiez si l'extension est valide
        if (!/\.(jpg|jpeg|png|gif|svg)$/i.test(extname)) {
            return next(new Error('Le fichier doit avoir une extension valide (jpg, jpeg, png, gif, svg)!'));
        }

        // Chemin du fichier image original
        const filePath = path.join(uploadDir, imagePath);

        try {
            // Traitement de l'image avec sharp (redimensionnement, compression, etc.)
            await sharp(filePath)
                .toFile(path.join(processedDir, imagePath)); // Sauvegarder l'image traitée

            // Si l'image est traitée, vous pouvez supprimer l'original si nécessaire
            fs.unlinkSync(filePath); // Supprimer l'image originale

            // Mettre à jour le chemin de l'image traitée
            this.picture = path.join('uploads', 'processed', imagePath);

        } catch (error) {
            return next(error); // Gestion des erreurs lors du traitement de l'image
        }
    }
    next();
});

const User = mongoose.model('User', userSchema); // Modèle avec un seul rôle

module.exports = { User }; 
