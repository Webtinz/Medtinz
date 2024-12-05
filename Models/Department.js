const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du modèle de département
const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    hospital_id: {
      type: Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
    },
  },
  { timestamps: true }
);

// Validation pour s'assurer qu'un département avec le même nom n'existe pas dans le même hôpital
departmentSchema.index({ name: 1, hospital_id: 1 }, { unique: true });

// Middleware avant la création pour vérifier l'unicité du nom dans un même hôpital
departmentSchema.pre('save', async function (next) {
  const existingDepartment = await Department.findOne({
    name: this.name,
    hospital_id: this.hospital_id,
  });

  if (existingDepartment) {
    const error = new Error('Un département avec ce nom existe déjà dans cet hôpital.');
    return next(error);
  }

  next();
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
