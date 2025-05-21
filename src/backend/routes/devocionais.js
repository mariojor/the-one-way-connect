
const express = require('express');
const router = express.Router();
const Devocional = require('../models/Devocional');

// GET - Obter todos os devocionais
router.get('/', async (req, res) => {
  try {
    const devocionais = await Devocional.find().sort({ date: -1 });
    res.json(devocionais);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obter devocional por ID
router.get('/:id', async (req, res) => {
  try {
    const devocional = await Devocional.findById(req.params.id);
    if (!devocional) {
      return res.status(404).json({ message: 'Devocional não encontrado' });
    }
    res.json(devocional);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obter devocional por data
router.get('/data/:date', async (req, res) => {
  try {
    const dataFormatada = new Date(req.params.date);
    const devocional = await Devocional.findOne({
      date: {
        $gte: new Date(dataFormatada.setHours(0, 0, 0, 0)),
        $lt: new Date(dataFormatada.setHours(23, 59, 59, 999))
      }
    });
    
    if (!devocional) {
      return res.status(404).json({ message: 'Não há devocional para esta data' });
    }
    
    res.json(devocional);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Criar novo devocional
router.post('/', async (req, res) => {
  const devocional = new Devocional(req.body);
  try {
    const novoDevocional = await devocional.save();
    res.status(201).json(novoDevocional);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Atualizar devocional existente
router.put('/:id', async (req, res) => {
  try {
    const devocional = await Devocional.findById(req.params.id);
    if (!devocional) {
      return res.status(404).json({ message: 'Devocional não encontrado' });
    }
    
    Object.assign(devocional, req.body);
    const devocionalAtualizado = await devocional.save();
    res.json(devocionalAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Excluir devocional
router.delete('/:id', async (req, res) => {
  try {
    const devocional = await Devocional.findById(req.params.id);
    if (!devocional) {
      return res.status(404).json({ message: 'Devocional não encontrado' });
    }
    
    await devocional.deleteOne();
    res.json({ message: 'Devocional excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
