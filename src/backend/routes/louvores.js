
const express = require('express');
const router = express.Router();
const Louvor = require('../models/Louvor');

// GET - Obter todos os louvores
router.get('/', async (req, res) => {
  try {
    const louvores = await Louvor.find();
    res.json(louvores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obter louvor por ID
router.get('/:id', async (req, res) => {
  try {
    const louvor = await Louvor.findById(req.params.id);
    if (!louvor) {
      return res.status(404).json({ message: 'Louvor não encontrado' });
    }
    res.json(louvor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Criar novo louvor
router.post('/', async (req, res) => {
  const louvor = new Louvor(req.body);
  try {
    const novoLouvor = await louvor.save();
    res.status(201).json(novoLouvor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Atualizar louvor existente
router.put('/:id', async (req, res) => {
  try {
    const louvor = await Louvor.findById(req.params.id);
    if (!louvor) {
      return res.status(404).json({ message: 'Louvor não encontrado' });
    }
    
    Object.assign(louvor, req.body);
    const louvorAtualizado = await louvor.save();
    res.json(louvorAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Excluir louvor
router.delete('/:id', async (req, res) => {
  try {
    const louvor = await Louvor.findById(req.params.id);
    if (!louvor) {
      return res.status(404).json({ message: 'Louvor não encontrado' });
    }
    
    await louvor.deleteOne();
    res.json({ message: 'Louvor excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
