
const express = require('express');
const router = express.Router();
const Artigo = require('../models/Artigo');

// GET - Obter todos os artigos
router.get('/', async (req, res) => {
  try {
    const artigos = await Artigo.find();
    res.json(artigos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obter artigo por ID
router.get('/:id', async (req, res) => {
  try {
    const artigo = await Artigo.findById(req.params.id);
    if (!artigo) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }
    res.json(artigo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Buscar artigos por tag
router.get('/tag/:tag', async (req, res) => {
  try {
    const artigosFiltrados = await Artigo.find({ tags: req.params.tag });
    res.json(artigosFiltrados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Criar novo artigo
router.post('/', async (req, res) => {
  const artigo = new Artigo(req.body);
  try {
    const novoArtigo = await artigo.save();
    res.status(201).json(novoArtigo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Atualizar artigo existente
router.put('/:id', async (req, res) => {
  try {
    const artigo = await Artigo.findById(req.params.id);
    if (!artigo) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }
    
    Object.assign(artigo, req.body);
    const artigoAtualizado = await artigo.save();
    res.json(artigoAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Excluir artigo
router.delete('/:id', async (req, res) => {
  try {
    const artigo = await Artigo.findById(req.params.id);
    if (!artigo) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }
    
    await artigo.deleteOne();
    res.json({ message: 'Artigo excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
