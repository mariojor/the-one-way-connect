
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let { midias } = require('../mockData');

// GET - Obter todas as mídias
router.get('/', (req, res) => {
  res.json(midias);
});

// GET - Obter mídia por ID
router.get('/:id', (req, res) => {
  const midia = midias.find(m => m.id === req.params.id);
  if (!midia) {
    return res.status(404).json({ message: 'Mídia não encontrada' });
  }
  res.json(midia);
});

// POST - Criar nova mídia
router.post('/', (req, res) => {
  const novaMidia = {
    id: uuidv4(),
    ...req.body,
  };
  
  midias.push(novaMidia);
  res.status(201).json(novaMidia);
});

// PUT - Atualizar mídia existente
router.put('/:id', (req, res) => {
  const index = midias.findIndex(m => m.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Mídia não encontrada' });
  }
  
  midias[index] = {
    ...midias[index],
    ...req.body,
  };
  
  res.json(midias[index]);
});

// DELETE - Excluir mídia
router.delete('/:id', (req, res) => {
  const index = midias.findIndex(m => m.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Mídia não encontrada' });
  }
  
  const midiaRemovida = midias[index];
  midias = midias.filter(m => m.id !== req.params.id);
  
  res.json(midiaRemovida);
});

module.exports = { midiasRoutes: router };
