#!/bin/bash

# Script para criar nova proposta comercial baseada no template
# Uso: ./criar-proposta.sh nome-cliente

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
GOLD='\033[38;5;220m'
NC='\033[0m' # No Color

echo -e "${GOLD}"
echo "╔══════════════════════════════════════════════╗"
echo "║  🍕 ALPHA ASSESSORIA - CRIAR PROPOSTA       ║"
echo "╚══════════════════════════════════════════════╝"
echo -e "${NC}"

# Verificar se foi passado o nome do cliente
if [ -z "$1" ]; then
    echo -e "${RED}❌ Erro: Nome do cliente não fornecido${NC}"
    echo ""
    echo "Uso: ./criar-proposta.sh nome-cliente"
    echo "Exemplo: ./criar-proposta.sh stasi-pizzaria"
    exit 1
fi

CLIENTE_SLUG=$1
TEMPLATE_PATH="templates/landing-pages/template-proposta-comercial.html"
OUTPUT_PATH="public/proposta-${CLIENTE_SLUG}.html"

# Verificar se o template existe
if [ ! -f "$TEMPLATE_PATH" ]; then
    echo -e "${RED}❌ Erro: Template não encontrado em $TEMPLATE_PATH${NC}"
    exit 1
fi

# Verificar se já existe uma proposta para este cliente
if [ -f "$OUTPUT_PATH" ]; then
    echo -e "${YELLOW}⚠️  Aviso: Já existe uma proposta para este cliente${NC}"
    read -p "Deseja sobrescrever? (s/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        echo -e "${RED}Operação cancelada${NC}"
        exit 1
    fi
fi

# Copiar template
echo -e "${YELLOW}📄 Copiando template...${NC}"
cp "$TEMPLATE_PATH" "$OUTPUT_PATH"

echo -e "${GREEN}✅ Proposta criada: ${OUTPUT_PATH}${NC}"
echo ""
echo -e "${GOLD}═══════════════════════════════════════════════${NC}"
echo -e "${GREEN}Próximos passos:${NC}"
echo ""
echo "1. Abrir o arquivo em seu editor:"
echo -e "   ${YELLOW}code $OUTPUT_PATH${NC}"
echo ""
echo "2. Substituir as variáveis do cliente"
echo "   (use Ctrl+F ou Cmd+F para buscar e substituir)"
echo ""
echo "3. Fazer commit e deploy:"
echo -e "   ${YELLOW}git add $OUTPUT_PATH${NC}"
echo -e "   ${YELLOW}git commit -m \"Add proposta para $CLIENTE_SLUG\"${NC}"
echo -e "   ${YELLOW}netlify deploy --prod --dir=public${NC}"
echo ""
echo "4. Link final será:"
echo -e "   ${GREEN}https://alpha-assessoria-dashboard.netlify.app/proposta-${CLIENTE_SLUG}.html${NC}"
echo ""
echo -e "${GOLD}═══════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}📋 Checklist de Variáveis:${NC}"
echo "  □ Nome do cliente"
echo "  □ Responsável"
echo "  □ Localização (cidade e estado)"
echo "  □ Faturamento atual"
echo "  □ Categoria do negócio"
echo "  □ Valores (gestão + tráfego)"
echo "  □ Nome do plano"
echo "  □ Benefícios personalizados"
echo "  □ Data no footer"
echo ""
echo -e "${GREEN}✨ Boa sorte com o fechamento! 🚀${NC}"
