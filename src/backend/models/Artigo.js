
const mongoose = require('mongoose');

const ArtigoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório']
  },
  author: {
    type: String,
    required: [true, 'Autor é obrigatório']
  },
  date: {
    type: Date,
    default: Date.now
  },
  summary: {
    type: String,
    required: [true, 'Resumo é obrigatório']
  },
  content: {
    type: String,
    required: [true, 'Conteúdo é obrigatório']
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14'
  },
  tags: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Artigo', ArtigoSchema);
