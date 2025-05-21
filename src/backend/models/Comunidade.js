
const mongoose = require('mongoose');

const ComunidadeSchema = new mongoose.Schema({
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
    default: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18'
  },
  author: {
    type: String,
    required: [true, 'Autor é obrigatório']
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['evento', 'noticia', 'post'],
    default: 'post'
  }
});

module.exports = mongoose.model('Comunidade', ComunidadeSchema);
