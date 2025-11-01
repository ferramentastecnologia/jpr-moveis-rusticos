#!/bin/bash

# Script de Criação Automática de Grupos WhatsApp para Clientes
# Assessoria Alpha - Marketing para Restaurantes
# Uso: ./criar-grupo-cliente.sh "Nome do Restaurante"

set -e

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configurações WAHA API
WAHA_URL="http://localhost:3002"
SESSION_NAME="default"  # WAHA Core usa sessão 'default'
API_KEY="alpha_waha_2024_secure_key_67890_abcdef"

# Time Operacional Padrão Alpha Assessoria
# IMPORTANTE: Edite esses números com os membros reais da sua equipe
COORDENADOR="5547992752697"  # Coordenador principal
EQUIPE=(
    "5547992212108"  # Membro 1
    # "55479XXXXXXXX"  # Membro 2 - Adicione mais conforme necessário
    # "55479XXXXXXXX"  # Membro 3
    # "55479XXXXXXXX"  # Membro 4
)

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  ALPHA ASSESSORIA - CRIAR GRUPO CLIENTE${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Verificar se nome do cliente foi fornecido
if [ -z "$1" ]; then
    echo -e "${RED}Erro: Nome do cliente não fornecido${NC}"
    echo ""
    echo "Uso: $0 \"Nome do Restaurante\""
    echo ""
    echo "Exemplos:"
    echo "  $0 \"Pizzaria Bella Italia\""
    echo "  $0 \"Burger King - Shopping Iguatemi\""
    echo ""
    exit 1
fi

CLIENTE_NOME="$1"
GRUPO_NOME="🍽️ Alpha | $CLIENTE_NOME"

echo -e "${YELLOW}Cliente:${NC} $CLIENTE_NOME"
echo -e "${YELLOW}Grupo WhatsApp:${NC} $GRUPO_NOME"
echo -e "${YELLOW}Coordenador:${NC} $COORDENADOR"
echo -e "${YELLOW}Membros da Equipe:${NC} ${#EQUIPE[@]}"
echo ""

read -p "Confirma criação do grupo? (s/n): " CONFIRM

if [ "$CONFIRM" != "s" ] && [ "$CONFIRM" != "S" ]; then
    echo -e "${RED}Operação cancelada.${NC}"
    exit 0
fi

echo ""
echo -e "${BLUE}[1/4]${NC} Criando grupo WhatsApp..."

# Criar array de participantes (coordenador + equipe) no formato WAHA
PARTICIPANTES="[{\"id\":\"${COORDENADOR}@c.us\"}"
for membro in "${EQUIPE[@]}"; do
    PARTICIPANTES+=",{\"id\":\"${membro}@c.us\"}"
done
PARTICIPANTES+="]"

# Criar grupo
CREATE_RESPONSE=$(curl -s -X POST "$WAHA_URL/api/$SESSION_NAME/groups" \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: $API_KEY" \
  -d "{
    \"name\": \"$GRUPO_NOME\",
    \"participants\": $PARTICIPANTES
  }")

# Extrair ID do grupo
GROUP_ID=$(echo "$CREATE_RESPONSE" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

if [ -z "$GROUP_ID" ]; then
    echo -e "${RED}Erro ao criar grupo!${NC}"
    echo "$CREATE_RESPONSE"
    exit 1
fi

echo -e "${GREEN}✓ Grupo criado!${NC} ID: $GROUP_ID"

echo ""
echo -e "${BLUE}[2/4]${NC} Configurando descrição do grupo..."

# Descrição do grupo
DESCRICAO="🎯 GRUPO OPERACIONAL - $CLIENTE_NOME

📋 Propósito:
• Comunicação direta com o cliente
• Alinhamento de estratégias
• Acompanhamento de resultados
• Suporte técnico

👥 Equipe Alpha Assessoria
🚀 Maior assessoria de marketing para restaurantes da América Latina

⚠️ Este é um grupo profissional. Mantenha foco nas atividades do cliente."

curl -s -X PUT "$WAHA_URL/api/$SESSION_NAME/groups/$GROUP_ID" \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: $API_KEY" \
  -d "{
    \"description\": \"$DESCRICAO\"
  }" > /dev/null

echo -e "${GREEN}✓ Descrição configurada!${NC}"

echo ""
echo -e "${BLUE}[3/4]${NC} Enviando mensagem de boas-vindas..."

# Mensagem de boas-vindas
MENSAGEM_BOAS_VINDAS="🎉 *Bem-vindo(a) à Assessoria Alpha!*

Olá time do *$CLIENTE_NOME*!

Este é o grupo oficial de comunicação entre sua equipe e a *Alpha Assessoria*, a maior assessoria de marketing para restaurantes da América Latina! 🚀

👥 *Equipe Alpha dedicada ao seu projeto:*
Coordenador e time operacional já estão no grupo.

📊 *O que faremos aqui:*
✅ Alinhamento de estratégias de marketing
✅ Aprovação de campanhas e criativos
✅ Acompanhamento de métricas e resultados
✅ Suporte rápido e eficiente

💬 *Horário de atendimento:*
Segunda a Sexta: 9h às 18h
Respostas urgentes em até 2 horas

Vamos juntos aumentar o faturamento do seu restaurante através do marketing digital! 💪🍽️

_Mensagem automática - Sistema Alpha_"

curl -s -X POST "$WAHA_URL/api/$SESSION_NAME/messages/text" \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: $API_KEY" \
  -d "{
    \"chatId\": \"$GROUP_ID\",
    \"text\": \"$MENSAGEM_BOAS_VINDAS\"
  }" > /dev/null

echo -e "${GREEN}✓ Mensagem enviada!${NC}"

echo ""
echo -e "${BLUE}[4/4]${NC} Salvando informações do grupo..."

# Criar arquivo de registro
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_DIR="/Users/juanminni/meu-repositorio/alpha-automacao-grupos/grupos-criados"
mkdir -p "$LOG_DIR"

LOG_FILE="$LOG_DIR/${TIMESTAMP}_${CLIENTE_NOME//[^a-zA-Z0-9]/_}.json"

cat > "$LOG_FILE" <<EOF
{
  "cliente": "$CLIENTE_NOME",
  "grupoNome": "$GRUPO_NOME",
  "grupoId": "$GROUP_ID",
  "coordenador": "$COORDENADOR",
  "equipe": [
$(printf '    "%s",\n' "${EQUIPE[@]}" | sed '$ s/,$//')
  ],
  "criadoEm": "$TIMESTAMP",
  "criadoPor": "$(whoami)"
}
EOF

echo -e "${GREEN}✓ Informações salvas em: $LOG_FILE${NC}"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  ✅ GRUPO CRIADO COM SUCESSO!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}📋 Resumo:${NC}"
echo -e "  Cliente: $CLIENTE_NOME"
echo -e "  Grupo: $GRUPO_NOME"
echo -e "  ID: $GROUP_ID"
echo -e "  Membros: $((${#EQUIPE[@]} + 1)) (1 coordenador + ${#EQUIPE[@]} equipe)"
echo ""
echo -e "${BLUE}Próximos passos:${NC}"
echo "  1. Verifique o grupo no WhatsApp"
echo "  2. Adicione foto do cliente (opcional)"
echo "  3. Fixe mensagens importantes"
echo ""
echo -e "${YELLOW}Para adicionar mais membros:${NC}"
echo "  ./adicionar-membro.sh \"$GROUP_ID\" \"5547999999999\""
echo ""
