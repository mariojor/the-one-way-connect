
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let { louvores } = require('../mockData');

// GET - Obter todos os louvores
router.get('/', (req, res) => {
  res.json(louvores);
});

// GET - Obter louvor por ID
router.get('/:id', (req, res) => {
  const louvor = louvores.find(l => l.id === req.params.id);
  if (!louvor) {
    return res.status(404).json({ message: 'Louvor não encontrado' });
  }
  res.json(louvor);
});

// POST - Criar novo louvor
router.post('/', (req, res) => {
  const novoLouvor = {
    id: uuidv4(),
    ...req.body,
  };
  
  louvores.push(novoLouvor);
  res.status(201).json(novoLouvor);
});

// PUT - Atualizar louvor existente
router.put('/:id', (req, res) => {
  const index = louvores.findIndex(l => l.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Louvor não encontrado' });
  }
  
  louvores[index] = {
    ...louvores[index],
    ...req.body,
  };
  
  res.json(louvores[index]);
});

// DELETE - Excluir louvor
router.delete('/:id', (req, res) => {
  const index = louvores.findIndex(l => l.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Louvor não encontrado' });
  }
  
  const louvorRemovido = louvores[index];
  louvores = louvores.filter(l => l.id !== req.params.id);
  
  res.json(louvorRemovido);
});

module.exports = { louvoresRoutes: router };
