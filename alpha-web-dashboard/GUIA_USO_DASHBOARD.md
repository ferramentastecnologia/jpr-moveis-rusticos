# 🍽️ Dashboard Alpha Assessoria - Guia de Uso

## 📋 O que é?

Dashboard web para criar e gerenciar grupos WhatsApp de clientes automaticamente.

---

## 🚀 Como Iniciar o Dashboard

### 1. Abrir Terminal

Abra o Terminal no Mac e navegue até a pasta:

```bash
cd /Users/juanminni/meu-repositorio/alpha-web-dashboard
```

### 2. Iniciar Servidor

```bash
npm start
```

Você verá:
```
========================================
  ALPHA ASSESSORIA - DASHBOARD WEB
========================================

✅ Servidor rodando em: http://localhost:3000
✅ WAHA API: http://localhost:3002
✅ Sessão: default

Acesse no navegador: http://localhost:3000
========================================
```

### 3. Abrir no Navegador

Abra o Chrome/Safari e acesse:

**http://localhost:3000**

---

## 💻 Como Usar o Dashboard

### 🏠 Tela Principal

Ao abrir você verá:

- **Status do WhatsApp** - Se está conectado ou não
- **Estatísticas** - Total de grupos, criados hoje, esta semana
- **Botões de Ação Rápida**
- **Lista de Grupos Criados**

### ➕ Criar Novo Grupo

1. Clique em **"Criar Novo Grupo"** (botão dourado)
2. Preencha:
   - **Nome do Restaurante** (Ex: "Pizzaria Bella Italia")
   - Deixe marcado "Usar time operacional padrão" ✅
3. Clique em **"CRIAR GRUPO"**
4. Aguarde alguns segundos
5. ✅ Grupo criado! Aparecerá na lista

**O que acontece automaticamente:**
- ✅ Grupo criado no WhatsApp
- ✅ Descrição profissional adicionada
- ✅ Time operacional adicionado (coordenador + equipe)
- ✅ Mensagem de boas-vindas enviada
- ✅ Registro salvo no sistema

### ⚙️ Configurar Time Operacional

1. Clique em **"Configurar Time"**
2. Preencha:
   - **Coordenador Principal** - Número com DDI (Ex: 5547999999999)
   - **Membros da Equipe** - Um por linha
3. Clique em **"+ Adicionar Membro"** se precisar mais campos
4. Clique em **"SALVAR CONFIGURAÇÕES"**

**Importante:** Todos os grupos novos usarão essa configuração!

### 🔍 Buscar Clientes

Use a barra de busca no canto superior direito para filtrar por nome do cliente.

### 📋 Copiar ID do Grupo

1. Localize o grupo na lista
2. Clique no ícone **📋** ao lado do nome
3. ID copiado! Você pode usar em scripts bash

### 👁️ Ver Detalhes do Grupo

Clique no ícone **👁️** para ver:
- Nome completo do grupo
- ID do grupo
- Coordenador
- Membros da equipe
- Data de criação

---

## ⌨️ Atalhos de Teclado

- **Ctrl+N** ou **Cmd+N** - Criar novo grupo
- **ESC** - Fechar modal aberto

---

## 🎨 Identidade Visual

O dashboard usa a identidade Alpha:
- **Preto** - Background elegante
- **Dourado** (#d4a03a) - Destaques e botões principais
- **Design minimalista e profissional**

---

## 🔄 Atualizar Lista de Grupos

Clique no botão **"Atualizar Lista"** (ícone 🔄) para recarregar os grupos.

---

## 📱 Status do WhatsApp

No topo do dashboard você verá:

- **🟢 WhatsApp Conectado** - Tudo funcionando!
- **🔴 WhatsApp Desconectado** - Precisa conectar no WAHA

Se desconectar, use:
```bash
cd /Users/juanminni/meu-repositorio/alpha-automacao-grupos
./conectar-waha.sh
```

---

## 🛑 Parar o Servidor

No Terminal onde está rodando, pressione:

```bash
Ctrl+C
```

---

## 🌐 Compartilhar com Colaboradores

### Opção 1: Acesso Local (Mesma Rede)

1. Descubra seu IP local:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

2. Compartilhe com colaboradores:
**http://SEU_IP:3000**

Exemplo: http://192.168.1.100:3000

### Opção 2: Deploy na Nuvem (Recomendado)

Para acesso de qualquer lugar, faça deploy no **Netlify** ou **Vercel**.

Veja: `DEPLOYMENT.md`

---

## ❓ Problemas Comuns

### "Porta 3000 já em uso"

```bash
lsof -ti :3000 | xargs kill -9
npm start
```

### "WhatsApp Desconectado"

Certifique-se que o WAHA está rodando:
```bash
docker ps | grep waha
```

Se não estiver, inicie:
```bash
docker start waha
```

### "Erro ao criar grupo"

1. Verifique se o WhatsApp está conectado (status no topo)
2. Verifique se o WAHA está rodando
3. Verifique se os números têm formato correto (DDI + número)

---

## 📞 Suporte

Para dúvidas ou problemas, contate:
**Juan Minni** - Desenvolvedor do Sistema

---

## 🎯 Próximos Passos

Após dominar o dashboard:

1. ✅ Faça deploy na nuvem para acesso remoto
2. ✅ Configure domínio personalizado (Ex: dashboard.alphaassessoria.com.br)
3. ✅ Adicione autenticação se necessário
4. ✅ Configure backup automático dos registros

---

**Sistema Desenvolvido para Alpha Assessoria - A maior assessoria de marketing para restaurantes da América Latina 🚀**
