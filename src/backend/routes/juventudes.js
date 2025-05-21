
const express = require('express');
const router = express.Router();
const Juventude = require('../models/Juventude');

// GET - Obter todos os conteúdos de juventude
router.get('/', async (req, res) => {
  try {
    const juventudes = await Juventude.find();
    res.json(juventudes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obter conteúdo de juventude por ID
router.get('/:id', async (req, res) => {
  try {
    const juventude = await Juventude.findById(req.params.id);
    if (!juventude) {
      return res.status(404).json({ message: 'Conteúdo não encontrado' });
    }
    res.json(juventude);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Criar novo conteúdo de juventude
router.post('/', async (req, res) => {
  const juventude = new Juventude(req.body);
  try {
    const novoConteudo = await juventude.save();
    res.status(201).json(novoConteudo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Atualizar conteúdo de juventude existente
router.put('/:id', async (req, res) => {
  try {
    const juventude = await Juventude.findById(req.params.id);
    if (!juventude) {
      return res.status(404).json({ message: 'Conteúdo não encontrado' });
    }
    
    Object.assign(juventude, req.body);
    const conteudoAtualizado = await juventude.save();
    res.json(conteudoAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Excluir conteúdo de juventude
router.delete('/:id', async (req, res) => {
  try {
    const juventude = await Juventude.findById(req.params.id);
    if (!juventude) {
      return res.status(404).json({ message: 'Conteúdo não encontrado' });
    }
    
    await juventude.deleteOne();
    res.json({ message: 'Conteúdo excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
