
const express = require('express');
const router = express.Router();
const Noticia = require('../models/Noticia');

// GET - Obter todas as notícias
router.get('/', async (req, res) => {
  try {
    const noticias = await Noticia.find();
    res.json(noticias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obter notícia por ID
router.get('/:id', async (req, res) => {
  try {
    const noticia = await Noticia.findById(req.params.id);
    if (!noticia) {
      return res.status(404).json({ message: 'Notícia não encontrada' });
    }
    res.json(noticia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obter notícias em destaque
router.get('/featured/items', async (req, res) => {
  try {
    const noticias = await Noticia.find({ featured: true }).limit(5);
    res.json(noticias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Criar nova notícia
router.post('/', async (req, res) => {
  const noticia = new Noticia(req.body);
  try {
    const novaNoticia = await noticia.save();
    res.status(201).json(novaNoticia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Atualizar notícia existente
router.put('/:id', async (req, res) => {
  try {
    const noticia = await Noticia.findById(req.params.id);
    if (!noticia) {
      return res.status(404).json({ message: 'Notícia não encontrada' });
    }
    
    Object.assign(noticia, req.body);
    const noticiaAtualizada = await noticia.save();
    res.json(noticiaAtualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Excluir notícia
router.delete('/:id', async (req, res) => {
  try {
    const noticia = await Noticia.findById(req.params.id);
    if (!noticia) {
      return res.status(404).json({ message: 'Notícia não encontrada' });
    }
    
    await noticia.deleteOne();
    res.json({ message: 'Notícia excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
