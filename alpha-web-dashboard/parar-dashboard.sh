#!/bin/bash

# Script para Parar Dashboard Alpha
# Uso: ./parar-dashboard.sh

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  PARANDO DASHBOARD ALPHA${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Parar servidor Node.js na porta 3000
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${BLUE}[1/2]${NC} Parando servidor Node.js..."
    lsof -ti :3000 | xargs kill -9 2>/dev/null
    echo -e "${GREEN}✓ Servidor parado!${NC}"
else
    echo -e "${BLUE}[1/2]${NC} Servidor já estava parado"
fi

echo ""

# Parar localtunnel
echo -e "${BLUE}[2/2]${NC} Fechando túnel público..."
pkill -f "lt --port 3000" 2>/dev/null && echo -e "${GREEN}✓ Túnel fechado!${NC}" || echo -e "${BLUE}Túnel já estava fechado${NC}"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  ✅ DASHBOARD PARADO${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Para iniciar novamente:${NC}"
echo "  ./iniciar-dashboard-publico.sh"
echo ""
