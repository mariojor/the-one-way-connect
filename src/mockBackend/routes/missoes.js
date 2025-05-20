
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Import from TypeScript mock data file
let { missoes } = require('../mockDataTS');

// GET - Obter todas as missões
router.get('/', (req, res) => {
  // Map the missions data to match what the front-end expects
  const formattedMissoes = missoes.map(missao => ({
    ...missao,
    missionary: missao.missionary || missao.leader, // Use leader as missionary if missionary is not defined
    date: missao.date || missao.startDate, // Use startDate as date if date is not defined
    status: missao.status.toLowerCase().includes('ativo') ? 'ativo' : 
            missao.status.toLowerCase().includes('conclu') ? 'concluido' : 'planejado'
  }));
  res.json(formattedMissoes);
});

// GET - Obter missão por ID
router.get('/:id', (req, res) => {
  const missao = missoes.find(m => m.id === req.params.id);
  if (!missao) {
    return res.status(404).json({ message: 'Missão não encontrada' });
  }
  
  // Format the mission data to match what the front-end expects
  const formattedMissao = {
    ...missao,
    missionary: missao.missionary || missao.leader,
    date: missao.date || missao.startDate,
    status: missao.status.toLowerCase().includes('ativo') ? 'ativo' : 
            missao.status.toLowerCase().includes('conclu') ? 'concluido' : 'planejado'
  };
  
  res.json(formattedMissao);
});

// POST - Criar nova missão
router.post('/', (req, res) => {
  const novaMissao = {
    id: uuidv4(),
    ...req.body,
  };
  
  missoes.push(novaMissao);
  res.status(201).json(novaMissao);
});

// PUT - Atualizar missão existente
router.put('/:id', (req, res) => {
  const index = missoes.findIndex(m => m.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Missão não encontrada' });
  }
  
  missoes[index] = {
    ...missoes[index],
    ...req.body,
  };
  
  res.json(missoes[index]);
});

// DELETE - Excluir missão
router.delete('/:id', (req, res) => {
  const index = missoes.findIndex(m => m.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Missão não encontrada' });
  }
  
  const missaoRemovida = missoes[index];
  missoes = missoes.filter(m => m.id !== req.params.id);
  
  res.json(missaoRemovida);
});

module.exports = { missoesRoutes: router };
