# Guia de Replicação - Automação WhatsApp Leads

Este guia ensina como replicar este sistema de automação para novos clientes.

## Pré-requisitos

- Node.js instalado
- Evolution API configurada e rodando
- n8n instalado
- Conta Netlify (ou outro hosting)
- Localtunnel instalado (`npm install -g localtunnel`)

## Passo 1: Preparar Landing Page

1. Copie o template da landing page
2. Customize com a identidade visual do cliente:
   - Cores (variável CSS `--primary-color`)
   - Logo
   - Textos e benefícios
   - Meta Pixel ID (se houver)

3. Configure o webhook no código:
```javascript
const webhookUrl = 'https://SEU-TUNNEL.loca.lt/webhook/hubspot-lead';
```

4. Deploy no Netlify:
```bash
netlify deploy --prod --dir=public
```

## Passo 2: Configurar Evolution API

### 2.1 Criar Nova Instância

```bash
curl -X POST http://localhost:8080/instance/create \
  -H "Content-Type: application/json" \
  -H "apikey: SUA_API_KEY_GLOBAL" \
  -d '{
    "instanceName": "nome-cliente",
    "token": "token_seguro_cliente_12345",
    "qrcode": true
  }'
```

### 2.2 Conectar WhatsApp

```bash
# Gerar QR Code
curl -X GET http://localhost:8080/instance/connect/nome-cliente \
  -H "apikey: token_seguro_cliente_12345"

# Escanear QR Code com WhatsApp
# Aguardar conexão (status: "open")
```

### 2.3 Criar Grupo WhatsApp

```bash
curl -X POST http://localhost:8080/group/create/nome-cliente \
  -H "Content-Type: application/json" \
  -H "apikey: token_seguro_cliente_12345" \
  -d '{
    "subject": "🎯 Nome do Grupo",
    "participants": ["5547999999999"]
  }'
```

**Salve o ID do grupo retornado** (formato: 120363XXXXXXXXX@g.us)

### 2.4 Configurar Grupo

```bash
# Descrição
curl -X POST http://localhost:8080/group/updateGroupDescription/nome-cliente \
  -H "Content-Type: application/json" \
  -H "apikey: token_seguro_cliente_12345" \
  -d '{
    "groupJid": "ID_DO_GRUPO@g.us",
    "description": "Descrição profissional do grupo"
  }'

# Foto do Grupo (logo 400x400px)
curl -X POST http://localhost:8080/group/updateGroupPicture/nome-cliente \
  -H "Content-Type: application/json" \
  -H "apikey: token_seguro_cliente_12345" \
  -d '{
    "groupJid": "ID_DO_GRUPO@g.us",
    "image": "'$(base64 -i /caminho/logo-grupo.png)'"
  }'

# Adicionar Membros do Time
curl -X POST http://localhost:8080/group/updateParticipant/nome-cliente \
  -H "Content-Type: application/json" \
  -H "apikey: token_seguro_cliente_12345" \
  -d '{
    "groupJid": "ID_DO_GRUPO@g.us",
    "action": "add",
    "participants": ["5547999999999", "5547888888888"]
  }'
```

## Passo 3: Configurar n8n

### 3.1 Criar Workflow

1. Abra n8n: http://localhost:5678
2. Crie novo workflow
3. Adicione os seguintes nodes:

**Node 1: Webhook**
- Método: POST
- Caminho: /webhook/hubspot-lead
- Authentication: None

**Node 2: Function (Formatar Dados)**
```javascript
const data = $input.item.json.body;

return {
  json: {
    nome: data.nome,
    telefone: data.telefone,
    email: data.email,
    // Adicione outros campos conforme necessário
  }
};
```

**Node 3: HTTP Request (Enviar para WhatsApp)**
- Método: POST
- URL: http://localhost:8080/message/sendText/nome-cliente
- Headers:
  - Content-Type: application/json
  - apikey: token_seguro_cliente_12345
- Body:
```json
{
  "number": "ID_DO_GRUPO",
  "text": "🎯 Novo Lead!\n\n👤 Nome: {{$json.nome}}\n📱 Telefone: {{$json.telefone}}\n📧 Email: {{$json.email}}"
}
```

4. Ative o workflow
5. Salve e copie o **Workflow ID**

### 3.2 Atualizar Workflow via SQL (Alternativa)

Se precisar atualizar o workflow direto no banco:

```bash
# Backup primeiro!
cp ~/.n8n/database.sqlite ~/.n8n/database.sqlite.backup

# Atualizar grupo/número
sqlite3 ~/.n8n/database.sqlite "UPDATE workflow_entity SET nodes = REPLACE(nodes, 'NUMERO_ANTIGO', 'NUMERO_NOVO') WHERE id='WORKFLOW_ID'"
```

## Passo 4: Configurar Localtunnel

```bash
# Iniciar tunnel
lt --port 5678

# Copie a URL gerada (ex: https://xyz-abc-def.loca.lt)
# Atualize no código da landing page
```

## Passo 5: Iniciar Serviços

```bash
# Terminal 1: Evolution API
cd evolution-api
npm start

# Terminal 2: n8n
n8n start

# Terminal 3: Localtunnel
lt --port 5678
```

## Passo 6: Testar Sistema

1. Acesse a landing page
2. Preencha o formulário com dados de teste
3. Verifique se a notificação chegou no grupo WhatsApp
4. Confirme que todos os dados estão corretos

## Dicas de Customização

### Mensagem do WhatsApp

Personalize o template no node HTTP Request do n8n:

```
🎯 Novo Lead Capturado!

👤 Nome: {{$json.nome}}
📱 Telefone: {{$json.telefone}}
📧 Email: {{$json.email}}
🚗 Veículo: {{$json.veiculo}}
💰 Valor FIPE: {{$json.valorFipe}}

⏰ Data/Hora: {{$now}}
```

### Logo do Grupo

Para criar logo quadrado com fundo branco:

```bash
# Redimensionar mantendo proporção
sips -z 120 320 logo-original.png --out logo-small.png

# Adicionar padding branco
sips -c 400 400 logo-small.png --padColor FFFFFF --out logo-grupo.png
```

## Troubleshooting

### Webhook não recebe dados
- Verifique se Localtunnel está rodando
- Teste o webhook diretamente: `curl -X POST https://seu-tunnel.loca.lt/webhook/hubspot-lead -d '{"teste":"ok"}'`
- Verifique logs do n8n

### WhatsApp desconecta
- Gere novo QR Code
- Reconecte pelo celular
- Verifique status: `curl http://localhost:8080/instance/connectionState/nome-cliente -H "apikey: TOKEN"`

### Mensagens não chegam no grupo
- Confirme o ID do grupo está correto
- Verifique se o número tem @ g.us no final (grupos)
- Teste enviando mensagem manual via API

## Checklist Final

- [ ] Landing page customizada e deployada
- [ ] Evolution API rodando
- [ ] WhatsApp conectado (status: open)
- [ ] Grupo criado e configurado
- [ ] Membros adicionados ao grupo
- [ ] n8n workflow criado e ativo
- [ ] Localtunnel rodando
- [ ] Webhook URL atualizada na landing page
- [ ] Teste completo realizado
- [ ] Documentação entregue ao cliente

## Manutenção

### Diário
- Verificar se serviços estão rodando
- Monitorar logs de erros

### Semanal
- Backup do banco n8n
- Verificar taxa de entrega das mensagens

### Mensal
- Atualizar Evolution API
- Revisar e otimizar workflows

## Suporte

Para problemas técnicos:
- Evolution API: https://doc.evolution-api.com
- n8n: https://docs.n8n.io
- Localtunnel: https://theboroer.github.io/localtunnel-www/
