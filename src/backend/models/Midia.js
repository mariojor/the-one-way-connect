
const mongoose = require('mongoose');

const MidiaSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ['video', 'podcast', 'outro'],
    required: [true, 'Tipo é obrigatório']
  },
  url: {
    type: String,
    required: [true, 'URL é obrigatória']
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1535016120720-40c646be5580'
  },
  duration: {
    type: String,
    default: '00:00'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Midia', MidiaSchema);
