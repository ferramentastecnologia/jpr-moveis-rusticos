# 📁 Estrutura de Projetos - Rosa Mexicano Blumenau

## 📊 Organização dos Projetos

```
Rosa Mexicano Blumenau/
│
├── README.md                           # Documentação geral (LEIA PRIMEIRO!)
├── ESTRUTURA-PROJETOS.md              # Este arquivo
│
├── 🎟️ dashboard-vouchers/             # Sistema de vouchers e admin
│   ├── README.md
│   │
│   ├── 📱 FRONTEND (Netlify)
│   │   ├── index-vouchers-black-november.html    # Landing page com vouchers
│   │   ├── checkout.html                         # Carrinho de compras
│   │   ├── sucesso-voucher.html                  # Confirmação de compra
│   │   ├── admin-login.html                      # Login do admin
│   │   ├── admin-vouchers.html                   # Dashboard admin
│   │   ├── validar-voucher.html                  # Validação por QR/código
│   │   └── images/                               # Logos e assets
│   │
│   ├── 🖥️ BACKEND (Railway)
│   │   ├── server-vouchers.js                    # Servidor Node.js
│   │   ├── database.js                           # Config do banco
│   │   ├── package.json                          # Dependências
│   │   └── Procfile                              # Config Railway
│   │
│   ├── 📋 DOCUMENTAÇÃO
│   │   ├── CREDENCIAIS_ADMIN.txt                 # Admin (usuario/senha)
│   │   ├── INSTRUCOES_ADMIN.md                   # Guia de uso
│   │   ├── DEPLOY-COMPLETO.md                    # Deploy passo a passo
│   │   └── ... (40+ arquivos de documentação)
│   │
│   └── 🗄️ DATABASE
│       └── vouchers.db                           # SQLite (dev)
│
└── 🌮 linktree/                        # Landing page moderna
    ├── README.md
    │
    ├── 📱 FRONTEND (Netlify)
    │   ├── linktree.html                         # Página principal
    │   └── images/                               # Logos
    │
    └── 📋 DOCUMENTAÇÃO
        └── Descrição do projeto
```

---

## 🚀 URLs em Produção

### Dashboard de Vouchers
| Página | URL |
|--------|-----|
| 🛒 **Vendas** | https://rosamexicanovouchers.netlify.app/ |
| 👨‍💼 **Admin** | https://rosamexicanovouchers.netlify.app/admin-login.html |
| ✅ **Validação** | https://rosamexicanovouchers.netlify.app/validar-voucher.html |

### Landing Page Linktree
| Página | URL |
|--------|-----|
| 🌐 **Homepage** | https://rosamexicanovouchers.netlify.app/linktree.html |

---

## 🔐 Credenciais Admin

**Arquivo:** `dashboard-vouchers/CREDENCIAIS_ADMIN.txt`

```
Usuário: admin
Senha: rosa2025
```

---

## 📚 Documentação por Projeto

### Dashboard Vouchers
Leia primeiro: `dashboard-vouchers/README.md`

Documentos importantes:
- `CREDENCIAIS_ADMIN.txt` - Credenciais de acesso
- `INSTRUCOES_ADMIN.md` - Como usar o admin
- `DEPLOY-COMPLETO.md` - Guia de deployment
- `TROUBLESHOOTING.md` - Solução de problemas

### Landing Page Linktree
Leia: `linktree/README.md`

---

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript Vanilla
- Chart.js (gráficos)
- html2pdf (geração de PDF)
- SVG icons

### Backend
- Node.js + Express
- SQLite/PostgreSQL
- PDFKit
- Asaas API

### Deployment
- **Frontend:** Netlify
- **Backend:** Railway
- **Version Control:** GitHub

---

## 📱 Funcionalidades Principais

### Dashboard de Vouchers
✅ Venda de vouchers  
✅ Checkout com Asaas  
✅ QR Code generation  
✅ PDF download  
✅ Admin dashboard em tempo real  
✅ Validação de vouchers  
✅ Analytics (gráficos)  

### Landing Page Linktree
✅ Design moderno  
✅ 100% responsivo  
✅ Animações premium  
✅ Links centralizados  
✅ Redes sociais integradas  

---

## 🎯 Próximos Passos

1. **Para acessar o Admin:**
   - URL: https://rosamexicanovouchers.netlify.app/admin-login.html
   - User: admin
   - Pass: rosa2025

2. **Para ver documentação:**
   - Dashboard: `Rosa Mexicano Blumenau/dashboard-vouchers/README.md`
   - Linktree: `Rosa Mexicano Blumenau/linktree/README.md`

3. **Para fazer modificações:**
   - Frontend: Edite arquivos HTML/CSS em suas pastas
   - Backend: Edite `server-vouchers.js`
   - Commit e push para Netlify/Railway fazer deploy automático

---

## 📞 Contato

**Rosa Mexicano Blumenau**
- 📱 WhatsApp: (47) 99233-4348
- 📞 Telefone: (47) 3288-3096
- 🌐 Website: https://www.rosamexicano.com.br/blumenau

---

**Desenvolvido com ❤️ por Ferramentas Tecnologia**
