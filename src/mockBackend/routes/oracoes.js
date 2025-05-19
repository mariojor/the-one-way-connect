
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let { oracoes } = require('../mockData');

// GET - Obter todas as orações
router.get('/', (req, res) => {
  res.json(oracoes);
});

// GET - Obter oração por ID
router.get('/:id', (req, res) => {
  const oracao = oracoes.find(o => o.id === req.params.id);
  if (!oracao) {
    return res.status(404).json({ message: 'Oração não encontrada' });
  }
  res.json(oracao);
});

// POST - Criar nova oração
router.post('/', (req, res) => {
  const novaOracao = {
    id: uuidv4(),
    ...req.body,
  };
  
  oracoes.push(novaOracao);
  res.status(201).json(novaOracao);
});

// PUT - Atualizar oração existente
router.put('/:id', (req, res) => {
  const index = oracoes.findIndex(o => o.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Oração não encontrada' });
  }
  
  oracoes[index] = {
    ...oracoes[index],
    ...req.body,
  };
  
  res.json(oracoes[index]);
});

// DELETE - Excluir oração
router.delete('/:id', (req, res) => {
  const index = oracoes.findIndex(o => o.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Oração não encontrada' });
  }
  
  const oracaoRemovida = oracoes[index];
  oracoes = oracoes.filter(o => o.id !== req.params.id);
  
  res.json(oracaoRemovida);
});

module.exports = { oracoesRoutes: router };
