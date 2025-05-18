
const express = require('express');
const router = express.Router();
let { devocionais } = require('../mockData');

// Obter todos os devocionais
router.get('/', (req, res) => {
  res.json(devocionais);
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('devocionais').select()
});

// Obter devocional pelo ID
router.get('/:id', (req, res) => {
  const devocional = devocionais.find(d => d.id === req.params.id);
  
  if (devocional) {
    res.json(devocional);
  } else {
    res.status(404).json({ message: "Devocional não encontrado" });
  }
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('devocionais').select().eq('id', id).single()
});

// Obter devocional por data
router.get('/data/:date', (req, res) => {
  const devocional = devocionais.find(d => d.date === req.params.date);
  
  if (devocional) {
    res.json(devocional);
  } else {
    res.status(404).json({ message: "Não há devocional para esta data" });
  }
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('devocionais').select().eq('date', date).single()
});

// Criar um novo devocional
router.post('/', (req, res) => {
  const newDevocional = {
    id: String(devocionais.length + 1),
    ...req.body
  };
  
  devocionais.push(newDevocional);
  res.status(201).json(newDevocional);
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('devocionais').insert([{ ... }])
});

// Atualizar um devocional existente
router.put('/:id', (req, res) => {
  const index = devocionais.findIndex(d => d.id === req.params.id);
  
  if (index !== -1) {
    devocionais[index] = { ...devocionais[index], ...req.body };
    res.json(devocionais[index]);
  } else {
    res.status(404).json({ message: "Devocional não encontrado" });
  }
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('devocionais').update({ ... }).eq('id', id)
});

// Excluir um devocional
router.delete('/:id', (req, res) => {
  const index = devocionais.findIndex(d => d.id === req.params.id);
  
  if (index !== -1) {
    devocionais.splice(index, 1);
    res.json({ message: "Devocional excluído com sucesso", id: req.params.id });
  } else {
    res.status(404).json({ message: "Devocional não encontrado" });
  }
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('devocionais').delete().eq('id', id)
});

module.exports = { devocionalRoutes: router };
