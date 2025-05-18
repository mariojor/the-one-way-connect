
const express = require('express');
const router = express.Router();
let { users } = require('../mockData');

// Autenticar usuário
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simulação de autenticação básica
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Remover a senha antes de retornar o usuário
    const { password, ...userWithoutPassword } = user;
    
    // Simular resposta de token (em produção seria um JWT real)
    res.json({
      user: userWithoutPassword,
      token: `mock-token-${user.id}-${Date.now()}`,
      message: "Login bem-sucedido"
    });
    
    // COMENTÁRIO: Em produção com Supabase, usaria auth.signIn() 
    // ou equivalente para autenticação real
  } else {
    res.status(401).json({ message: "Credenciais inválidas" });
  }
});

// Obter todos os usuários
router.get('/', (req, res) => {
  // Retornar usuários sem expor senhas
  const safeUsers = users.map(({password, ...user}) => user);
  res.json(safeUsers);
  
  // COMENTÁRIO: Em produção com Supabase, usaria supabase
  // .from('users').select() para buscar usuários da tabela
});

// Obter um usuário específico
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  
  if (user) {
    const {password, ...safeUser} = user;
    res.json(safeUser);
  } else {
    res.status(404).json({ message: "Usuário não encontrado" });
  }
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('users').select().eq('id', id).single()
});

// Criar um novo usuário
router.post('/', (req, res) => {
  const newUser = {
    id: String(users.length + 1),
    ...req.body
  };
  
  users.push(newUser);
  
  // Retornar usuário criado sem expor a senha
  const {password, ...safeUser} = newUser;
  res.status(201).json(safeUser);
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('users').insert([{ ... }])
});

// Atualizar um usuário existente
router.put('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    
    // Retornar usuário atualizado sem expor a senha
    const {password, ...safeUser} = users[index];
    res.json(safeUser);
  } else {
    res.status(404).json({ message: "Usuário não encontrado" });
  }
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('users').update({ ... }).eq('id', id)
});

// Excluir um usuário
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    res.json({ message: "Usuário excluído com sucesso", id: req.params.id });
  } else {
    res.status(404).json({ message: "Usuário não encontrado" });
  }
  
  // COMENTÁRIO: Em produção com Supabase, usaria 
  // supabase.from('users').delete().eq('id', id)
});

module.exports = { usersRoutes: router };
