
const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório']
  },
  date: {
    type: Date,
    required: [true, 'Data é obrigatória']
  },
  time: {
    type: String,
    required: [true, 'Horário é obrigatório']
  },
  location: {
    type: String,
    required: [true, 'Local é obrigatório']
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória']
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'
  },
  registerLink: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Evento', EventoSchema);
