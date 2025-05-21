
const mongoose = require('mongoose');

const MissaoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório']
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória']
  },
  location: {
    type: String,
    required: [true, 'Localização é obrigatória']
  },
  startDate: {
    type: Date,
    required: [true, 'Data de início é obrigatória']
  },
  endDate: {
    type: Date,
    default: null
  },
  leader: {
    type: String,
    required: [true, 'Líder é obrigatório']
  },
  missionary: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['ativo', 'planejado', 'concluido'],
    default: 'planejado'
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb'
  },
  testimonies: {
    type: [String],
    default: []
  },
  budget: {
    type: Number,
    default: 0
  },
  members: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Missao', MissaoSchema);
