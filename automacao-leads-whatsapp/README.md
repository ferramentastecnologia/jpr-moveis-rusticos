# Automação de Leads para WhatsApp

Sistema completo de captura e notificação automática de leads via WhatsApp.

## Descrição

Este projeto automatiza o processo de recebimento de leads de landing pages, enviando notificações instantâneas para um grupo do WhatsApp com todos os dados do cliente potencial.

## Componentes

### 1. Landing Page
- Formulário de captura de leads
- Integração com HubSpot Forms API
- Meta Pixel para tracking
- FIPE API para cotação de veículos
- Hospedagem: Netlify

### 2. Evolution API
- Gateway para WhatsApp (protocolo Baileys)
- Gerenciamento de grupos
- Envio de mensagens automatizadas
- Porta: 8080
- Banco de dados: PostgreSQL (Neon.tech)

### 3. n8n Workflow
- Recebe webhook da landing page
- Formata dados do lead
- Envia notificação para grupo WhatsApp
- Porta: 5678

### 4. Localtunnel
- Expõe localhost para internet
- Permite webhook externo acessar n8n local

## Fluxo de Dados

```
Landing Page → HubSpot → Webhook (Localtunnel) → n8n → Evolution API → WhatsApp Grupo
```

## Arquitetura ShieldCar

### URLs
- Landing Page: https://shieldcar-blumenau.netlify.app
- Webhook: https://tall-years-yell.loca.lt/webhook/hubspot-lead
- Evolution API: http://localhost:8080
- n8n: http://localhost:5678

### Grupo WhatsApp
- Nome: 🚗 ShieldCar Leads
- ID: 120363423504755655@g.us
- Participantes:
  - 5547992752697 (Administrador)
  - 5547992212108 (Time Comercial)

### Credenciais Evolution API
- Instance: shieldcar
- API Key: shieldcar_evolution_2024_secure_key_12345
- Banco: PostgreSQL (Neon.tech)

### Workflow n8n
- ID: 1560bf53-e96a-4c97-8e98-1e63a04542e3
- Nome: HubSpot Lead > WhatsApp
- Banco: ~/.n8n/database.sqlite

## Guia de Replicação

Veja o arquivo `GUIA_REPLICACAO.md` para instruções detalhadas de como replicar este projeto para outros clientes.

## Projeto Base

ShieldCar - Associação de Benefícios Automotivos
- Cliente: ShieldCar Blumenau
- Data: Outubro 2024
- Desenvolvido por: Juan Minni
