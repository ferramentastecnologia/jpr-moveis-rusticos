# 🔧 STARKEN TRAFFIC DASHBOARD - GUIA TÉCNICO

**Data:** 9 de Novembro de 2025
**Versão:** 1.0
**Status:** Planejamento Finalizado

---

## 1️⃣ DECISÕES ARQUITETURAIS TOMADAS

✅ **Novo Projeto Separado**
- Não integrado ao Rosa Mexicano Dashboard
- Repositório Git independente
- Escalabilidade dedicada

✅ **Stack Node.js + React**
- Backend: Express.js
- Frontend: React 18+
- Database: PostgreSQL

✅ **Multi-tenant (Starken + Alpha)**
- Schema separado por empresa_id
- Autenticação JWT com tenant_id
- RBAC completo

✅ **Integração Facebook Ads MCP**
- Via claude-code-templates
- Sincronização automática de métricas
- Caching local de dados

---

## 2️⃣ REQUISITOS DE CREDENCIAIS META

### Para Starken Tecnologia Ltda

```
Business Manager ID: [SERÁ FORNECIDO]
Access Token: [SERÁ FORNECIDO]
App ID: [SERÁ FORNECIDO]
App Secret: [SERÁ FORNECIDO]
```

**Como obter:**
1. Acessar: https://business.facebook.com/
2. Ir em: Configurações > Informações da Empresa
3. Copiar: Business Account ID
4. Gerar token em: Ferramentas > Gerenciador de Sistema > Pessoas
5. Selecionar: Todas as contas de anúncios

### Para Alpha Assessoria

```
Business Manager ID: [SERÁ FORNECIDO]
Access Token: [SERÁ FORNECIDO]
App ID: [MESMO ANTERIOR]
App Secret: [MESMO ANTERIOR]
```

---

## 3️⃣ VARIÁVEIS DE AMBIENTE

### .env (Backend)

```env
# NODE
NODE_ENV=production
PORT=3001

# DATABASE
DATABASE_URL=postgresql://user:password@localhost:5432/starken_traffic
DATABASE_POOL_SIZE=20

# JWT
JWT_SECRET=seu-super-secret-key-aqui-randomico
JWT_EXPIRY=24h
JWT_REFRESH_EXPIRY=7d

# META / FACEBOOK ADS
META_API_VERSION=v18.0
META_APP_ID=seu-app-id
META_APP_SECRET=seu-app-secret

# BUSINESS MANAGERS
STARKEN_BM_ID=seu-bm-id-starken
STARKEN_ACCESS_TOKEN=seu-token-starken
ALPHA_BM_ID=seu-bm-id-alpha
ALPHA_ACCESS_TOKEN=seu-token-alpha

# EMAIL (para relatórios)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-app
SMTP_FROM=noreply@starkentecnologia.com.br

# AWS S3 (para armazenar PDFs)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=sua-key
AWS_SECRET_ACCESS_KEY=sua-secret
AWS_S3_BUCKET=starken-traffic-reports

# SENTRY (monitoramento)
SENTRY_DSN=seu-sentry-dsn

# LOGS
LOG_LEVEL=info
```

---

## 4️⃣ WORKFLOW DE DESENVOLVIMENTO

### Etapa 1: Setup Inicial

```bash
# Criar pasta do projeto
mkdir starken-traffic-dashboard
cd starken-traffic-dashboard

# Criar branches
git branch development
git branch staging

# Setup backend
cd backend
npm init -y
npm install express pg jsonwebtoken dotenv axios node-cron bcrypt cors

# Setup frontend
cd ../frontend
npm create vite@latest . -- --template react
npm install axios react-router-dom redux zustand recharts
```

### Etapa 2: Banco de Dados

```bash
# Conectar ao PostgreSQL
createdb starken_traffic

# Executar migrations
psql starken_traffic < migrations/001-create-schema.sql
psql starken_traffic < migrations/002-create-indices.sql
```

### Etapa 3: Variáveis de Ambiente

```bash
# Backend
cp backend/.env.example backend/.env
# Preencher com credenciais reais

# Frontend
cp frontend/.env.example frontend/.env
# Adicionar: VITE_API_URL=http://localhost:3001
```

---

## 5️⃣ ENDPOINTS DA API

### Autenticação
```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me
```

### Empresas (Admin only)
```
GET    /api/empresas
POST   /api/empresas
PUT    /api/empresas/:id
DELETE /api/empresas/:id
```

### Usuários
```
GET    /api/usuarios
POST   /api/usuarios
PUT    /api/usuarios/:id
DELETE /api/usuarios/:id
```

### Clientes
```
GET    /api/clientes
POST   /api/clientes
PUT    /api/clientes/:id
DELETE /api/clientes/:id
GET    /api/clientes/:id/metricas
```

### Campanhas
```
GET    /api/campanhas
GET    /api/campanhas/:id
POST   /api/campanhas/sync
PUT    /api/campanhas/:id/pausar
PUT    /api/campanhas/:id/ativar
```

### Métricas
```
GET    /api/metricas/dashboard
GET    /api/metricas/historico
GET    /api/metricas/comparativo
GET    /api/metricas/cliente/:id
```

### Relatórios
```
GET    /api/relatorios
POST   /api/relatorios/agendar
GET    /api/relatorios/:id/download
DELETE /api/relatorios/:id
```

---

## 6️⃣ ESTRUTURA DE RESPOSTA API

### Sucesso (200)
```json
{
  "success": true,
  "data": { /* dados */ },
  "message": "Operação realizada com sucesso"
}
```

### Erro (4xx/5xx)
```json
{
  "success": false,
  "error": "Descrição do erro",
  "code": "ERROR_CODE",
  "details": { /* contexto */ }
}
```

---

## 7️⃣ JOBS EM BACKGROUND

### sync-metricas.job.js
```
⏰ Executar: 1x por hora
📊 Função: Buscar métricas do dia anterior de todas as campanhas
💾 Armazenar: Em metricas_historico
🔔 Alertar: Se anomalia detectada
```

### gerar-relatorios.job.js
```
⏰ Executar: 23:59 (diariamente)
📄 Função: Gerar PDF/Excel
📧 Enviar: Por email aos gestores
💾 Armazenar: Em S3
```

### verificar-anomalias.job.js
```
⏰ Executar: 2x por dia (8h, 17h)
🔍 Função: Detectar anomalias
📢 Alertar: Via email/SMS
📊 Registrar: Em alertas tabela
```

---

## 8️⃣ SEGURANÇA

### Implementações
- ✅ JWT com expiração
- ✅ HTTPS only
- ✅ CORS configurado
- ✅ Rate limiting
- ✅ Input validation
- ✅ SQL injection prevention (ORM/Prepared statements)
- ✅ Tokens criptografados no DB
- ✅ Logging de ações sensíveis
- ✅ 2FA opcional para admin

### Checklist de Deploy
- [ ] Remover console.logs
- [ ] Habilitar HTTPS
- [ ] Configurar CORS corretamente
- [ ] Setar NODE_ENV=production
- [ ] Ativar rate limiting
- [ ] Configurar logs centralizados
- [ ] Backup automático DB
- [ ] Monitoramento (Sentry/DataDog)

---

## 9️⃣ TESTES

### Unitários
```bash
npm install --save-dev jest supertest
npm test
```

### E2E
```bash
npm install --save-dev cypress
npm run cypress:open
```

### Cobertura
```bash
npm test -- --coverage
# Meta: 80%+
```

---

## 🔟 DEPLOY

### Staging (Railway)
```bash
git push origin staging
# Railway detecta e faz deploy automático
```

### Produção
```bash
git push origin main
# Railway detecta e faz deploy automático
# Backup automático do DB
# SSL certificate automático
```

---

## 1️⃣1️⃣ MONITORAMENTO

### Métricas a Acompanhar
- ✅ Uptime do serviço
- ✅ Tempo de resposta da API
- ✅ Erros não capturados
- ✅ Uso de banco de dados
- ✅ Taxa de sincronização
- ✅ Alertas disparados

### Ferramentas
- **Logs:** Sentry ou Winston
- **APM:** DataDog ou New Relic
- **Uptime:** Uptime Robot
- **Analytics:** Amplitude ou Mixpanel

---

## 1️⃣2️⃣ ROADMAP PÓS-LAUNCH

### V1.1 (Mês 2)
- Previsões de performance (ML)
- Integração com Google Ads
- API pública para clientes

### V1.2 (Mês 3)
- Mobile app (React Native)
- Integração com Slack
- Custom dashboards por cliente

### V2.0 (Mês 6+)
- Multi-idioma (PT/EN/ES)
- Integração com TikTok Ads
- IA para otimização de campanhas

---

## 📌 STATUS ATUAL

**✅ Concluído:**
- Arquitetura definida
- Stack técnico aprovado
- Banco de dados esquematizado
- Endpoints mapeados
- Security guidelines

**⏳ Próximo:**
- Criação do repositório GitHub
- Setup inicial de desenvolvimento
- Implementação fase 1 (Banco + Autenticação)

---

## 🤝 CONTATO & DÚVIDAS

Se tiver dúvidas sobre qualquer decisão técnica, revise este documento ou entre em contato com o time de desenvolvimento.

**Documento criado em:** 9 de Novembro de 2025
**Próxima revisão:** Após inicio da implementação
