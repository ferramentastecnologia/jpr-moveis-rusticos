#!/bin/bash

# Script para exportar proposta HTML em PDF
# Uso: ./exportar-pdf.sh nome-do-arquivo.html

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
GOLD='\033[38;5;220m'
NC='\033[0m' # No Color

echo -e "${GOLD}"
echo "╔══════════════════════════════════════════════╗"
echo "║  📄 ALPHA ASSESSORIA - EXPORTAR PDF         ║"
echo "╚══════════════════════════════════════════════╝"
echo -e "${NC}"

# Verificar se foi passado o nome do arquivo
if [ -z "$1" ]; then
    echo -e "${RED}❌ Erro: Nome do arquivo não fornecido${NC}"
    echo ""
    echo "Uso: ./exportar-pdf.sh proposta-cliente.html"
    echo "Exemplo: ./exportar-pdf.sh proposta-stasi.html"
    exit 1
fi

HTML_FILE="$1"
HTML_PATH="../../public/${HTML_FILE}"

# Verificar se o arquivo HTML existe
if [ ! -f "$HTML_PATH" ]; then
    echo -e "${RED}❌ Erro: Arquivo HTML não encontrado: $HTML_PATH${NC}"
    exit 1
fi

# Gerar nome do PDF
PDF_NAME="${HTML_FILE%.html}"
PDF_NAME="$(echo $PDF_NAME | sed 's/proposta-/Proposta_/g' | sed 's/-/_/g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2));}1').pdf"
PDF_PATH="../../public/${PDF_NAME}"

echo -e "${YELLOW}📄 Arquivo HTML: ${HTML_FILE}${NC}"
echo -e "${YELLOW}📑 PDF será gerado: ${PDF_NAME}${NC}"
echo ""
echo -e "${GREEN}⏳ Gerando PDF...${NC}"

# Verificar se Chrome está instalado
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ ! -f "$CHROME_PATH" ]; then
    echo -e "${RED}❌ Erro: Google Chrome não encontrado${NC}"
    echo "Por favor, instale o Google Chrome para gerar PDFs"
    exit 1
fi

# Gerar PDF usando Chrome headless
"$CHROME_PATH" --headless --disable-gpu \
    --print-to-pdf="$PDF_PATH" \
    --print-to-pdf-no-header \
    "file://$(cd ../../public && pwd)/${HTML_FILE}" \
    2>/dev/null

# Aguardar a geração
sleep 3

# Verificar se o PDF foi criado
if [ -f "$PDF_PATH" ]; then
    PDF_SIZE=$(ls -lh "$PDF_PATH" | awk '{print $5}')
    echo -e "${GREEN}✅ PDF gerado com sucesso!${NC}"
    echo ""
    echo -e "${GOLD}═══════════════════════════════════════════════${NC}"
    echo -e "${GREEN}Arquivo: ${PDF_NAME}${NC}"
    echo -e "${GREEN}Tamanho: ${PDF_SIZE}${NC}"
    echo -e "${GREEN}Local: public/${PDF_NAME}${NC}"
    echo -e "${GOLD}═══════════════════════════════════════════════${NC}"
    echo ""

    # Perguntar se deseja abrir o PDF
    read -p "Deseja abrir o PDF? (S/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
        open "$PDF_PATH"
        echo -e "${GREEN}📂 PDF aberto!${NC}"
    fi

    echo ""
    echo -e "${YELLOW}💡 Próximos passos:${NC}"
    echo "1. Revisar o PDF gerado"
    echo "2. Fazer commit no Git:"
    echo -e "   ${YELLOW}git add public/${PDF_NAME}${NC}"
    echo -e "   ${YELLOW}git commit -m \"Add PDF para ${HTML_FILE%.html}\"${NC}"
    echo ""
    echo "3. Compartilhar com o cliente:"
    echo "   - Email: Anexar o PDF"
    echo "   - WhatsApp: Enviar arquivo"
    echo "   - Apresentação: Abrir em tela cheia"
    echo ""
    echo -e "${GREEN}✨ Pronto! PDF exportado com sucesso! 🎉${NC}"
else
    echo -e "${RED}❌ Erro ao gerar PDF${NC}"
    echo "Verifique se o arquivo HTML está correto"
    exit 1
fi
