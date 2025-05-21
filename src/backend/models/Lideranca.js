
const mongoose = require('mongoose');

const LiderancaSchema = new mongoose.Schema({
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
    default: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf'
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
    default: 'Liderança'
  },
  type: {
    type: String,
    default: 'artigo'
  }
});

module.exports = mongoose.model('Lideranca', LiderancaSchema);
