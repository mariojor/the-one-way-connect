
const express = require('express');
const router = express.Router();
const Comunidade = require('../models/Comunidade');

// GET - Obter todos os conteúdos de comunidade
router.get('/', async (req, res) => {
  try {
    const comunidades = await Comunidade.find();
    res.json(comunidades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obter conteúdo de comunidade por ID
router.get('/:id', async (req, res) => {
  try {
    const comunidade = await Comunidade.findById(req.params.id);
    if (!comunidade) {
      return res.status(404).json({ message: 'Conteúdo não encontrado' });
    }
    res.json(comunidade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Criar novo conteúdo de comunidade
router.post('/', async (req, res) => {
  const comunidade = new Comunidade(req.body);
  try {
    const novoConteudo = await comunidade.save();
    res.status(201).json(novoConteudo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Atualizar conteúdo de comunidade existente
router.put('/:id', async (req, res) => {
  try {
    const comunidade = await Comunidade.findById(req.params.id);
    if (!comunidade) {
      return res.status(404).json({ message: 'Conteúdo não encontrado' });
    }
    
    Object.assign(comunidade, req.body);
    const conteudoAtualizado = await comunidade.save();
    res.json(conteudoAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Excluir conteúdo de comunidade
router.delete('/:id', async (req, res) => {
  try {
    const comunidade = await Comunidade.findById(req.params.id);
    if (!comunidade) {
      return res.status(404).json({ message: 'Conteúdo não encontrado' });
    }
    
    await comunidade.deleteOne();
    res.json({ message: 'Conteúdo excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
