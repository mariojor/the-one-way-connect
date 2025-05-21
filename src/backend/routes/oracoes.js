
const express = require('express');
const router = express.Router();
const Oracao = require('../models/Oracao');

// GET - Obter todas as orações
router.get('/', async (req, res) => {
  try {
    const oracoes = await Oracao.find();
    res.json(oracoes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obter oração por ID
router.get('/:id', async (req, res) => {
  try {
    const oracao = await Oracao.findById(req.params.id);
    if (!oracao) {
      return res.status(404).json({ message: 'Oração não encontrada' });
    }
    res.json(oracao);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Criar nova oração
router.post('/', async (req, res) => {
  const oracao = new Oracao(req.body);
  try {
    const novaOracao = await oracao.save();
    res.status(201).json(novaOracao);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Atualizar oração existente
router.put('/:id', async (req, res) => {
  try {
    const oracao = await Oracao.findById(req.params.id);
    if (!oracao) {
      return res.status(404).json({ message: 'Oração não encontrada' });
    }
    
    Object.assign(oracao, req.body);
    const oracaoAtualizada = await oracao.save();
    res.json(oracaoAtualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Excluir oração
router.delete('/:id', async (req, res) => {
  try {
    const oracao = await Oracao.findById(req.params.id);
    if (!oracao) {
      return res.status(404).json({ message: 'Oração não encontrada' });
    }
    
    await oracao.deleteOne();
    res.json({ message: 'Oração excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
