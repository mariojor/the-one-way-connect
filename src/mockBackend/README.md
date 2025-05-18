
# API REST Simulada

Este é um backend simulado que imita a funcionalidade de uma API REST completa sem depender de um banco de dados real. Em vez disso, utiliza dados em memória para simular o armazenamento.

## Como iniciar o servidor

Para iniciar o servidor mock, execute:

```bash
node src/mockBackend/startServer.js
```

O servidor iniciará na porta 3001 por padrão.

## Endpoints disponíveis

### Status
- GET `/api/status` - Verifica o status do servidor

### Usuários
- GET `/api/users` - Lista todos os usuários
- GET `/api/users/:id` - Obtém um usuário específico
- POST `/api/users` - Cria um novo usuário
- PUT `/api/users/:id` - Atualiza um usuário existente
- DELETE `/api/users/:id` - Exclui um usuário
- POST `/api/users/login` - Autentica um usuário

### Devocionais
- GET `/api/devocionais` - Lista todos os devocionais
- GET `/api/devocionais/:id` - Obtém um devocional específico
- GET `/api/devocionais/data/:date` - Obtém um devocional por data (formato YYYY-MM-DD)
- POST `/api/devocionais` - Cria um novo devocional
- PUT `/api/devocionais/:id` - Atualiza um devocional existente
- DELETE `/api/devocionais/:id` - Exclui um devocional

### Artigos
- GET `/api/artigos` - Lista todos os artigos
- GET `/api/artigos/:id` - Obtém um artigo específico
- GET `/api/artigos/tag/:tag` - Obtém artigos por tag
- POST `/api/artigos` - Cria um novo artigo
- PUT `/api/artigos/:id` - Atualiza um artigo existente
- DELETE `/api/artigos/:id` - Exclui um artigo

### Eventos
- GET `/api/eventos` - Lista todos os eventos
- GET `/api/eventos/:id` - Obtém um evento específico
- GET `/api/eventos/futuros` - Obtém eventos futuros (a partir de hoje)
- POST `/api/eventos` - Cria um novo evento
- PUT `/api/eventos/:id` - Atualiza um evento existente
- DELETE `/api/eventos/:id` - Exclui um evento

## Migração para Supabase

Para migrar este backend simulado para o Supabase no futuro, procure por comentários no código que começam com "COMENTÁRIO:". Esses comentários indicam onde o código precisaria ser alterado para usar o Supabase.

Em geral, você precisaria:

1. Configurar um projeto Supabase
2. Criar tabelas correspondentes aos dados simulados
3. Substituir as chamadas de API simuladas por chamadas reais do Supabase
4. Configurar autenticação e autorização no Supabase
