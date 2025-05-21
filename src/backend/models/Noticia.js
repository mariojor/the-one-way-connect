
const mongoose = require('mongoose');

const NoticiaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório']
  },
  content: {
    type: String,
    required: [true, 'Conteúdo é obrigatório']
  },
  author: {
    type: String,
    required: [true, 'Autor é obrigatório']
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1495020689067-958852a7765e'
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    default: 'Geral'
  },
  featured: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Noticia', NoticiaSchema);
