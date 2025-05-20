
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { usersRoutes } = require('./routes/users');
const { devocionalRoutes } = require('./routes/devocionais');
const { artigosRoutes } = require('./routes/artigos');
const { eventosRoutes } = require('./routes/eventos');
const { oracoesRoutes } = require('./routes/oracoes');
const { midiasRoutes } = require('./routes/midias');
const { noticiasRoutes } = require('./routes/noticias');
const { estudosRoutes } = require('./routes/estudos');
const { louvoresRoutes } = require('./routes/louvores');
const { familiasRoutes } = require('./routes/familias');
const { missoesRoutes } = require('./routes/missoes');
const { juventudesRoutes } = require('./routes/juventudes');
const { liderancasRoutes } = require('./routes/liderancas');
const { comunidadesRoutes } = require('./routes/comunidades');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas da API
app.use('/api/users', usersRoutes);
app.use('/api/devocionais', devocionalRoutes);
app.use('/api/artigos', artigosRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/oracao', oracoesRoutes);
app.use('/api/midia', midiasRoutes);
app.use('/api/noticias', noticiasRoutes);
app.use('/api/estudos', estudosRoutes);
app.use('/api/louvor', louvoresRoutes);
app.use('/api/familia', familiasRoutes);
app.use('/api/missoes', missoesRoutes);
app.use('/api/juventude', juventudesRoutes);
app.use('/api/lideranca', liderancasRoutes);
app.use('/api/comunidade', comunidadesRoutes);

// Rota de teste
app.get('/api/status', (req, res) => {
  res.json({ status: 'online', timestamp: new Date() });
});

// Exporta o app para uso em testes ou para inicialização externa
module.exports = app;

// Para iniciar o servidor diretamente via Node.js
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Mock API Server rodando na porta ${PORT}`);
  });
}
