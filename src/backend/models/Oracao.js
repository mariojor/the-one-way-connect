
const mongoose = require('mongoose');

const OracaoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório']
  },
  author: {
    type: String,
    required: [true, 'Autor é obrigatório']
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória']
  },
  content: {
    type: String,
    required: [true, 'Conteúdo é obrigatório']
  },
  category: {
    type: String,
    default: 'Devocional'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Oracao', OracaoSchema);
