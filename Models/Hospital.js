const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  isActive: { type: Boolean, default: true }
},{
  timestamps: true,
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;


