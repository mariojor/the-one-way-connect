
const express = require('express');
const router = express.Router();
const Midia = require('../models/Midia');

// GET - Obter todas as mídias
router.get('/', async (req, res) => {
  try {
    const midias = await Midia.find();
    res.json(midias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obter mídia por ID
router.get('/:id', async (req, res) => {
  try {
    const midia = await Midia.findById(req.params.id);
    if (!midia) {
      return res.status(404).json({ message: 'Mídia não encontrada' });
    }
    res.json(midia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Criar nova mídia
router.post('/', async (req, res) => {
  const midia = new Midia(req.body);
  try {
    const novaMidia = await midia.save();
    res.status(201).json(novaMidia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Atualizar mídia existente
router.put('/:id', async (req, res) => {
  try {
    const midia = await Midia.findById(req.params.id);
    if (!midia) {
      return res.status(404).json({ message: 'Mídia não encontrada' });
    }
    
    Object.assign(midia, req.body);
    const midiaAtualizada = await midia.save();
    res.json(midiaAtualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Excluir mídia
router.delete('/:id', async (req, res) => {
  try {
    const midia = await Midia.findById(req.params.id);
    if (!midia) {
      return res.status(404).json({ message: 'Mídia não encontrada' });
    }
    
    await midia.deleteOne();
    res.json({ message: 'Mídia excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
