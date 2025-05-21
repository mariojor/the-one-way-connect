
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Autenticar usuário
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    
    // Verificar senha
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    
    // Criar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
    
    // Remover senha do objeto do usuário
    const { password: _, ...userWithoutPassword } = user.toObject();
    
    res.json({
      user: userWithoutPassword,
      token,
      message: "Login bem-sucedido"
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// GET - Obter todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obter usuário específico
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Criar novo usuário
router.post('/', async (req, res) => {
  try {
    // Verificar se o email já está em uso
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Este email já está em uso' });
    }
    
    const user = new User(req.body);
    const novoUser = await user.save();
    
    // Remover senha da resposta
    const { password, ...userWithoutPassword } = novoUser.toObject();
    
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Atualizar usuário existente
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    // Se estiver atualizando o email, verificar se já está em uso
    if (req.body.email && req.body.email !== user.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'Este email já está em uso' });
      }
    }
    
    Object.assign(user, req.body);
    const userAtualizado = await user.save();
    
    // Remover senha da resposta
    const { password, ...userWithoutPassword } = userAtualizado.toObject();
    
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Excluir usuário
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    await user.deleteOne();
    res.json({ message: 'Usuário excluído com sucesso', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Verificar Token
router.post('/verify-token', async (req, res) => {
  const { token } = req.body;
  
  if (!token) {
    return res.status(401).json({ valid: false, message: "Token não fornecido" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ valid: false, message: "Usuário não encontrado" });
    }
    
    res.json({ valid: true, user });
  } catch (error) {
    res.status(401).json({ valid: false, message: "Token inválido" });
  }
});

module.exports = router;
