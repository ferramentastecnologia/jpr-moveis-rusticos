# 🎯 STARKEN TRAFFIC DASHBOARD - PLANO COMPLETO

**Data de Criação:** 9 de Novembro de 2025
**Status:** Planejamento Concluído - Pronto para Implementação
**Gestor:** Juan Minni - Starken Tecnologia Ltda

---

## 📋 RESUMO EXECUTIVO

Sistema profissional, escalável e multi-tenant para gerenciar campanhas de Facebook Ads de múltiplas contas e Business Managers em um único dashboard centralizado.

**Empresas Envolvidas:**
- 🏢 **Starken Tecnologia Ltda** (Empresa Principal)
  - Business Manager: Starken Tecnologia Ltda
  - Clientes: Próprios

- 🏢 **Alpha Assessoria** (Sub-empresa)
  - Business Manager: Alpha Assessoria
  - Clientes: Matriz de Franquia

---

## 🏗️ ARQUITETURA TÉCNICA

```
┌─────────────────────────────────────────────────────────┐
│         FRONTEND - React Dashboard                       │
│  (Métricas, Clientes, Campanhas, Relatórios)           │
└────────────────┬────────────────────────────────────────┘
                 │ (REST API)
┌─────────────────▼────────────────────────────────────────┐
│  API Express.js - Traffic Manager API                   │
│  ├─ /api/auth (Multi-tenant JWT)                        │
│  ├─ /api/empresas (Gestão Starken + Alpha)              │
│  ├─ /api/clientes (Cadastro de clientes)                │
│  ├─ /api/campanhas (Dashboard de campanhas)             │
│  ├─ /api/metricas (Analytics em tempo real)             │
│  ├─ /api/relatorios (Geração de reports)                │
│  └─ /api/webhooks (Sincronização automática)            │
└────────────────┬────────────────────────────────────────┘
                 │ (MCP Protocol)
┌─────────────────▼────────────────────────────────────────┐
│  Facebook Ads MCP Server                                 │
│  (Integração com Meta/Facebook Ads APIs)                │
└────────────────┬────────────────────────────────────────┘
                 │
┌─────────────────▼────────────────────────────────────────┐
│  PostgreSQL Database (Multi-tenant)                      │
│  ├─ Schema: public (base dados)                          │
│  ├─ Tabelas de Empresas                                 │
│  ├─ Usuários com permissões RBAC                        │
│  ├─ Business Managers Meta                              │
│  ├─ Clientes                                             │
│  ├─ Campanhas (cache)                                    │
│  ├─ Métricas (histórico)                                │
│  └─ Alertas e Anomalias                                 │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 SCHEMA PostgreSQL (Multi-tenant)

```sql
-- Empresas
CREATE TABLE empresas (
  id UUID PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  tipo ENUM('principal', 'secundaria'),
  ativa BOOLEAN DEFAULT true,
  criada_em TIMESTAMP DEFAULT NOW()
);

-- Usuários
CREATE TABLE usuarios (
  id UUID PRIMARY KEY,
  empresa_id UUID REFERENCES empresas(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  senha_hash VARCHAR(255),
  nome VARCHAR(255),
  role ENUM('admin', 'gestor', 'analista', 'cliente') DEFAULT 'analista',
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- Business Managers Meta
CREATE TABLE business_managers (
  id UUID PRIMARY KEY,
  empresa_id UUID REFERENCES empresas(id),
  nome VARCHAR(255),
  account_id VARCHAR(255) UNIQUE NOT NULL,
  access_token VARCHAR(500) ENCRYPTED,
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- Clientes
CREATE TABLE clientes (
  id UUID PRIMARY KEY,
  empresa_id UUID REFERENCES empresas(id),
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20),
  segmento VARCHAR(100),
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- Campanhas (Cache local)
CREATE TABLE campanhas_cache (
  id UUID PRIMARY KEY,
  cliente_id UUID REFERENCES clientes(id),
  campaign_id VARCHAR(255),
  nome VARCHAR(255),
  status VARCHAR(50),
  orcamento_diario DECIMAL(10,2),
  sincronizada_em TIMESTAMP
);

-- Métricas (Histórico)
CREATE TABLE metricas_historico (
  id UUID PRIMARY KEY,
  campanhas_cache_id UUID REFERENCES campanhas_cache(id),
  data DATE,
  gasto DECIMAL(10,2),
  impressoes INTEGER,
  cliques INTEGER,
  conversoes INTEGER,
  receita DECIMAL(10,2),
  ctr DECIMAL(5,3),
  cpc DECIMAL(10,2),
  cpm DECIMAL(10,2),
  roas DECIMAL(5,3),
  registrada_em TIMESTAMP DEFAULT NOW()
);

-- Alertas
CREATE TABLE alertas (
  id UUID PRIMARY KEY,
  cliente_id UUID REFERENCES clientes(id),
  tipo VARCHAR(50),
  descricao TEXT,
  valor_anomalia DECIMAL(10,2),
  valor_esperado DECIMAL(10,2),
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT NOW()
);
```

---

## 🔐 AUTENTICAÇÃO & PERMISSÕES

### JWT Multi-tenant
- Token contém: `user_id`, `empresa_id`, `role`
- Duração: 24h (refresh: 7 dias)
- Validação em cada requisição

### RBAC (Role-Based Access Control)
```
Admin (Starken Principal)
  ├─ Gerenciar empresas (Starken + Alpha)
  ├─ Gerenciar usuários de todas as empresas
  ├─ Acessar todos os dados
  └─ Configurar integrações Meta

Gestor (Starken ou Alpha)
  ├─ Gerenciar clientes da sua empresa
  ├─ Ver todas as métricas
  ├─ Gerar relatórios
  └─ Configurar automações

Analista (Starken ou Alpha)
  ├─ Ver métricas
  ├─ Gerar relatórios
  └─ Consultar históricos

Cliente (Starken ou Alpha)
  ├─ Ver apenas suas métricas
  └─ Baixar seus relatórios
```

---

## 📲 FUNCIONALIDADES PRINCIPAIS

### 1. Dashboard Executivo
- **KPIs Consolidados**
  - Gasto total (Starken + Alpha)
  - ROI geral
  - CTR médio
  - CPC médio

- **Por Empresa**
  - Gastos Starken vs Alpha
  - Campanhas ativas
  - Top 5 campanhas

- **Por Cliente**
  - Ranking por gasto
  - Ranking por ROAS
  - Status de campanhas

### 2. Gestão de Clientes
- Cadastro de clientes (nome, email, segmento)
- Histórico de gastos por cliente
- Assocação de campanhas Meta
- Permissões por cliente
- Export de cliente

### 3. Analytics em Tempo Real
- Sincronização horária com Facebook Ads
- Gráficos: Gastos, CTR, CPC, ROAS
- Comparativos: Dia/Semana/Mês/Ano
- Filtros: Por empresa, cliente, período
- Tabelas detalhadas de campanhas

### 4. Relatórios Automáticos
- **Formatos:** PDF + Excel
- **Frequência:** Diário, Semanal, Mensal
- **Distribuição:** Email automático
- **Conteúdo:**
  - Resumo executivo
  - KPIs principais
  - Gráficos comparativos
  - Recomendações
  - Histórico YoY

### 5. Automações Inteligentes
- **Pausar campanhas** com ROI < 1.5
- **Aumentar orçamento** em campanhas top (ROI > 3)
- **Alertas** de CPC acima do esperado
- **Relatórios** agendados
- **Regras customizáveis** por cliente

### 6. Sincronização Automática
- Cron job a cada 1 hora
- Sincroniza métricas do dia anterior
- Cache local para performance
- Histórico de 12 meses

### 7. Anomaly Detection
- Aumento de CPC > 50%
- Queda de CTR > 30%
- ROI negativo
- Campanhas pausadas inesperadamente
- Alertas por email + SMS

---

## 🛠️ STACK TÉCNICO

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Banco:** PostgreSQL 14+
- **Autenticação:** JWT + bcrypt
- **Integração:** Facebook Ads MCP
- **Job Scheduler:** node-cron
- **Gerador de Docs:** Swagger/OpenAPI

### Frontend
- **Framework:** React 18+
- **UI Components:** Material-UI ou Tailwind CSS
- **Charts:** Recharts ou Chart.js
- **State:** Redux ou Zustand
- **HTTP Client:** Axios
- **Build:** Vite ou Create React App

### Infrastructure
- **Deploy:** Railway, Vercel ou AWS
- **Database:** Railway PostgreSQL
- **Storage:** S3 para PDFs/Excel
- **Monitoring:** Sentry ou LogRocket

---

## 📁 ESTRUTURA DO PROJETO

```
starken-traffic-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── meta-client.js
│   │   │   └── env.js
│   │   ├── middleware/
│   │   │   ├── auth.js (JWT validation)
│   │   │   ├── tenant.js (multi-tenant)
│   │   │   └── rbac.js (permissões)
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── empresas.controller.js
│   │   │   ├── clientes.controller.js
│   │   │   ├── campanhas.controller.js
│   │   │   ├── metricas.controller.js
│   │   │   └── relatorios.controller.js
│   │   ├── services/
│   │   │   ├── meta.service.js (integração Facebook Ads)
│   │   │   ├── sync.service.js (sincronização)
│   │   │   ├── relatorios.service.js (gerador de reports)
│   │   │   └── alertas.service.js (anomaly detection)
│   │   ├── models/
│   │   │   ├── empresa.js
│   │   │   ├── usuario.js
│   │   │   ├── cliente.js
│   │   │   ├── campanha.js
│   │   │   └── metrica.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── empresas.routes.js
│   │   │   ├── clientes.routes.js
│   │   │   ├── campanhas.routes.js
│   │   │   ├── metricas.routes.js
│   │   │   └── relatorios.routes.js
│   │   ├── jobs/
│   │   │   ├── sync-metricas.job.js
│   │   │   ├── gerar-relatorios.job.js
│   │   │   └── verificar-anomalias.job.js
│   │   └── app.js
│   ├── migrations/
│   │   ├── 001-create-schema.sql
│   │   ├── 002-create-indices.sql
│   │   └── ...
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Clientes/
│   │   │   ├── Campanhas/
│   │   │   ├── Metricas/
│   │   │   └── Relatorios/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── store/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── API.md
│   ├── SETUP.md
│   ├── DEPLOYMENT.md
│   └── FAQ.md
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🚀 PRÓXIMOS PASSOS

### Fase 1: Setup & Banco de Dados (Semana 1)
- [ ] Criar repositório GitHub
- [ ] Setup PostgreSQL
- [ ] Implementar schema
- [ ] Migrations

### Fase 2: Backend (Semana 2-3)
- [ ] Autenticação JWT multi-tenant
- [ ] CRUD de empresas, usuários, clientes
- [ ] Integração Facebook Ads MCP
- [ ] API de métricas

### Fase 3: Frontend (Semana 3-4)
- [ ] Setup React + Vite
- [ ] Dashboard principal
- [ ] Componentes de clientes, campanhas
- [ ] Gráficos e analytics

### Fase 4: Relatórios & Automações (Semana 4-5)
- [ ] Gerador de PDF/Excel
- [ ] Agendamento de relatórios
- [ ] Sistema de alertas
- [ ] Anomaly detection

### Fase 5: Deploy & Testes (Semana 5-6)
- [ ] Testes unitários e E2E
- [ ] Documentação
- [ ] Deploy staging
- [ ] Deploy produção

---

## 🔑 CREDENCIAIS NECESSÁRIAS

Você vai precisar fornecer:

1. **Business Manager Starken Tecnologia Ltda**
   - [ ] Access Token (gerado em Meta)
   - [ ] Business Account ID

2. **Business Manager Alpha Assessoria**
   - [ ] Access Token (gerado em Meta)
   - [ ] Business Account ID

3. **Banco de Dados**
   - [ ] URL de conexão PostgreSQL (ou será criada)
   - [ ] Username/Password

---

## 💡 NOTAS IMPORTANTES

- **Segurança:** Tokens Meta serão armazenados criptografados
- **Performance:** Métricas serão cacheadas localmente
- **Escalabilidade:** Schema preparado para múltiplas empresas
- **Compliance:** LGPD/GDPR ready (permissões por dados)

---

## 📞 CONTATO

**Desenvolvedor:** Claude Code / Anthropic
**Projeto:** Starken Traffic Dashboard
**Status:** Pronto para Início de Implementação
**Data:** 9 de Novembro de 2025

---

*Próximas etapas: Aguardando aprovação do plano e credenciais Meta para iniciar implementação.*
