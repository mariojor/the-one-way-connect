
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para proteger rotas
exports.protect = async (req, res, next) => {
  let token;
  
  // Verificar se o token existe no header Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extrair token do header (formato: Bearer <token>)
    token = req.headers.authorization.split(' ')[1];
  }
  
  // Verificar se o token existe
  if (!token) {
    return res.status(401).json({
      message: 'Sem autorização para acessar esta rota'
    });
  }
  
  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Adicionar o usuário à requisição
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Sem autorização para acessar esta rota'
    });
  }
};

// Middleware para verificar roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        message: 'Erro de configuração do middleware de autorização'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Usuário com role ${req.user.role} não tem permissão para acessar esta rota`
      });
    }
    
    next();
  };
};
