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

WAHA_URL="http://localhost:3002"
SESSION_NAME="default"
API_KEY="alpha_waha_2024_secure_key_67890_abcdef"

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

# Converter telefones em array JSON no formato WAHA
if [[ $TELEFONES == *","* ]]; then
    # Múltiplos números
    IFS=',' read -ra NUMEROS <<< "$TELEFONES"
    PARTICIPANTES="["
    for num in "${NUMEROS[@]}"; do
        PARTICIPANTES+="{\"id\":\"${num}@c.us\"},"
    done
    PARTICIPANTES="${PARTICIPANTES%,}]"
    QTDE=${#NUMEROS[@]}
else
    # Número único
    PARTICIPANTES="[{\"id\":\"${TELEFONES}@c.us\"}]"
    QTDE=1
fi

echo -e "${YELLOW}Grupo ID:${NC} $GROUP_ID"
echo -e "${YELLOW}Adicionando:${NC} $QTDE membro(s)"
echo ""

# Adicionar membros
RESPONSE=$(curl -s -X POST "$WAHA_URL/api/$SESSION_NAME/groups/$GROUP_ID/participants/add" \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: $API_KEY" \
  -d "{
    \"participants\": $PARTICIPANTES
  }")

# Verificar resposta
if echo "$RESPONSE" | grep -q -E "\"status\":|\"participants\":|success"; then
    echo -e "${GREEN}✅ Membro(s) adicionado(s) com sucesso!${NC}"
    echo ""
else
    echo -e "${RED}❌ Erro ao adicionar membro(s)${NC}"
    echo "$RESPONSE"
    exit 1
fi
