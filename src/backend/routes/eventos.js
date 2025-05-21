
const express = require('express');
const router = express.Router();
const Evento = require('../models/Evento');

// GET - Obter todos os eventos
router.get('/', async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obter evento por ID
router.get('/:id', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.json(evento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obter eventos futuros (a partir de hoje)
router.get('/futuros/lista', async (req, res) => {
  try {
    const hoje = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const eventosFuturos = await Evento.find({ date: { $gte: hoje } }).sort({ date: 1 });
    res.json(eventosFuturos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Criar novo evento
router.post('/', async (req, res) => {
  const evento = new Evento(req.body);
  try {
    const novoEvento = await evento.save();
    res.status(201).json(novoEvento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Atualizar evento existente
router.put('/:id', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    
    Object.assign(evento, req.body);
    const eventoAtualizado = await evento.save();
    res.json(eventoAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Excluir evento
router.delete('/:id', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    
    await evento.deleteOne();
    res.json({ message: 'Evento excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
