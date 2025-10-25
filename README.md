# ShieldCar Blumenau - Proteção Veicular

Landing page para captação de leads de proteção veicular com integração HubSpot e Meta Pixel.

## 📋 Sobre o Projeto

Sistema de captação de leads para cooperativa de proteção veicular, oferecendo cotações gratuitas e personalizadas para clientes em Blumenau e região.

## ✨ Funcionalidades

- Formulário de cotação com validação em tempo real
- Integração com HubSpot CRM para gestão de leads
- Tracking de conversões via Meta Pixel (Facebook Ads)
- Captura de parâmetros UTM para análise de campanhas
- Backup local de leads (LocalStorage)
- Design responsivo e moderno
- Formatação automática de telefone

## 📁 Estrutura do Projeto

```
meu-repositorio/
├── README.md          # Documentação
├── .gitignore         # Arquivos ignorados pelo Git
├── public/            # Arquivos públicos
│   └── index.html     # Landing page principal
├── assets/            # Assets do projeto
│   ├── css/          # Estilos (futuro)
│   └── js/           # Scripts (futuro)
├── src/              # Código fonte
├── docs/             # Documentação adicional
└── tests/            # Testes
```

## 🚀 Como Usar

### Opção 1: Abrir diretamente no navegador
1. Abra o arquivo `public/index.html` no navegador
2. O formulário estará pronto para uso

### Opção 2: Servidor local
```bash
# Com Python 3
cd public
python -m http.server 8000

# Com Node.js (npx)
cd public
npx serve
```

Acesse: `http://localhost:8000`

## 🔧 Configurações

### HubSpot
- **Portal ID**: 50536787
- **Form ID**: 0a12dcbf-0c77-4ae3-86c8-fe7604dd4b85

### Meta Pixel
- **Pixel ID**: 1581222786653125

### Campos do Formulário
- Nome Completo (obrigatório)
- E-mail (obrigatório)
- Telefone/WhatsApp (obrigatório)
- Tipo de Veículo (obrigatório)
- Marca do Veículo (opcional)
- Modelo do Veículo (opcional)
- Cidade (obrigatório)

## 📊 Tracking e Analytics

O sistema captura automaticamente:
- Parâmetros UTM (source, medium, campaign, content)
- Evento "Lead" no Meta Pixel
- Dados completos no HubSpot CRM
- Backup local via LocalStorage

## 🎨 Benefícios Destacados

- Economia de até 50% comparado ao seguro tradicional
- Cobertura completa para roubo, furto e colisão
- Assistência 24 horas em todo território nacional
- Sem análise de perfil ou pontuação
- Proteção solidária e transparente

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 (Grid, Flexbox, Gradientes)
- JavaScript (ES6+)
- HubSpot Forms API
- Meta Pixel (Facebook Ads)
- LocalStorage API

## 📝 Próximos Passos

- [ ] Separar CSS em arquivo externo
- [ ] Separar JavaScript em arquivo externo
- [ ] Adicionar testes automatizados
- [ ] Implementar Google Analytics
- [ ] Adicionar mais páginas (Sobre, Contato)
- [ ] Criar painel de administração

## 📄 Licença

Este projeto está sob a licença MIT.
