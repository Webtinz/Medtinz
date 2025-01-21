const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const specialtySchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    departementId: {
        type: Schema.Types.ObjectId,
        ref: 'Department', // Lien avec le modèle Department
        default: null,
    },
    codeSpe: {
        type: String,
        required: false,
        unique: true,
    },
    hospital_id: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: false,
    },
}, { timestamps: true });

// Middleware avant la création pour générer automatiquement le code de spécialité
specialtySchema.pre('save', async function (next) {
    // Si le code existe déjà, ne rien faire
    if (this.codeSpe) {
        return next();
    }

    try {
        // Obtenir le mois et l'année actuels
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear(); // Année actuelle

        // Filtrer les spécialités de la même année (ajuster si vous ajoutez un mois ou autre critère)
        const lastSpecialty = await mongoose
            .model('Specialty')
            .findOne({ codeSpe: { $regex: `^SPE-${currentYear}-` } })
            .sort({ codeSpe: -1 });  // Trier par codeSpe pour obtenir le plus grand numéro    

        // Extraire le dernier numéro ou initialiser à 0
        let lastNumber = 0;
        if (lastSpecialty && lastSpecialty.codeSpe) {
            const match = lastSpecialty.codeSpe.match(/SPE-\d{4}-(\d+)$/);
            if (match) {
                lastNumber = parseInt(match[1], 10);
            }
        }

        // Incrémenter le numéro
        const nextNumber = lastNumber + 1;

        // Formater le numéro avec 5 chiffres
        const paddedNumber = nextNumber.toString().padStart(5, '0');

        // Générer le code complet
        this.codeSpe = `SPE-${currentYear}-${paddedNumber}`;

        next();
    } catch (error) {
        next(error);
    }
});

const Specialty = mongoose.model('Specialty', specialtySchema);
module.exports = Specialty;
