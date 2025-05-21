
const express = require('express');
const router = express.Router();
const Estudo = require('../models/Estudo');

// GET - Obter todos os estudos
router.get('/', async (req, res) => {
  try {
    const estudos = await Estudo.find();
    res.json(estudos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obter estudo por ID
router.get('/:id', async (req, res) => {
  try {
    const estudo = await Estudo.findById(req.params.id);
    if (!estudo) {
      return res.status(404).json({ message: 'Estudo não encontrado' });
    }
    res.json(estudo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Criar novo estudo
router.post('/', async (req, res) => {
  const estudo = new Estudo(req.body);
  try {
    const novoEstudo = await estudo.save();
    res.status(201).json(novoEstudo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Atualizar estudo existente
router.put('/:id', async (req, res) => {
  try {
    const estudo = await Estudo.findById(req.params.id);
    if (!estudo) {
      return res.status(404).json({ message: 'Estudo não encontrado' });
    }
    
    Object.assign(estudo, req.body);
    const estudoAtualizado = await estudo.save();
    res.json(estudoAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Excluir estudo
router.delete('/:id', async (req, res) => {
  try {
    const estudo = await Estudo.findById(req.params.id);
    if (!estudo) {
      return res.status(404).json({ message: 'Estudo não encontrado' });
    }
    
    await estudo.deleteOne();
    res.json({ message: 'Estudo excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
