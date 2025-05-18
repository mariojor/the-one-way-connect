
const express = require('express');
const router = express.Router();
let { eventos } = require('../mockData');

// Obter todos os eventos
router.get('/', (req, res) => {
  res.json(eventos);
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('eventos').select()
});

// Obter evento pelo ID
router.get('/:id', (req, res) => {
  const evento = eventos.find(e => e.id === req.params.id);
  
  if (evento) {
    res.json(evento);
  } else {
    res.status(404).json({ message: "Evento não encontrado" });
  }
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('eventos').select().eq('id', id).single()
});

// Obter eventos futuros (a partir de hoje)
router.get('/futuros', (req, res) => {
  const hoje = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
  const eventosFuturos = eventos.filter(e => e.date >= hoje);
  
  res.json(eventosFuturos);
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('eventos').select().gte('date', hoje)
});

// Criar um novo evento
router.post('/', (req, res) => {
  const newEvento = {
    id: String(eventos.length + 1),
    ...req.body
  };
  
  eventos.push(newEvento);
  res.status(201).json(newEvento);
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('eventos').insert([{ ... }])
});

// Atualizar um evento existente
router.put('/:id', (req, res) => {
  const index = eventos.findIndex(e => e.id === req.params.id);
  
  if (index !== -1) {
    eventos[index] = { ...eventos[index], ...req.body };
    res.json(eventos[index]);
  } else {
    res.status(404).json({ message: "Evento não encontrado" });
  }
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('eventos').update({ ... }).eq('id', id)
});

// Excluir um evento
router.delete('/:id', (req, res) => {
  const index = eventos.findIndex(e => e.id === req.params.id);
  
  if (index !== -1) {
    eventos.splice(index, 1);
    res.json({ message: "Evento excluído com sucesso", id: req.params.id });
  } else {
    res.status(404).json({ message: "Evento não encontrado" });
  }
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('eventos').delete().eq('id', id)
});

module.exports = { eventosRoutes: router };
