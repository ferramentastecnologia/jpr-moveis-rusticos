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

### 2. Proposta Jacaré Grill
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
