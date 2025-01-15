const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du modèle de département
const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    codeDep: {
      type: String,
      required: false,
      unique: true
    },
    price_consult: {
      type: String,
      required: false,
    },
    hospital_id: {
      type: Schema.Types.ObjectId,
      ref: 'Hospital',
      required: false,
    },
  },
  { timestamps: true }
);

// Middleware avant la création pour générer automatiquement le code de département
departmentSchema.pre('save', async function (next) {
  // Si le code existe déjà, ne rien faire
  if (this.codeDep) {
    return next();
  }

  try {
    // Obtenir le mois et l'année actuels
    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Mois en format 2 chiffres
    const currentYear = currentDate.getFullYear(); // Année actuelle

    // Filtrer les départements du même mois et année
    const lastDepartment = await mongoose
      .model('Department')
      .findOne({ codeDep: new RegExp(`^DEP-${currentYear}-`) })
      .sort({ createdAt: -1 });

    // Extraire le dernier numéro ou initialiser à 0
    let lastNumber = 0;
    if (lastDepartment && lastDepartment.codeDep) {
      const match = lastDepartment.codeDep.match(/DEP-\d{4}-(\d+)$/);
      if (match) {
        lastNumber = parseInt(match[1], 10);
      }
    }

    // Incrémenter le numéro
    const nextNumber = lastNumber + 1;

    // Formater le numéro avec 5 chiffres
    const paddedNumber = nextNumber.toString().padStart(5, '0');

    // Générer le code complet
    this.codeDep = `DEP-${currentYear}-${paddedNumber}`;

    next();
  } catch (error) {
    next(error);
  }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
