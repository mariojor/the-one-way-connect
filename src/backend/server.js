
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

// Importar rotas do mock para backup
const { usersRoutes } = require('../mockBackend/routes/users');
const { devocionalRoutes } = require('../mockBackend/routes/devocionais');
const { artigosRoutes } = require('../mockBackend/routes/artigos');
const { eventosRoutes } = require('../mockBackend/routes/eventos');
const { oracoesRoutes } = require('../mockBackend/routes/oracoes');
const { midiasRoutes } = require('../mockBackend/routes/midias');
const { noticiasRoutes } = require('../mockBackend/routes/noticias');
const { estudosRoutes } = require('../mockBackend/routes/estudos');
const { louvoresRoutes } = require('../mockBackend/routes/louvores');
const { familiasRoutes } = require('../mockBackend/routes/familias');
const { missoesRoutes } = require('../mockBackend/routes/missoes');
const { juventudesRoutes } = require('../mockBackend/routes/juventudes');
const { liderancasRoutes } = require('../mockBackend/routes/liderancas');
const { comunidadesRoutes } = require('../mockBackend/routes/comunidades');

// Importar rotas reais do MongoDB
const estudosRoutesDB = require('./routes/estudos');
const oracoesRoutesDB = require('./routes/oracoes');
const midiasRoutesDB = require('./routes/midias');
const noticiasRoutesDB = require('./routes/noticias');
const louvoresRoutesDB = require('./routes/louvores');
const familiasRoutesDB = require('./routes/familias');
const missoesRoutesDB = require('./routes/missoes');
const juventudesRoutesDB = require('./routes/juventudes');
const liderancasRoutesDB = require('./routes/liderancas');
const comunidadesRoutesDB = require('./routes/comunidades');
const eventosRoutesDB = require('./routes/eventos');
const artigosRoutesDB = require('./routes/artigos');
const devocionaisRoutesDB = require('./routes/devocionais');
const usersRoutesDB = require('./routes/users');

// Carregar variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '.env') });

// Conectar ao MongoDB
const app = express();
let dbConnected = false;

// Inicializar conexão com MongoDB
const initDB = async () => {
  try {
    await connectDB();
    dbConnected = true;
    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    console.error('Falha ao conectar ao MongoDB, usando mock data:', error);
    dbConnected = false;
  }
};

// Inicializar a conexão
initDB();

const PORT = process.env.PORT || 3001;

// Configuração CORS mais permissiva para ambiente de desenvolvimento
app.use(cors({
  origin: '*', // Permite qualquer origem em desenvolvimento
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Log para depuração de requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Middleware para rotear entre MongoDB e mock data baseado na conexão
const routeHandler = (mongoRoute, mockRoute) => {
  return (req, res, next) => {
    if (dbConnected) {
      return mongoRoute(req, res, next);
    } else {
      return mockRoute(req, res, next);
    }
  };
};

// Rotas da API com fallback para mock data
app.use('/api/users', routeHandler(usersRoutesDB, usersRoutes));
app.use('/api/devocionais', routeHandler(devocionaisRoutesDB, devocionalRoutes));
app.use('/api/artigos', routeHandler(artigosRoutesDB, artigosRoutes));
app.use('/api/eventos', routeHandler(eventosRoutesDB, eventosRoutes));
app.use('/api/oracao', routeHandler(oracoesRoutesDB, oracoesRoutes));
app.use('/api/midia', routeHandler(midiasRoutesDB, midiasRoutes));
app.use('/api/noticias', routeHandler(noticiasRoutesDB, noticiasRoutes));
app.use('/api/estudos', routeHandler(estudosRoutesDB, estudosRoutes));
app.use('/api/louvor', routeHandler(louvoresRoutesDB, louvoresRoutes));
app.use('/api/familia', routeHandler(familiasRoutesDB, familiasRoutes));
app.use('/api/missoes', routeHandler(missoesRoutesDB, missoesRoutes));
app.use('/api/juventude', routeHandler(juventudesRoutesDB, juventudesRoutes));
app.use('/api/lideranca', routeHandler(liderancasRoutesDB, liderancasRoutes));
app.use('/api/comunidade', routeHandler(comunidadesRoutesDB, comunidadesRoutes));

// Rota de teste e status
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'online', 
    database: dbConnected ? 'MongoDB' : 'Mock Data', 
    timestamp: new Date() 
  });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: true,
    message: 'Erro interno no servidor',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Exporta o app para uso em testes ou para inicialização externa
module.exports = app;

// Para iniciar o servidor diretamente via Node.js
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    const dbStatus = dbConnected ? 'MongoDB' : 'Mock Data (MongoDB não conectado)';
    console.log(`API Server rodando na porta ${PORT} usando ${dbStatus}`);
    console.log(`\nServidor acessível externamente via 0.0.0.0:${PORT}`);
  });
}
