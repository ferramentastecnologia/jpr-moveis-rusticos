#!/bin/bash

# Script de Setup para Novo Cliente
# Automatiza a criação de toda infraestrutura de leads WhatsApp

set -e  # Para na primeira falha

echo "==================================="
echo "Setup Automação Leads WhatsApp"
echo "==================================="
echo ""

# Solicitar informações do cliente
read -p "Nome da instância (ex: minhaempresa): " INSTANCE_NAME
read -p "Número WhatsApp administrador (ex: 5547999999999): " ADMIN_NUMBER
read -p "Nome do grupo WhatsApp: " GROUP_NAME
read -p "API Key Evolution (deixe vazio para gerar): " API_KEY

# Gerar API Key se não fornecida
if [ -z "$API_KEY" ]; then
    API_KEY="${INSTANCE_NAME}_$(date +%s)_$(openssl rand -hex 4)"
    echo "API Key gerada: $API_KEY"
fi

EVOLUTION_URL="http://localhost:8080"

echo ""
echo "Configurações:"
echo "- Instância: $INSTANCE_NAME"
echo "- Admin: $ADMIN_NUMBER"
echo "- Grupo: $GROUP_NAME"
echo "- API Key: $API_KEY"
echo ""
read -p "Confirma? (s/n): " CONFIRM

if [ "$CONFIRM" != "s" ]; then
    echo "Setup cancelado."
    exit 1
fi

echo ""
echo "1/6 Criando instância Evolution API..."
CREATE_RESPONSE=$(curl -s -X POST "$EVOLUTION_URL/instance/create" \
  -H "Content-Type: application/json" \
  -H "apikey: shieldcar_evolution_2024_secure_key_12345" \
  -d "{
    \"instanceName\": \"$INSTANCE_NAME\",
    \"token\": \"$API_KEY\",
    \"qrcode\": true
  }")

echo "Instância criada!"

echo ""
echo "2/6 Gerando QR Code..."
QR_RESPONSE=$(curl -s -X GET "$EVOLUTION_URL/instance/connect/$INSTANCE_NAME" \
  -H "apikey: $API_KEY")

echo "$QR_RESPONSE" | grep -o 'https://[^"]*' || echo "Verifique o QR Code no terminal"

echo ""
echo "Escaneie o QR Code com WhatsApp"
read -p "Pressione ENTER após conectar..."

echo ""
echo "3/6 Verificando conexão..."
sleep 3
STATUS_RESPONSE=$(curl -s -X GET "$EVOLUTION_URL/instance/connectionState/$INSTANCE_NAME" \
  -H "apikey: $API_KEY")

echo "Status: $STATUS_RESPONSE"

echo ""
echo "4/6 Criando grupo WhatsApp..."
GROUP_RESPONSE=$(curl -s -X POST "$EVOLUTION_URL/group/create/$INSTANCE_NAME" \
  -H "Content-Type: application/json" \
  -H "apikey: $API_KEY" \
  -d "{
    \"subject\": \"$GROUP_NAME\",
    \"participants\": [\"$ADMIN_NUMBER\"]
  }")

GROUP_ID=$(echo "$GROUP_RESPONSE" | grep -o '"id":"[^"]*' | cut -d'"' -f4)
echo "Grupo criado! ID: $GROUP_ID"

echo ""
echo "5/6 Configurando descrição do grupo..."
curl -s -X POST "$EVOLUTION_URL/group/updateGroupDescription/$INSTANCE_NAME" \
  -H "Content-Type: application/json" \
  -H "apikey: $API_KEY" \
  -d "{
    \"groupJid\": \"$GROUP_ID\",
    \"description\": \"🎯 Central de Leads\n\n📋 Receba automaticamente novos cadastros da landing page.\n\n💼 Gestão profissional de leads\"
  }" > /dev/null

echo "Descrição configurada!"

echo ""
echo "6/6 Salvando configurações..."
CONFIG_FILE="config-$INSTANCE_NAME.json"
cat > "$CONFIG_FILE" <<EOF
{
  "instance": "$INSTANCE_NAME",
  "apiKey": "$API_KEY",
  "groupId": "$GROUP_ID",
  "groupName": "$GROUP_NAME",
  "adminNumber": "$ADMIN_NUMBER",
  "webhookUrl": "https://SEU-TUNNEL.loca.lt/webhook/hubspot-lead",
  "createdAt": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF

echo "Configurações salvas em: $CONFIG_FILE"

echo ""
echo "==================================="
echo "✅ Setup Concluído!"
echo "==================================="
echo ""
echo "Próximos passos:"
echo "1. Adicione a foto do grupo (400x400px)"
echo "2. Configure o workflow no n8n com Group ID: $GROUP_ID"
echo "3. Atualize o webhook na landing page"
echo "4. Teste o sistema"
echo ""
echo "Configurações salvas em: $CONFIG_FILE"
