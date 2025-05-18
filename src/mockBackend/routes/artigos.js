
const express = require('express');
const router = express.Router();
let { artigos } = require('../mockData');

// Obter todos os artigos
router.get('/', (req, res) => {
  res.json(artigos);
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('artigos').select()
});

// Obter artigo pelo ID
router.get('/:id', (req, res) => {
  const artigo = artigos.find(a => a.id === req.params.id);
  
  if (artigo) {
    res.json(artigo);
  } else {
    res.status(404).json({ message: "Artigo não encontrado" });
  }
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('artigos').select().eq('id', id).single()
});

// Buscar artigos por tag
router.get('/tag/:tag', (req, res) => {
  const artigosFiltrados = artigos.filter(a => 
    a.tags && a.tags.includes(req.params.tag)
  );
  
  res.json(artigosFiltrados);
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('artigos').select().contains('tags', [tag])
});

// Criar um novo artigo
router.post('/', (req, res) => {
  const newArtigo = {
    id: String(artigos.length + 1),
    ...req.body
  };
  
  artigos.push(newArtigo);
  res.status(201).json(newArtigo);
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('artigos').insert([{ ... }])
});

// Atualizar um artigo existente
router.put('/:id', (req, res) => {
  const index = artigos.findIndex(a => a.id === req.params.id);
  
  if (index !== -1) {
    artigos[index] = { ...artigos[index], ...req.body };
    res.json(artigos[index]);
  } else {
    res.status(404).json({ message: "Artigo não encontrado" });
  }
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('artigos').update({ ... }).eq('id', id)
});

// Excluir um artigo
router.delete('/:id', (req, res) => {
  const index = artigos.findIndex(a => a.id === req.params.id);
  
  if (index !== -1) {
    artigos.splice(index, 1);
    res.json({ message: "Artigo excluído com sucesso", id: req.params.id });
  } else {
    res.status(404).json({ message: "Artigo não encontrado" });
  }
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('artigos').delete().eq('id', id)
});

module.exports = { artigosRoutes: router };
