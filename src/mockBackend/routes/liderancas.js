
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let { liderancas } = require('../mockData');

// GET - Obter todos os conteúdos de liderança
router.get('/', (req, res) => {
  res.json(liderancas);
});

// GET - Obter conteúdo de liderança por ID
router.get('/:id', (req, res) => {
  const lideranca = liderancas.find(l => l.id === req.params.id);
  if (!lideranca) {
    return res.status(404).json({ message: 'Conteúdo não encontrado' });
  }
  res.json(lideranca);
});

// POST - Criar novo conteúdo de liderança
router.post('/', (req, res) => {
  const novoConteudo = {
    id: uuidv4(),
    ...req.body,
  };
  
  liderancas.push(novoConteudo);
  res.status(201).json(novoConteudo);
});

// PUT - Atualizar conteúdo de liderança existente
router.put('/:id', (req, res) => {
  const index = liderancas.findIndex(l => l.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Conteúdo não encontrado' });
  }
  
  liderancas[index] = {
    ...liderancas[index],
    ...req.body,
  };
  
  res.json(liderancas[index]);
});

// DELETE - Excluir conteúdo de liderança
router.delete('/:id', (req, res) => {
  const index = liderancas.findIndex(l => l.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Conteúdo não encontrado' });
  }
  
  const conteudoRemovido = liderancas[index];
  liderancas = liderancas.filter(l => l.id !== req.params.id);
  
  res.json(conteudoRemovido);
});

module.exports = { liderancasRoutes: router };
