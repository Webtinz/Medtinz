const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du modèle de département
const ServiceSchema = new Schema(
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
    codeSer: {
      type: String,
      required: true,
      unique: true
    },
    price_service: {
      type: String,
      required: true,
    },
    hospital_id: {
      type: Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
    },
    specialityId: {
        type: Schema.Types.ObjectId,
        ref: 'Speciality', // Lien avec le modèle Department
        required:true,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;
