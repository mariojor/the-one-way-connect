
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let { comunidades } = require('../mockData');

// GET - Obter todos os conteúdos de comunidade
router.get('/', (req, res) => {
  res.json(comunidades);
});

// GET - Obter conteúdo de comunidade por ID
router.get('/:id', (req, res) => {
  const comunidade = comunidades.find(c => c.id === req.params.id);
  if (!comunidade) {
    return res.status(404).json({ message: 'Conteúdo não encontrado' });
  }
  res.json(comunidade);
});

// POST - Criar novo conteúdo de comunidade
router.post('/', (req, res) => {
  const novoConteudo = {
    id: uuidv4(),
    ...req.body,
  };
  
  comunidades.push(novoConteudo);
  res.status(201).json(novoConteudo);
});

// PUT - Atualizar conteúdo de comunidade existente
router.put('/:id', (req, res) => {
  const index = comunidades.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Conteúdo não encontrado' });
  }
  
  comunidades[index] = {
    ...comunidades[index],
    ...req.body,
  };
  
  res.json(comunidades[index]);
});

// DELETE - Excluir conteúdo de comunidade
router.delete('/:id', (req, res) => {
  const index = comunidades.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Conteúdo não encontrado' });
  }
  
  const conteudoRemovido = comunidades[index];
  comunidades = comunidades.filter(c => c.id !== req.params.id);
  
  res.json(conteudoRemovido);
});

module.exports = { comunidadesRoutes: router };
