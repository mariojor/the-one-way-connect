
const express = require('express');
const router = express.Router();
const Lideranca = require('../models/Lideranca');

// GET - Obter todos os conteúdos de liderança
router.get('/', async (req, res) => {
  try {
    const liderancas = await Lideranca.find();
    res.json(liderancas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obter conteúdo de liderança por ID
router.get('/:id', async (req, res) => {
  try {
    const lideranca = await Lideranca.findById(req.params.id);
    if (!lideranca) {
      return res.status(404).json({ message: 'Conteúdo não encontrado' });
    }
    res.json(lideranca);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Criar novo conteúdo de liderança
router.post('/', async (req, res) => {
  const lideranca = new Lideranca(req.body);
  try {
    const novoConteudo = await lideranca.save();
    res.status(201).json(novoConteudo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Atualizar conteúdo de liderança existente
router.put('/:id', async (req, res) => {
  try {
    const lideranca = await Lideranca.findById(req.params.id);
    if (!lideranca) {
      return res.status(404).json({ message: 'Conteúdo não encontrado' });
    }
    
    Object.assign(lideranca, req.body);
    const conteudoAtualizado = await lideranca.save();
    res.json(conteudoAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Excluir conteúdo de liderança
router.delete('/:id', async (req, res) => {
  try {
    const lideranca = await Lideranca.findById(req.params.id);
    if (!lideranca) {
      return res.status(404).json({ message: 'Conteúdo não encontrado' });
    }
    
    await lideranca.deleteOne();
    res.json({ message: 'Conteúdo excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
