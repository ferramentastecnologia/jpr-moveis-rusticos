#!/bin/bash

# Deploy script for FNP proposal to Netlify

echo "🍗 Iniciando deploy da proposta FNP..."

# Ensure fnp-deploy folder exists
mkdir -p fnp-deploy

# Copy latest version
cp public/proposta-fnp.html fnp-deploy/index.html

echo "📁 Arquivos preparados"

# Deploy to Netlify
cd fnp-deploy
echo "🚀 Fazendo deploy..."
netlify deploy --prod --site proposta-fnp-starken

echo "✅ Deploy concluído!"
