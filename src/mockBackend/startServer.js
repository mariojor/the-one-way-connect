
const app = require('./server');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Mock API Server rodando na porta ${PORT}`);
  console.log(`API endpoints disponíveis:`);
  console.log(`- GET    http://localhost:${PORT}/api/status`);
  console.log(`- GET    http://localhost:${PORT}/api/users`);
  console.log(`- POST   http://localhost:${PORT}/api/users/login`);
  console.log(`- GET    http://localhost:${PORT}/api/devocionais`);
  console.log(`- GET    http://localhost:${PORT}/api/devocionais/data/2025-05-18`);
  console.log(`- GET    http://localhost:${PORT}/api/artigos`);
  console.log(`- GET    http://localhost:${PORT}/api/eventos`);
  console.log(`- GET    http://localhost:${PORT}/api/oracao`);
  console.log(`- GET    http://localhost:${PORT}/api/midia`);
  console.log(`\nTodos os recursos suportam os métodos GET, POST, PUT e DELETE`);
});
