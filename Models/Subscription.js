const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SubscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true , unique: true },
  description: { type: String, required: true },
  features: { type: [String], required: true  },
  description_fr: { type: String, required: true},
  features_fr : { type: [String], required: true  },
  price: { type: Number, required: true },
},{
  timestamps: true,
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
module.exports = Subscription;

