#!/bin/bash

# Script para Adicionar Membros em Grupos Existentes
# Assessoria Alpha
# Uso: ./adicionar-membro.sh "GROUP_ID" "5547999999999"

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

EVOLUTION_URL="http://localhost:8080"
INSTANCE_NAME="shieldcar"
API_KEY="shieldcar_evolution_2024_secure_key_12345"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  ADICIONAR MEMBRO AO GRUPO${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Verificar parâmetros
if [ -z "$1" ] || [ -z "$2" ]; then
    echo -e "${RED}Erro: Parâmetros faltando${NC}"
    echo ""
    echo "Uso: $0 GROUP_ID TELEFONE"
    echo ""
    echo "Exemplos:"
    echo "  $0 \"120363423504755655@g.us\" \"5547999999999\""
    echo "  $0 \"120363423504755655@g.us\" \"5547999999999,5547888888888\" (múltiplos)"
    echo ""
    exit 1
fi

GROUP_ID="$1"
TELEFONES="$2"

# Converter telefones em array JSON
if [[ $TELEFONES == *","* ]]; then
    # Múltiplos números
    IFS=',' read -ra NUMEROS <<< "$TELEFONES"
    PARTICIPANTES="["
    for num in "${NUMEROS[@]}"; do
        PARTICIPANTES+="\"$num\","
    done
    PARTICIPANTES="${PARTICIPANTES%,}]"
    QTDE=${#NUMEROS[@]}
else
    # Número único
    PARTICIPANTES="[\"$TELEFONES\"]"
    QTDE=1
fi

echo -e "${YELLOW}Grupo ID:${NC} $GROUP_ID"
echo -e "${YELLOW}Adicionando:${NC} $QTDE membro(s)"
echo ""

# Adicionar membros
RESPONSE=$(curl -s -X POST "$EVOLUTION_URL/group/updateParticipant/$INSTANCE_NAME" \
  -H "Content-Type: application/json" \
  -H "apikey: $API_KEY" \
  -d "{
    \"groupJid\": \"$GROUP_ID\",
    \"action\": \"add\",
    \"participants\": $PARTICIPANTES
  }")

# Verificar resposta
if echo "$RESPONSE" | grep -q "updateParticipants"; then
    echo -e "${GREEN}✅ Membro(s) adicionado(s) com sucesso!${NC}"
    echo ""
else
    echo -e "${RED}❌ Erro ao adicionar membro(s)${NC}"
    echo "$RESPONSE"
    exit 1
fi
