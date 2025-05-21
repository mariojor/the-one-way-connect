
const express = require('express');
const router = express.Router();
const Familia = require('../models/Familia');

// GET - Obter todos os conteúdos de família
router.get('/', async (req, res) => {
  try {
    const familias = await Familia.find();
    res.json(familias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obter conteúdo de família por ID
router.get('/:id', async (req, res) => {
  try {
    const familia = await Familia.findById(req.params.id);
    if (!familia) {
      return res.status(404).json({ message: 'Conteúdo não encontrado' });
    }
    res.json(familia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Criar novo conteúdo de família
router.post('/', async (req, res) => {
  const familia = new Familia(req.body);
  try {
    const novoConteudo = await familia.save();
    res.status(201).json(novoConteudo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Atualizar conteúdo de família existente
router.put('/:id', async (req, res) => {
  try {
    const familia = await Familia.findById(req.params.id);
    if (!familia) {
      return res.status(404).json({ message: 'Conteúdo não encontrado' });
    }
    
    Object.assign(familia, req.body);
    const conteudoAtualizado = await familia.save();
    res.json(conteudoAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Excluir conteúdo de família
router.delete('/:id', async (req, res) => {
  try {
    const familia = await Familia.findById(req.params.id);
    if (!familia) {
      return res.status(404).json({ message: 'Conteúdo não encontrado' });
    }
    
    await familia.deleteOne();
    res.json({ message: 'Conteúdo excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
