
const express = require('express');
const router = express.Router();
const Missao = require('../models/Missao');

// GET - Obter todas as missões
router.get('/', async (req, res) => {
  try {
    const missoes = await Missao.find();
    
    // Format the missions data to match what the front-end expects
    const formattedMissoes = missoes.map(missao => ({
      ...missao.toObject(),
      missionary: missao.missionary || missao.leader,
      date: missao.startDate,
      status: missao.status
    }));
    
    res.json(formattedMissoes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obter missão por ID
router.get('/:id', async (req, res) => {
  try {
    const missao = await Missao.findById(req.params.id);
    if (!missao) {
      return res.status(404).json({ message: 'Missão não encontrada' });
    }
    
    // Format the mission data to match what the front-end expects
    const formattedMissao = {
      ...missao.toObject(),
      missionary: missao.missionary || missao.leader,
      date: missao.startDate,
      status: missao.status
    };
    
    res.json(formattedMissao);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Criar nova missão
router.post('/', async (req, res) => {
  const missao = new Missao(req.body);
  try {
    const novaMissao = await missao.save();
    res.status(201).json(novaMissao);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Atualizar missão existente
router.put('/:id', async (req, res) => {
  try {
    const missao = await Missao.findById(req.params.id);
    if (!missao) {
      return res.status(404).json({ message: 'Missão não encontrada' });
    }
    
    Object.assign(missao, req.body);
    const missaoAtualizada = await missao.save();
    res.json(missaoAtualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Excluir missão
router.delete('/:id', async (req, res) => {
  try {
    const missao = await Missao.findById(req.params.id);
    if (!missao) {
      return res.status(404).json({ message: 'Missão não encontrada' });
    }
    
    await missao.deleteOne();
    res.json({ message: 'Missão excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
