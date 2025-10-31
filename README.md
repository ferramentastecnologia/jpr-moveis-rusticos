# 🚀 Starken Tecnologia Ltda - Propostas & Projetos

Repositório centralizado de propostas comerciais e projetos da Starken Tecnologia Ltda.

## 📋 PROPOSTAS COMERCIAIS ATIVAS

### 1. Proposta New Service Sul Packaging
**Cliente:** New Service Sul Packaging (Cris)
**Segmento:** B2B Industrial - Embalagens & Logística Reversa
**Investimento:** R$ 4.000/mês + R$ 1.000/semana tráfego

**🌐 URLs:**
- **Site:** https://proposta-new-service-starken.netlify.app
- **Admin:** https://app.netlify.com/projects/proposta-new-service-starken
- **Arquivo:** `public/proposta-new-service.html`

**Características:**
- Design B2B clean e minimalista
- Identidade visual do cliente (verde #76ae52 + azul #4676b0)
- 9 benefícios B2B específicos
- Projeto completo: Automação + CRM HubSpot + Landing Page

---

### 2. Proposta FNP - Frango Frito (Alpha Assessoria)
**Cliente:** FNP - Frango Frito
**Segmento:** Restaurante/Delivery - Frango Frito Artesanal
**Localização:** Jaraguá do Sul (SC)
**Investimento:** R$ 4.000/mês (R$ 2.500 assessoria + R$ 1.500 tráfego)
**Marca:** 🟡⚫ **Alpha Assessoria** - Marketing e Tecnologia para Restaurantes

**🌐 URLs:**
- **Site:** https://fnp--proposta-new-service-starken.netlify.app
- **Admin:** https://app.netlify.com/projects/proposta-new-service-starken
- **Arquivo:** `public/proposta-fnp.html`

**🎨 Identidade Visual:**
- **Cores:** Preto (#1A1A1A) + Amarelo (#FFD700) - Alpha Assessoria
- Design moderno com efeitos hover (cards mudam para preto/amarelo)
- Shadow effects com brilho amarelo
- Foco em restaurantes e food business

**Características:**
- Foco em combo individual e posicionamento local
- Estratégias: Meta Ads (60%), iFood Ads (25%), Google Local (15%)
- Diferenciação: "Frango Artesanal de Jaraguá" vs concorrente genérico
- Conteúdo sensorial ASMR + storytelling local
- Meta 90 dias: +80% vendas, ROAS 5x, +2k seguidores

**🎯 Diferenciais:**
- Posicionamento local forte ("Feito em Jaraguá")
- Produto herói: Combo Individual premium-acessível
- Conteúdo sensorial (vídeos ASMR frango crocante)
- Programa de fidelização estruturado

---

### 3. Dashboard Rosa Mexicano (Starken Tecnologia)
**Cliente:** Rosa Mexicano
**Tipo:** Dashboard de Planejamento Estratégico
**Período:** 90 dias (12 semanas)
**Investimento Total:** R$ 12.000 (assessoria + mídia)

**🌐 URLs:**
- **Site:** https://rosa-mexicano--proposta-new-service-starken.netlify.app
- **Admin:** https://app.netlify.com/projects/proposta-new-service-starken
- **Arquivo:** `rosa-mexicano-dashboard/index.html`

**🎨 Identidade Visual:**
- **Cores Principais:** Vermelho Mexicano (#D32F2F) + Laranja (#FF6F00)
- **Cores Secundárias:** Verde Starken (#76ae52) + Azul (#4676b0)
- Design responsivo e interativo
- Sistema de tabs navegável

**📊 Funcionalidades:**
- **5 Tabs Principais:**
  1. 📊 Visão Geral - KPIs e progresso
  2. 📅 Timeline - Cronograma 12 semanas
  3. 🎯 Metas - 8 indicadores de performance
  4. ✅ Ações - Checklist interativo (25 itens)
  5. 📈 Métricas - Marketing digital detalhado

- **Cards Interativos:**
  - Faturamento mensal
  - Ticket médio
  - Pedidos/dia
  - Avaliação média
  - Impressões, CTR, CPC
  - Taxa engajamento

- **Recursos Visuais:**
  - Barra de progresso animada
  - Timeline com markers coloridos (verde = completo)
  - Checklist clicável com contagem automática
  - Tabela de metas comparativa
  - Cards de goal com gradientes

**🎯 Metas 90 Dias:**
- +50% pedidos delivery (30 → 67/dia)
- +30% faturamento (R$ 65k → R$ 110k)
- 4.8★ avaliação média
- ROAS 5x
- Taxa recompra 35%

**🛠️ Tecnologias:**
- HTML5 + CSS3 (Vanilla)
- JavaScript puro (sem frameworks)
- Design responsivo mobile-first
- Animações CSS nativas

---

### 4. Proposta Jacaré Grill
**Cliente:** Jacaré Grill (Carlos Alberto)
**Segmento:** Restaurante/Delivery
**Investimento:** R$ 1.000/mês + R$ 200-250/semana tráfego
**Arquivo:** `public/proposta-jacare-grill.html`

---

## 🏗️ PROJETOS DE CLIENTES

### ShieldCar Blumenau - Sistema de Captação de Leads

Sistema completo de captação e notificação de leads para proteção veicular, integrando Landing Page, HubSpot CRM, n8n e WhatsApp via Evolution API.

**Landing Page:** https://shieldcar-blumenau.netlify.app

## 📋 Funcionalidades

- ✅ Landing page responsiva com formulário de cotação
- ✅ Integração com FIPE API para dados de veículos
- ✅ Captura de leads no HubSpot CRM
- ✅ Notificação automática via WhatsApp
- ✅ Workflow automatizado com n8n
- ✅ Tracking com Meta Pixel
- ✅ Validação em tempo real de formulário
- ✅ Captura de parâmetros UTM

## 🏗️ Arquitetura

```
Cliente → Landing Page (Netlify)
              ↓
        ┌─────────┬─────────┐
        ↓         ↓         ↓
    HubSpot    n8n      Meta Pixel
     (CRM)  (Workflow)  (Tracking)
              ↓
        Evolution API
              ↓
          WhatsApp
```

## 🛠️ Tecnologias

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Hosting:** Netlify
- **CRM:** HubSpot
- **Automation:** n8n
- **WhatsApp:** Evolution API
- **Database:** PostgreSQL (Neon.tech)
- **APIs:** FIPE API, HubSpot Forms API

## 📦 Estrutura do Projeto

```
meu-repositorio/
├── public/
│   └── index.html              # Landing page principal
├── evolution-api/              # Evolution API (WhatsApp)
│   ├── .env                    # Configurações
│   └── ...
├── docs/                       # Documentação
│   ├── INSTALACAO.md          # Guia de instalação
│   ├── ARQUITETURA.md         # Detalhes da arquitetura
│   ├── API.md                 # Documentação das APIs
│   └── MANUTENCAO.md          # Manutenção e troubleshooting
├── hubspot-whatsapp-workflow.json  # Workflow do n8n
├── .gitignore
├── netlify.toml               # Configuração do Netlify
└── README.md                  # Este arquivo
```

## 🚀 Quick Start

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd meu-repositorio
```

### 2. Configure as variáveis de ambiente

Veja a documentação completa em [docs/INSTALACAO.md](docs/INSTALACAO.md)

### 3. Deploy

```bash
netlify deploy --prod
```

## 📖 Documentação Completa

- [📥 Instalação](docs/INSTALACAO.md) - Guia passo a passo de instalação
- [🏗️ Arquitetura](docs/ARQUITETURA.md) - Detalhes técnicos da arquitetura
- [🔌 APIs](docs/API.md) - Documentação das integrações
- [🔧 Manutenção](docs/MANUTENCAO.md) - Como manter o sistema rodando

## 🔑 Configurações Principais

### HubSpot
- Portal ID: `50633225`
- Form ID: `528f0f6e-026b-424d-8c9c-ad1506083856`

### n8n
- Porta local: `5678`
- Webhook: `/webhook/hubspot-lead`

### Evolution API
- Porta local: `8080`
- Instância: `shieldcar`

### Meta Pixel
- Pixel ID: `1581222786653125`

## 📊 Fluxo de Dados

1. Cliente preenche formulário na landing page
2. Dados são enviados para HubSpot Forms API
3. Lead é salvo no HubSpot CRM
4. Site envia dados para n8n webhook
5. n8n processa os dados e formata a mensagem
6. Evolution API envia notificação para WhatsApp

## 📱 Mensagem WhatsApp

```
🚗 *NOVO LEAD - ShieldCar*

👤 [Nome do Cliente]
📧 [Email]
📱 [Telefone]

🚙 *Veículo:*
• [Tipo]
• [Marca] [Modelo]
• Ano: [Ano]
• Placa: [Placa]

📍 [Cidade]/[Estado]
```

## 🔧 Desenvolvimento Local

```bash
# Instalar n8n
npm install -g n8n

# Iniciar n8n
n8n start

# Em outro terminal, iniciar Evolution API
cd evolution-api
npm start

# Deploy do site
cd public
netlify dev
```

## 📝 Licença

Todos os direitos reservados - ShieldCar © 2025

## 👨‍💻 Desenvolvido por

Claude Code + Juan Minni

---

**Status:** ✅ Em Produção
**Última atualização:** Outubro 2025
