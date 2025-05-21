
# One Way Church - Backend com MongoDB

Este é o backend da aplicação One Way Church, desenvolvido com Node.js, Express e MongoDB.

## Requisitos

- Node.js (v14+)
- MongoDB instalado localmente ou uma conexão válida para MongoDB Atlas
- NPM ou Yarn

## Configuração

1. Antes de iniciar, certifique-se de que o MongoDB está rodando localmente ou que você possui uma conexão válida para o MongoDB Atlas.
2. Verifique o arquivo `.env` na pasta `src/backend` e ajuste as configurações conforme necessário:

```
PORT=3001
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/oneway-church
JWT_SECRET=oneway_church_secret_key
JWT_EXPIRE=30d
```

## Instalação de Dependências

```bash
npm install
```

## Execução

Para iniciar o servidor:

```bash
node src/backend/startServer.js
```

## Sistema Híbrido (MongoDB + Mock Data)

Este backend foi projetado com um sistema híbrido que tenta usar o MongoDB para armazenar dados, mas reverte para dados de mock caso a conexão com o MongoDB falhe. Isso garante que a aplicação continue funcionando mesmo em ambientes de desenvolvimento sem MongoDB configurado.

### Como funciona:

1. O servidor tenta se conectar ao MongoDB ao iniciar.
2. Se a conexão for bem-sucedida, todas as operações CRUD serão realizadas no MongoDB.
3. Se a conexão falhar, o sistema usará automaticamente o sistema de mock data para todas as operações.
4. O endpoint `/api/status` retorna informações sobre qual sistema de dados está sendo utilizado.

## Rotas Principais

Todas as rotas suportam operações CRUD completas (GET, POST, PUT, DELETE):

- `/api/users` - Gerenciamento de usuários
- `/api/devocionais` - Devocionais diárias
- `/api/artigos` - Artigos e blog
- `/api/eventos` - Eventos da igreja
- `/api/oracao` - Pedidos de oração
- `/api/midia` - Mídias (vídeos e podcasts)
- `/api/noticias` - Notícias
- `/api/estudos` - Estudos bíblicos
- `/api/louvor` - Louvores e músicas
- `/api/familia` - Conteúdo para famílias
- `/api/missoes` - Missões
- `/api/juventude` - Conteúdo para juventude
- `/api/lideranca` - Conteúdo para liderança
- `/api/comunidade` - Conteúdo para comunidade

## Autenticação

O sistema usa autenticação JWT. Para autenticar um usuário:

```
POST /api/users/login
Body: { "email": "email@example.com", "password": "senha" }
```

O token retornado deve ser incluído no header Authorization de requisições para rotas protegidas:

```
Authorization: Bearer <token>
```
