# ⚡ Quick Start - Alpha OKR Dashboard

## 🚀 Início Rápido (5 minutos)

### 1️⃣ Instalar Dependências

```bash
cd ~/meu-repositorio/alpha-okr-dashboard/backend
npm install
```

### 2️⃣ Configurar Banco de Dados

```bash
# Criar arquivo .env
cp .env.example .env

# Editar .env com suas configurações
# Exemplo de DATABASE_URL:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/alpha_okr_db?schema=public"
```

### 3️⃣ Preparar Banco

```bash
# Gerar cliente Prisma
npx prisma generate

# Criar banco e tabelas
npx prisma migrate dev --name init

# (Opcional) Popular com dados de exemplo
# npx prisma db seed
```

### 4️⃣ Iniciar Servidor

```bash
npm run dev
```

✅ **Pronto!** API rodando em `http://localhost:3000`

## 🧪 Testar API

### Health Check
```bash
curl http://localhost:3000/health
```

### API Info
```bash
curl http://localhost:3000/api/v1
```

### Criar Usuário (exemplo)
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao.silva@alpha.com",
    "password": "senha123",
    "nome": "João Silva",
    "cargo": "Gestor de Tráfego Pleno",
    "nivel": "Pleno",
    "trilha": "OPERACIONAL",
    "departamento": "Operações",
    "dataAdmissao": "2023-01-15T00:00:00Z"
  }'
```

### Criar OKR (exemplo)
```bash
curl -X POST http://localhost:3000/api/v1/okrs \
  -H "Content-Type: application/json" \
  -d '{
    "tipo": "INDIVIDUAL",
    "nivel": 4,
    "objetivo": "Tornar-me especialista em e-commerce de alta performance",
    "tipoObjetivo": "COMPROMETIDO",
    "ownerId": "USER_ID_AQUI",
    "ciclo": "Q1-2025",
    "dataInicio": "2025-01-01T00:00:00Z",
    "dataFim": "2025-03-31T23:59:59Z"
  }'
```

## 📁 Estrutura Criada

```
alpha-okr-dashboard/
├── backend/                     ✅ Implementado
│   ├── src/
│   │   ├── config/             ✅ Config + Prisma client
│   │   ├── controllers/        ✅ 4 controllers
│   │   ├── middleware/         ✅ Error handler
│   │   ├── routes/             ✅ 4 rotas
│   │   ├── services/           ✅ 4 services
│   │   ├── utils/              ✅ Logger
│   │   └── index.ts            ✅ Server
│   ├── prisma/
│   │   └── schema.prisma       ✅ 9 modelos
│   └── package.json            ✅ Configurado
├── frontend/                    ⏳ Próxima fase
├── README.md                    ✅
├── SETUP.md                     ✅
└── QUICKSTART.md               ✅ Você está aqui!
```

## 🎯 O que funciona agora?

✅ **Backend API completa**
- 4 módulos principais (OKR, User, CFR, KPI)
- 25+ endpoints REST
- Banco de dados PostgreSQL com Prisma
- Error handling
- Logging
- TypeScript

## ⏭️ Próximos Passos

1. **Criar dados de teste** - Criar seed.ts
2. **Frontend** - Iniciar React + TypeScript
3. **Autenticação** - Implementar JWT
4. **Testes** - Adicionar testes unitários

## 📊 Endpoints Disponíveis

### OKRs
- `GET /api/v1/okrs` - Listar todos
- `POST /api/v1/okrs` - Criar novo
- `GET /api/v1/okrs/:id` - Buscar um
- `PUT /api/v1/okrs/:id` - Atualizar
- `DELETE /api/v1/okrs/:id` - Deletar
- `GET /api/v1/okrs/user/:userId` - Por usuário
- `GET /api/v1/okrs/ciclo/:ciclo` - Por ciclo
- `GET /api/v1/okrs/:id/hierarchy` - Hierarquia
- `POST /api/v1/okrs/:id/update-progress` - Atualizar progresso

### Users
- `GET /api/v1/users` - Listar todos
- `POST /api/v1/users` - Criar novo
- `GET /api/v1/users/:id` - Buscar um
- `PUT /api/v1/users/:id` - Atualizar
- `DELETE /api/v1/users/:id` - Deletar
- `GET /api/v1/users/:id/dashboard` - Dashboard completo
- `GET /api/v1/users/:id/team` - Time do gestor

### CFR
- `POST /api/v1/cfr/conversas` - Criar conversa
- `GET /api/v1/cfr/conversas/user/:userId` - Conversas
- `POST /api/v1/cfr/feedbacks` - Criar feedback
- `GET /api/v1/cfr/feedbacks/user/:userId` - Feedbacks
- `POST /api/v1/cfr/reconhecimentos` - Criar reconhecimento
- `GET /api/v1/cfr/reconhecimentos/user/:userId` - Reconhecimentos

### KPIs
- `POST /api/v1/kpis` - Criar KPI
- `GET /api/v1/kpis/user/:userId` - KPIs do usuário
- `POST /api/v1/kpis/sync/:userId` - Sincronizar

## 🛠️ Ferramentas Úteis

### Prisma Studio (UI do Banco)
```bash
cd backend
npx prisma studio
```
Abre em `http://localhost:5555`

### Ver Logs
```bash
# Servidor mostra logs automaticamente
# Level configurável em .env: LOG_LEVEL=debug
```

## 🐛 Problemas Comuns

**Port 3000 já em uso**
```bash
# Matar processo
lsof -ti:3000 | xargs kill -9
```

**Prisma não conecta**
```bash
# Testar conexão PostgreSQL
psql postgresql://user:pass@localhost:5432/alpha_okr_db

# Regenerar cliente
npx prisma generate
```

**Migrations não aplicam**
```bash
# Reset completo (CUIDADO: deleta dados!)
npx prisma migrate reset

# Forçar nova migration
npx prisma migrate dev --create-only
npx prisma migrate dev
```

## 📚 Documentação Completa

- **README.md** - Visão geral do projeto
- **SETUP.md** - Guia completo de setup e próximos passos
- **arquitetura JSON** - `/Users/juanminni/alpha-okr-dashboard-architecture.json`
- **Wireframes** - `/Users/juanminni/alpha-okr-wireframes.md`

## 💡 Dicas

- Use Prisma Studio para visualizar dados: `npx prisma studio`
- Logs em tempo real: servidor mostra automaticamente
- Teste endpoints com Postman ou Insomnia
- Veja schema completo: `backend/prisma/schema.prisma`

---

✨ **Pronto para começar!** Execute os 4 passos acima e sua API estará rodando.
