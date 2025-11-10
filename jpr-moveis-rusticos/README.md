# 🌮 JPR Móveis Rústicos - Sistema de Vouchers

Sistema completo de venda de vouchers online para o JPR Móveis Rústicos Blumenau com pagamento via PIX e Cartão de Crédito.

## 🚀 URLs do Projeto

### Produção
- **Landing Page:** https://rosamexicanovouchers.netlify.app/
- **Checkout:** https://rosamexicanovouchers.netlify.app/checkout
- **Página de Sucesso:** https://rosamexicanovouchers.netlify.app/success

### Backend
- **API:** https://jpr-moveis-vouchers-production.up.railway.app
- **Health Check:** https://jpr-moveis-vouchers-production.up.railway.app/health

## 📋 Funcionalidades

### ✅ Sistema Completo
- ✅ Landing page Black November com identidade visual moderna
- ✅ Checkout transparente (PIX e Cartão de Crédito)
- ✅ Geração automática de vouchers com QR Code
- ✅ PDF personalizado com design profissional
- ✅ Página de sucesso mobile-friendly
- ✅ URLs profissionais e amigáveis

### 💳 Pagamentos
- **PIX:** QR Code gerado automaticamente pelo Asaas
- **Cartão:** Checkout transparente integrado
- **Gateway:** Asaas Pagamentos

### 🎫 Vouchers
- Código único gerado automaticamente (formato: RM-XXXXX-XXXXX)
- QR Code para validação
- PDF profissional para download
- Validade de 6 meses
- Armazenamento em SQLite

## 🎨 Identidade Visual

### Cores
- **Rosa:** #C2185B
- **Roxo:** #BA68C8
- **Dourado:** #FFD700
- **Preto:** #000000

### Layout
- Fundo gradiente rosa/roxo
- Container branco com bordas arredondadas
- Cards pretos com borda dourada (tema Black November)
- Responsivo mobile-first

## 🛠️ Tecnologias

### Frontend
- HTML5, CSS3, JavaScript
- Netlify (hosting + redirects)
- Canvas Confetti (animações)
- QRCode.js (geração de QR codes)

### Backend
- Node.js + Express
- SQLite (banco de dados)
- PDFKit (geração de PDFs)
- QRCode (QR codes nos PDFs)
- Nodemailer (emails - desabilitado)
- Railway (hosting)

### Integrações
- **Asaas API:** Pagamentos PIX e Cartão
- **Webhooks:** Processamento automático

## 📂 Estrutura de Arquivos

```
jpr-moveis-dashboard/
├── index-vouchers-black-november.html    # Landing page principal
├── checkout-melhorado.html               # Página de checkout
├── sucesso-voucher.html                  # Página de sucesso
├── server-vouchers.js                    # Backend Node.js
├── _redirects                            # Rotas limpas (Netlify)
├── netlify.toml                          # Config Netlify
├── package.json                          # Dependências
├── vouchers.db                           # Banco SQLite (local)
├── vouchers/                             # PDFs gerados
└── images/                               # Imagens e logos
```

## 🔧 Configuração

### Variáveis de Ambiente (Railway)

```bash
# Asaas Pagamentos
ASAAS_API_KEY=seu_token_asaas

# App
APP_URL=https://rosamexicanovouchers.netlify.app
PORT=3000

# Email (desabilitado)
EMAIL_USER=vouchers@rosamexicano.com.br
EMAIL_PASS=sua_senha

# WhatsApp (desabilitado)
WAHA_API_URL=http://localhost:3001
WAHA_API_KEY=sua_chave
WAHA_SESSION=default
```

### Instalação Local

```bash
# Instalar dependências
npm install

# Rodar servidor
node server-vouchers.js

# Servidor estará em http://localhost:3000
```

## 📱 Rotas da API

### Públicas
- `GET /health` - Health check
- `GET /api/download-pdf?code=XXX` - Download PDF do voucher

### Pagamentos
- `POST /api/create-payment` - Criar cobrança no Asaas
- `POST /api/process-card-payment` - Processar cartão de crédito
- `GET /api/pix-qrcode/:paymentId` - Buscar QR Code PIX

### Webhooks
- `POST /api/webhook` - Webhook do Asaas (automático)

### Admin
- `GET /api/vouchers` - Listar todos vouchers
- `POST /api/validate-voucher` - Validar código do voucher
- `POST /api/process-payment-manually` - Processar pagamento manualmente

### Testes
- `GET /api/test-pdf` - Gerar PDF de teste
- `GET /api/test-email` - Testar envio de email

## 🎯 Fluxo de Compra

1. **Cliente acessa landing page** → Escolhe voucher e quantidade
2. **Redireciona para /checkout** → Preenche dados pessoais
3. **Escolhe método de pagamento:**
   - **PIX:** Gera QR Code → Aguarda confirmação
   - **Cartão:** Processa imediatamente
4. **Webhook do Asaas dispara** → Gera voucher automaticamente
5. **Redireciona para /success** → Mostra código e QR Code
6. **Cliente pode:**
   - Baixar PDF do voucher
   - Tirar screenshot da tela
   - Escanear QR Code

## 🔐 Segurança

- ✅ Validação de CPF no frontend
- ✅ Sanitização de dados antes de enviar ao Asaas
- ✅ Webhook com verificação de status
- ✅ Geração de códigos únicos
- ✅ Timeout em requisições HTTP
- ⚠️ SQLite reseta a cada deploy (usar PostgreSQL em produção)

## 🚨 Problemas Conhecidos

### Cache do Netlify
- Redirects podem cachear versão antiga
- **Solução:** Acessar URL direta ou aguardar 5-10 minutos

### Banco SQLite
- Reseta a cada deploy do Railway
- **Solução:** Migrar para PostgreSQL (próxima versão)

### Email/WhatsApp
- Atualmente desabilitados (linhas 1050-1079 em server-vouchers.js)
- Cliente baixa PDF diretamente

## 📊 Vouchers Disponíveis

### Black November 2025

1. **💎 Crédito Dobrado** - R$ 5,00 = R$ 10,00
2. **🧀 Nachos + Churros em Dobro** - R$ 45,00
3. **🍺 Chopp Liberado** - R$ 60,00
4. **🌮 Taco Tuesday** - R$ 35,00
5. **🎉 Experiência Completa** - R$ 150,00

## 🛠️ Manutenção

### Adicionar Novo Voucher

Editar `index-vouchers-black-november.html`:

```javascript
const vouchers = {
    'voucher-novo': {
        name: '🎁 Nome do Voucher',
        price: 50.00,
        minQty: 1,
        emoji: '🎁'
    }
};
```

### Processar Pagamento Manualmente

```bash
curl -X POST https://jpr-moveis-vouchers-production.up.railway.app/api/process-payment-manually \
  -H "Content-Type: application/json" \
  -d '{"paymentId":"pay_XXXXX"}'
```

## 📞 Contato

**JPR Móveis Rústicos Blumenau**
- 📍 Rua Carlos Rischbieter, 64, Victor Konder, Blumenau - SC
- ☎️ (47) 3288-3096
- 📱 WhatsApp: (47) 99233-4348

## 📝 Licença

Propriedade do JPR Móveis Rústicos Blumenau © 2025

---

**Desenvolvido com ❤️ usando Claude Code**
