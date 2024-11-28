
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },  // Clé unique pour le contenu
  content_fr: { type: String, required: true },  // Contenu en français
  content_en: { type: String, required: true },  // Contenu en anglais
  pageId: {type: mongoose.Schema.Types.ObjectId, ref: 'Pagelist', required: true},
}, {
  timestamps: true,
});

const Content = mongoose.model('Content', contentSchema);
module.exports = Content;
