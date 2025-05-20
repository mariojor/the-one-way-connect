
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let { familias } = require('../mockData');

// GET - Obter todos os conteúdos de família
router.get('/', (req, res) => {
  res.json(familias);
});

// GET - Obter conteúdo de família por ID
router.get('/:id', (req, res) => {
  const familia = familias.find(f => f.id === req.params.id);
  if (!familia) {
    return res.status(404).json({ message: 'Conteúdo não encontrado' });
  }
  res.json(familia);
});

// POST - Criar novo conteúdo de família
router.post('/', (req, res) => {
  const novoConteudo = {
    id: uuidv4(),
    ...req.body,
  };
  
  familias.push(novoConteudo);
  res.status(201).json(novoConteudo);
});

// PUT - Atualizar conteúdo de família existente
router.put('/:id', (req, res) => {
  const index = familias.findIndex(f => f.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Conteúdo não encontrado' });
  }
  
  familias[index] = {
    ...familias[index],
    ...req.body,
  };
  
  res.json(familias[index]);
});

// DELETE - Excluir conteúdo de família
router.delete('/:id', (req, res) => {
  const index = familias.findIndex(f => f.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Conteúdo não encontrado' });
  }
  
  const conteudoRemovido = familias[index];
  familias = familias.filter(f => f.id !== req.params.id);
  
  res.json(conteudoRemovido);
});

module.exports = { familiasRoutes: router };
