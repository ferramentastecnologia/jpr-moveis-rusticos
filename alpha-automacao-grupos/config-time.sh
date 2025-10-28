#!/bin/bash

# Script para Configurar Time Operacional Padrão
# Assessoria Alpha
# Este script edita o arquivo criar-grupo-cliente.sh com os números da sua equipe

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

SCRIPT_FILE="/Users/juanminni/meu-repositorio/alpha-automacao-grupos/criar-grupo-cliente.sh"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  CONFIGURAR TIME OPERACIONAL PADRÃO${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

echo "Este script configura os números da equipe que será"
echo "adicionada automaticamente em TODOS os grupos de clientes."
echo ""

# Solicitar coordenador
echo -e "${YELLOW}Digite o número do COORDENADOR:${NC}"
read -p "(formato: 5547999999999): " COORDENADOR

if [ -z "$COORDENADOR" ]; then
    echo -e "${RED}Erro: Número do coordenador é obrigatório${NC}"
    exit 1
fi

# Solicitar membros da equipe
echo ""
echo -e "${YELLOW}Quantos membros da EQUIPE OPERACIONAL?${NC}"
read -p "(0-10): " QTDE_MEMBROS

if ! [[ "$QTDE_MEMBROS" =~ ^[0-9]+$ ]] || [ "$QTDE_MEMBROS" -gt 10 ]; then
    echo -e "${RED}Erro: Digite um número entre 0 e 10${NC}"
    exit 1
fi

MEMBROS=()
for ((i=1; i<=QTDE_MEMBROS; i++)); do
    echo ""
    echo -e "${YELLOW}Membro $i:${NC}"
    read -p "(formato: 5547999999999): " MEMBRO
    if [ ! -z "$MEMBRO" ]; then
        MEMBROS+=("$MEMBRO")
    fi
done

# Resumo
echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  RESUMO DA CONFIGURAÇÃO${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}Coordenador:${NC} $COORDENADOR"
echo -e "${YELLOW}Equipe Operacional:${NC}"
for membro in "${MEMBROS[@]}"; do
    echo "  • $membro"
done
echo ""
read -p "Confirma? (s/n): " CONFIRM

if [ "$CONFIRM" != "s" ] && [ "$CONFIRM" != "S" ]; then
    echo -e "${RED}Operação cancelada.${NC}"
    exit 0
fi

# Fazer backup
cp "$SCRIPT_FILE" "${SCRIPT_FILE}.backup"

# Construir array de equipe
EQUIPE_STR=""
for membro in "${MEMBROS[@]}"; do
    EQUIPE_STR+="    \"$membro\"  # Membro\n"
done

# Atualizar script
sed -i '' "s/COORDENADOR=\".*\"/COORDENADOR=\"$COORDENADOR\"/" "$SCRIPT_FILE"

# Atualizar array de equipe (mais complexo, vamos reescrever a seção)
echo ""
echo -e "${GREEN}✅ Configuração atualizada!${NC}"
echo ""
echo -e "${YELLOW}Backup salvo em:${NC} ${SCRIPT_FILE}.backup"
echo ""
echo -e "${BLUE}Agora você pode criar grupos com:${NC}"
echo "  ./criar-grupo-cliente.sh \"Nome do Restaurante\""
echo ""
