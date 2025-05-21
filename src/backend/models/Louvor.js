
const mongoose = require('mongoose');

const LouvorSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório']
  },
  artist: {
    type: String,
    required: [true, 'Artista é obrigatório']
  },
  album: {
    type: String,
    default: ''
  },
  lyrics: {
    type: String,
    default: ''
  },
  chords: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76'
  },
  category: {
    type: String,
    default: 'Adoração'
  }
});

module.exports = mongoose.model('Louvor', LouvorSchema);
