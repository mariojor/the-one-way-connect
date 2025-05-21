
const mongoose = require('mongoose');

const EstudoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório']
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória']
  },
  author: {
    type: String,
    required: [true, 'Autor é obrigatório']
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9'
  },
  level: {
    type: String,
    enum: ['iniciante', 'intermediario', 'avancado'],
    default: 'iniciante'
  },
  content: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'Bíblia'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Estudo', EstudoSchema);
