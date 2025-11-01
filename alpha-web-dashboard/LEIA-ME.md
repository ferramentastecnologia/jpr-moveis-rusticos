# 🍽️ Dashboard Alpha Assessoria - Sistema de Grupos WhatsApp

## 🚀 Início Rápido

### Para você (administrador):

```bash
cd /Users/juanminni/meu-repositorio/alpha-web-dashboard
./iniciar-dashboard-publico.sh
```

### Para seus colaboradores:

Envie este link:
**https://alpha-dashboard-2024.loca.lt**

---

## 📚 Documentação Completa

- **[GUIA_USO_DASHBOARD.md](GUIA_USO_DASHBOARD.md)** - Como usar o dashboard (você)
- **[ACESSO_COLABORADORES.md](ACESSO_COLABORADORES.md)** - Instruções para colaboradores

---

## ⚡ Comandos Rápidos

### Iniciar Dashboard Público
```bash
./iniciar-dashboard-publico.sh
```

### Parar Dashboard
```bash
./parar-dashboard.sh
```

### Iniciar Apenas Localmente (sem acesso público)
```bash
npm start
# Acesse: http://localhost:3000
```

---

## 🌐 Status Atual

**✅ DASHBOARD ONLINE!**

- **Local:** http://localhost:3000
- **Público:** https://alpha-dashboard-2024.loca.lt
- **WhatsApp:** 🟢 Conectado
- **Time Configurado:** 5 membros (1 coordenador + 4 equipe)

---

## 📋 O que o Dashboard faz?

1. ✅ Criar grupos WhatsApp automaticamente
2. ✅ Adicionar time operacional ao grupo
3. ✅ Enviar mensagem de boas-vindas
4. ✅ Configurar descrição profissional
5. ✅ Registrar todas as criações
6. ✅ Estatísticas em tempo real

---

## 🛠️ Arquitetura

```
Dashboard Web (Frontend)
    ↓
Backend Node.js (Express)
    ↓
WAHA API (WhatsApp)
    ↓
WhatsApp Web
```

---

## 📂 Estrutura de Arquivos

```
alpha-web-dashboard/
├── public/                    # Frontend
│   ├── index.html            # Interface principal
│   ├── app.js                # Lógica do dashboard
│   ├── styles.css            # Estilos (preto/dourado)
│   └── env-config.js         # Configuração
├── src/
│   └── server.js             # Backend API
├── grupos-criados/           # Registros dos grupos
├── iniciar-dashboard-publico.sh
├── parar-dashboard.sh
└── .env                      # Configurações
```

---

## ⚙️ Configurações

Arquivo: `.env`

```bash
PORT=3000
WAHA_API_URL=http://localhost:3002
WAHA_SESSION=default
WAHA_API_KEY=alpha_waha_2024_secure_key_67890_abcdef
COORDENADOR_PADRAO=5547992752697
EQUIPE_PADRAO=5547992212108,5547989168700,5547997904311,5547988000378
```

---

## 🔧 Requisitos

- ✅ Node.js instalado
- ✅ WAHA API rodando (porta 3002)
- ✅ WhatsApp conectado no WAHA
- ✅ Internet para túnel público

---

## 💡 Dicas

### Dashboard não abre?
```bash
# Verifique se porta está livre
lsof -ti :3000 | xargs kill -9
# Reinicie
./iniciar-dashboard-publico.sh
```

### WhatsApp desconectou?
```bash
cd /Users/juanminni/meu-repositorio/alpha-automacao-grupos
./conectar-waha.sh
```

### Link público não funciona?
O túnel localtunnel só funciona enquanto seu Mac estiver:
- ✅ Ligado
- ✅ Conectado à internet
- ✅ Com o dashboard rodando

---

## 🎨 Identidade Visual

- **Preto** (#0C0C0C) - Background
- **Dourado** (#d4a03a) - Destaques
- **Minimalista e profissional**

---

## 📞 Suporte

**Desenvolvedor:** Juan Minni
**Sistema:** Dashboard Alpha Assessoria
**Versão:** 1.0.0

---

## 🚀 Próximos Passos (Opcional)

Se quiser deploy permanente (24/7 sem depender do seu Mac):

1. **Render.com** - Deploy gratuito permanente
2. **Railway** - Alternativa ao Render
3. **Domínio próprio** - Ex: dashboard.alphaassessoria.com.br

Entre em contato para configurar!

---

**Sistema desenvolvido para facilitar a criação de grupos WhatsApp para clientes da Alpha Assessoria** 🍽️
