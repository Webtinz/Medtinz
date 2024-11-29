const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    type: String, 
    default: false 
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
      
      let newId = 'clinic-000001'; // ID par défaut si aucun hôpital n'existe
      if (lastHospital) {
        // Extraire la partie numérique de l'ID existant
        const lastIdNumber = parseInt(lastHospital.hospital_spec_id.replace('clinic-', ''));
        
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



// hospitalSchema.pre('validate', async function (next) {
//   if (!this.hospital_spec_id) {
//     let isUnique = false;
//     while (!isUnique) {
//       // Générer un identifiant unique
//       const randomId = Math.floor(100000 + Math.random() * 900000);
//       const generatedId = `clinic-${randomId}`;
      
//       // Vérifier si l'identifiant existe déjà
//       const existingHospital = await mongoose.models.Hospital.findOne({ hospital_spec_id: generatedId });
//       if (!existingHospital) {
//         this.hospital_spec_id = generatedId;
//         isUnique = true;
//       }
//     }
//   }
//   next();
// });

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;


