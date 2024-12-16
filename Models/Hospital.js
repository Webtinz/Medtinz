const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Création des répertoires si non existants
const uploadDir = path.join(__dirname, '../uploads/hospitals_logo');
const processedDir = path.join(uploadDir, 'processed');

// Vérification et création récursive
function ensureDirectoryExistence(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

ensureDirectoryExistence(uploadDir);
ensureDirectoryExistence(processedDir);

const hospitalSchema = new mongoose.Schema({
  hospital_spec_id: { 
    type: String, 
    required: true,
    unique: true // Assure l'unicité de ce champ
  },
  hospital_name: { 
    type: String, 
    required: true ,
    unique: true // Assure l'unicité de ce champ
  },
  hospital_country: {
    type: String, 
    required: true 
  },
  hospital_state_province: {
    type: String, 
    required: true 
  },
  hospital_city: {
    type: String, 
    required: true
  },
  hospital_phone: {
    type: String, 
    required: true ,
    unique: true // Assure l'unicité de ce champ
  },
  hospital_isActive: { 
    type: Boolean,
    default: false 
  },
  hospital_admin_id: { 
    type: String, 
    // default: true 
  },
  subscription_id: {
    type: String, 
    default: null 
  },
  is_hospital_suscribed: {
    type: Boolean, 
    default: false 
  },
  logo: {
    type: String,
    validate: {
        validator: (value) => !value || /\.(jpg|jpeg|png|gif|svg)$/i.test(value), // Validation d'extension
        message: 'Le fichier doit avoir une extension valide (jpg, jpeg, png, gif, svg)!',
    },
    default: null,
  }
},{
  timestamps: true,
});


hospitalSchema.pre('validate', async function (next) {
  if (!this.hospital_spec_id) {
    let isUnique = false;
    while (!isUnique) {
      // Trouver le dernier hospital_spec_id dans la base de données
      const lastHospital = await mongoose.models.Hospital.findOne().sort({ hospital_spec_id: -1 }).limit(1);
      
      let newId = 'hms-clinic-000001'; // ID par défaut si aucun hôpital n'existe
      if (lastHospital) {
        // Extraire la partie numérique de l'ID existant
        const lastIdNumber = parseInt(lastHospital.hospital_spec_id.replace('hms-clinic-', ''));
        
        // Incrémenter cette valeur
        const incrementedIdNumber = lastIdNumber + 1;
        
        // Formater l'ID pour qu'il ait 6 chiffres
        newId = `hms-clinic-${incrementedIdNumber.toString().padStart(6, '0')}`;
      }
      
      // Vérifier si l'ID généré existe déjà
      const existingHospital = await mongoose.models.Hospital.findOne({ hospital_spec_id: newId });
      if (!existingHospital) {
        this.hospital_spec_id = newId;
        isUnique = true; // ID unique trouvé
      }
    }
  }
  next();
});

// Middleware pour traiter l'image avant la sauvegarde
hospitalSchema.pre('save', async function (next) {
  if (this.isModified('logo') && this.logo) {
    const extname = path.extname(this.logo).toLowerCase();
    if (!/\.(jpg|jpeg|png|gif|svg)$/i.test(extname)) {
      return next(new Error('Le fichier doit avoir une extension valide (jpg, jpeg, png, gif, svg)!'));
    }

    const imagePath = path.join(uploadDir, this.logo);

    try {
      // Traitement de l'image
      await sharp(imagePath)
        .resize(800) // Par exemple, redimensionner
        .toFile(path.join(processedDir, this.logo));

      fs.unlinkSync(imagePath); // Supprimer l'image originale si vous le souhaitez

      // Mettre à jour le chemin de l'image traitée
      this.logo = path.join('uploads', 'processed', path.basename(this.logo));
    } catch (error) {
      return next(error);
    }
  }
  next();
});


const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;


