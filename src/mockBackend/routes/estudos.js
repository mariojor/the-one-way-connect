
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let { estudos } = require('../mockData');

// GET - Obter todos os estudos
router.get('/', (req, res) => {
  res.json(estudos);
});

// GET - Obter estudo por ID
router.get('/:id', (req, res) => {
  const estudo = estudos.find(e => e.id === req.params.id);
  if (!estudo) {
    return res.status(404).json({ message: 'Estudo não encontrado' });
  }
  res.json(estudo);
});

// POST - Criar novo estudo
router.post('/', (req, res) => {
  const novoEstudo = {
    id: uuidv4(),
    ...req.body,
  };
  
  estudos.push(novoEstudo);
  res.status(201).json(novoEstudo);
});

// PUT - Atualizar estudo existente
router.put('/:id', (req, res) => {
  const index = estudos.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Estudo não encontrado' });
  }
  
  estudos[index] = {
    ...estudos[index],
    ...req.body,
  };
  
  res.json(estudos[index]);
});

// DELETE - Excluir estudo
router.delete('/:id', (req, res) => {
  const index = estudos.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Estudo não encontrado' });
  }
  
  const estudoRemovido = estudos[index];
  estudos = estudos.filter(e => e.id !== req.params.id);
  
  res.json(estudoRemovido);
});

module.exports = { estudosRoutes: router };
