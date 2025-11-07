# 🎯 Alpha OKR Dashboard

Dashboard completo de OKRs integrado para Alpha Assessoria, baseado no livro **"Avalie o que Importa"** de John Doerr.

## 📋 Sobre o Projeto

Sistema de gestão de OKRs (Objectives and Key Results) que integra:
- **OKRs** em 4 níveis hierárquicos (Corporativo, Trilha, Time, Individual)
- **CFR** (Conversations, Feedback, Recognition)
- **PDI** (Plano de Desenvolvimento Individual)
- **KPIs** automatizados via APIs
- **Sistema de Medalhas** e gamificação

## 🏗️ Arquitetura

### Frontend
- React 18+ com TypeScript
- Zustand (state management)
- Tailwind CSS + Headless UI
- Recharts e D3.js para visualizações
- React Router v6

### Backend
- Node.js 18+ com Express
- PostgreSQL 15+ com Prisma ORM
- Redis para cache
- Socket.io para atualizações real-time

### Integrações
- Google Ads API
- Meta Ads API
- Google Calendar API
- Sistema PDI existente
- Sistema de Medalhas

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- PostgreSQL 15+
- Redis (opcional para desenvolvimento)

### Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Configurar banco de dados
cd backend
npx prisma migrate dev
npx prisma db seed

# Voltar à raiz e executar
cd ..
npm run dev
```

### Acessar
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Docs: http://localhost:3000/api-docs

## 📁 Estrutura do Projeto

```
alpha-okr-dashboard/
├── backend/              # API Node.js + Express
│   ├── src/
│   │   ├── config/      # Configurações
│   │   ├── controllers/ # Controllers
│   │   ├── middleware/  # Middlewares
│   │   ├── models/      # Models (Prisma)
│   │   ├── routes/      # Rotas
│   │   ├── services/    # Lógica de negócio
│   │   ├── types/       # TypeScript types
│   │   └── utils/       # Utilitários
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/
│   └── tests/
├── frontend/            # React + TypeScript
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── pages/       # Páginas
│   │   ├── store/       # Zustand stores
│   │   ├── hooks/       # Custom hooks
│   │   ├── services/    # API services
│   │   ├── types/       # TypeScript types
│   │   ├── utils/       # Utilitários
│   │   └── assets/      # Imagens, ícones
│   └── tests/
└── docs/                # Documentação
    ├── architecture/
    ├── wireframes/
    └── api/
```

## 🗺️ Roadmap

### ✅ Fase 1: Fundação (6 semanas)
- [ ] Setup de infraestrutura
- [ ] Modelagem de dados
- [ ] API Backend básica
- [ ] Interface básica

### 📅 Fase 2: Integração (6 semanas)
- [ ] Integração com KPIs
- [ ] Integração com PDI
- [ ] Integração com Medalhas
- [ ] Dashboard integrado

### 📅 Fase 3: CFR (6 semanas)
- [ ] Sistema de Conversas (1:1s)
- [ ] Sistema de Feedback
- [ ] Sistema de Reconhecimento
- [ ] Página CFR completa

### 📅 Fase 4: Avançado (8 semanas)
- [ ] Visualizações avançadas
- [ ] Dashboard de Liderança
- [ ] Automações e IA
- [ ] PWA e performance

## 📖 Documentação

- [Arquitetura Completa](./docs/architecture.md)
- [Wireframes](./docs/wireframes.md)
- [API Reference](./docs/api/README.md)
- [Guia de Desenvolvimento](./docs/development.md)

## 👥 Time

- Product Manager: [Nome]
- Backend Developer: [Nome]
- Frontend Developer: [Nome]
- UX/UI Designer: [Nome]

## 📄 Licença

Propriedade privada da Alpha Assessoria. Todos os direitos reservados.
