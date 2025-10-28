#!/bin/bash

# Script para Listar Todos os Grupos de Clientes
# Assessoria Alpha

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

LOG_DIR="/Users/juanminni/meu-repositorio/alpha-automacao-grupos/grupos-criados"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  GRUPOS DE CLIENTES - ALPHA ASSESSORIA${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

if [ ! -d "$LOG_DIR" ] || [ -z "$(ls -A $LOG_DIR 2>/dev/null)" ]; then
    echo -e "${YELLOW}Nenhum grupo criado ainda.${NC}"
    echo ""
    echo "Para criar um grupo:"
    echo "  ./criar-grupo-cliente.sh \"Nome do Restaurante\""
    echo ""
    exit 0
fi

TOTAL=$(ls -1 "$LOG_DIR"/*.json 2>/dev/null | wc -l | tr -d ' ')
echo -e "${GREEN}Total de grupos criados: $TOTAL${NC}"
echo ""

CONTADOR=1
for arquivo in "$LOG_DIR"/*.json; do
    if [ -f "$arquivo" ]; then
        CLIENTE=$(grep '"cliente"' "$arquivo" | cut -d'"' -f4)
        GRUPO_ID=$(grep '"grupoId"' "$arquivo" | cut -d'"' -f4)
        DATA=$(grep '"criadoEm"' "$arquivo" | cut -d'"' -f4)

        echo -e "${YELLOW}[$CONTADOR]${NC} $CLIENTE"
        echo -e "    ID: ${BLUE}$GRUPO_ID${NC}"
        echo -e "    Criado: $DATA"
        echo ""

        ((CONTADOR++))
    fi
done

echo -e "${BLUE}Para adicionar membro a um grupo:${NC}"
echo "  ./adicionar-membro.sh \"GROUP_ID\" \"5547999999999\""
echo ""
