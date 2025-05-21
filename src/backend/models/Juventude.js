
const mongoose = require('mongoose');

const JuventudeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório']
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória']
  },
  content: {
    type: String,
    required: [true, 'Conteúdo é obrigatório']
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70'
  },
  author: {
    type: String,
    required: [true, 'Autor é obrigatório']
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    default: 'Geral'
  }
});

module.exports = mongoose.model('Juventude', JuventudeSchema);
