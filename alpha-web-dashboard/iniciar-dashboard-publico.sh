#!/bin/bash

# Script para Iniciar Dashboard Alpha com Acesso Público
# Uso: ./iniciar-dashboard-publico.sh

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  DASHBOARD ALPHA - ACESSO PÚBLICO${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Verificar se servidor já está rodando
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}Servidor já está rodando na porta 3000${NC}"
else
    echo -e "${BLUE}[1/2]${NC} Iniciando servidor Node.js..."
    cd /Users/juanminni/meu-repositorio/alpha-web-dashboard
    npm start > /tmp/alpha-dashboard.log 2>&1 &
    sleep 3
    echo -e "${GREEN}✓ Servidor iniciado!${NC}"
fi

echo ""
echo -e "${BLUE}[2/2]${NC} Criando túnel público..."

# Criar túnel com localtunnel
lt --port 3000 --subdomain alpha-dashboard-2024 > /tmp/alpha-tunnel.log 2>&1 &

sleep 3

echo -e "${GREEN}✓ Túnel criado!${NC}"
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  ✅ DASHBOARD ONLINE E PÚBLICO!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}📋 Link para compartilhar com colaboradores:${NC}"
echo ""
echo -e "  ${GREEN}https://alpha-dashboard-2024.loca.lt${NC}"
echo ""
echo -e "${YELLOW}📱 Funciona em:${NC}"
echo "  • Computador (qualquer navegador)"
echo "  • Celular (iOS/Android)"
echo "  • Tablet"
echo "  • Qualquer lugar com internet"
echo ""
echo -e "${BLUE}ℹ️  Primeira vez acessando?${NC}"
echo "  1. Clique em 'Click to Continue'"
echo "  2. Digite: alpha-dashboard-2024"
echo "  3. Clique em 'Submit'"
echo ""
echo -e "${YELLOW}Para parar o dashboard:${NC}"
echo "  ./parar-dashboard.sh"
echo ""
echo -e "${GREEN}========================================${NC}"
echo ""
