
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let { juventudes } = require('../mockData');

// GET - Obter todos os conteúdos de juventude
router.get('/', (req, res) => {
  res.json(juventudes);
});

// GET - Obter conteúdo de juventude por ID
router.get('/:id', (req, res) => {
  const juventude = juventudes.find(j => j.id === req.params.id);
  if (!juventude) {
    return res.status(404).json({ message: 'Conteúdo não encontrado' });
  }
  res.json(juventude);
});

// POST - Criar novo conteúdo de juventude
router.post('/', (req, res) => {
  const novoConteudo = {
    id: uuidv4(),
    ...req.body,
  };
  
  juventudes.push(novoConteudo);
  res.status(201).json(novoConteudo);
});

// PUT - Atualizar conteúdo de juventude existente
router.put('/:id', (req, res) => {
  const index = juventudes.findIndex(j => j.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Conteúdo não encontrado' });
  }
  
  juventudes[index] = {
    ...juventudes[index],
    ...req.body,
  };
  
  res.json(juventudes[index]);
});

// DELETE - Excluir conteúdo de juventude
router.delete('/:id', (req, res) => {
  const index = juventudes.findIndex(j => j.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Conteúdo não encontrado' });
  }
  
  const conteudoRemovido = juventudes[index];
  juventudes = juventudes.filter(j => j.id !== req.params.id);
  
  res.json(conteudoRemovido);
});

module.exports = { juventudesRoutes: router };
