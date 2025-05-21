
const app = require('./server');
const dotenv = require('dotenv');
const path = require('path');

// Carregar configurações do ambiente
dotenv.config({ path: path.join(__dirname, '.env') });

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'; // Permite conexões de qualquer endereço IP

app.listen(PORT, HOST, () => {
  console.log(`API Server rodando na porta ${PORT}`);
  console.log(`Endpoints disponíveis:`);
  console.log(`- GET    http://localhost:${PORT}/api/status (status do servidor e da conexão DB)`);
  console.log(`- Todas as rotas suportam CRUD completo (GET, POST, PUT, DELETE)`);
  console.log(`\nServidor acessível externamente via ${HOST}:${PORT}`);
});
