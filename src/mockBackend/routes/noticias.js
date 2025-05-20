
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let { noticias } = require('../mockData');

// GET - Obter todas as notícias
router.get('/', (req, res) => {
  res.json(noticias);
});

// GET - Obter notícia por ID
router.get('/:id', (req, res) => {
  const noticia = noticias.find(n => n.id === req.params.id);
  if (!noticia) {
    return res.status(404).json({ message: 'Notícia não encontrada' });
  }
  res.json(noticia);
});

// POST - Criar nova notícia
router.post('/', (req, res) => {
  const novaNoticia = {
    id: uuidv4(),
    ...req.body,
  };
  
  noticias.push(novaNoticia);
  res.status(201).json(novaNoticia);
});

// PUT - Atualizar notícia existente
router.put('/:id', (req, res) => {
  const index = noticias.findIndex(n => n.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Notícia não encontrada' });
  }
  
  noticias[index] = {
    ...noticias[index],
    ...req.body,
  };
  
  res.json(noticias[index]);
});

// DELETE - Excluir notícia
router.delete('/:id', (req, res) => {
  const index = noticias.findIndex(n => n.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Notícia não encontrada' });
  }
  
  const noticiaRemovida = noticias[index];
  noticias = noticias.filter(n => n.id !== req.params.id);
  
  res.json(noticiaRemovida);
});

module.exports = { noticiasRoutes: router };
