
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let { missoes } = require('../mockData');

// GET - Obter todas as missões
router.get('/', (req, res) => {
  res.json(missoes);
});

// GET - Obter missão por ID
router.get('/:id', (req, res) => {
  const missao = missoes.find(m => m.id === req.params.id);
  if (!missao) {
    return res.status(404).json({ message: 'Missão não encontrada' });
  }
  res.json(missao);
});

// POST - Criar nova missão
router.post('/', (req, res) => {
  const novaMissao = {
    id: uuidv4(),
    ...req.body,
  };
  
  missoes.push(novaMissao);
  res.status(201).json(novaMissao);
});

// PUT - Atualizar missão existente
router.put('/:id', (req, res) => {
  const index = missoes.findIndex(m => m.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Missão não encontrada' });
  }
  
  missoes[index] = {
    ...missoes[index],
    ...req.body,
  };
  
  res.json(missoes[index]);
});

// DELETE - Excluir missão
router.delete('/:id', (req, res) => {
  const index = missoes.findIndex(m => m.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Missão não encontrada' });
  }
  
  const missaoRemovida = missoes[index];
  missoes = missoes.filter(m => m.id !== req.params.id);
  
  res.json(missaoRemovida);
});

module.exports = { missoesRoutes: router };
