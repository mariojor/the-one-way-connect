
const mongoose = require('mongoose');

const DevocionalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório']
  },
  verse: {
    type: String,
    required: [true, 'Versículo é obrigatório']
  },
  verseText: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: [true, 'Conteúdo é obrigatório']
  },
  prayer: {
    type: String,
    default: ''
  },
  application: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, 'Data é obrigatória']
  },
  author: {
    type: String,
    default: 'Equipe One Way'
  }
});

module.exports = mongoose.model('Devocional', DevocionalSchema);
