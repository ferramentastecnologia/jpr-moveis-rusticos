# 📄 TEMPLATES DE LANDING PAGES - ALPHA ASSESSORIA

## 🎯 Propósito

Este diretório contém templates de landing pages profissionais para fechamento comercial, seguindo a identidade visual Alpha (preto & dourado).

---

## 📁 Templates Disponíveis

### 1. `template-proposta-comercial.html`

**Tipo:** Landing Page de Proposta Comercial
**Base:** Proposta Stasi Pizzaria
**Uso:** Apresentação de planos e fechamento comercial

**Características:**
- ✅ Identidade visual Alpha (preto & dourado)
- ✅ Seções modulares e reutilizáveis
- ✅ Responsivo (mobile + desktop)
- ✅ Animações e efeitos premium
- ✅ CTA forte para conversão
- ✅ Tabela comparativa de planos
- ✅ Resultados esperados
- ✅ Próximos passos claros

---

## 🚀 Como Usar o Template

### Passo 1: Copiar o Template

```bash
cp templates/landing-pages/template-proposta-comercial.html public/proposta-[nome-cliente].html
```

### Passo 2: Personalizar as Variáveis

Abra o arquivo e substitua as seguintes variáveis:

#### 📝 **INFORMAÇÕES DO CLIENTE**

```html
<!-- Substituir em: Header Principal -->
[NOME_CLIENTE] → Nome da empresa/restaurante
[CIDADE] → Cidade do cliente
[ESTADO] → Estado (sigla)

<!-- Substituir em: Perfil do Cliente -->
[RESPONSAVEL] → Nome do responsável/proprietário
[FATURAMENTO_ATUAL] → Ex: R$ 20k
[CATEGORIA_NEGOCIO] → Ex: Pizzaria, Restaurante, Hamburgueria
[POTENCIAL] → ALTO, MÉDIO ou BAIXO
```

#### 💰 **VALORES E INVESTIMENTO**

```html
[VALOR_GESTAO] → Ex: R$ 1.500,00
[VALOR_TRAFEGO_MIN] → Ex: R$ 200
[VALOR_TRAFEGO_MAX] → Ex: R$ 250
[TOTAL_ESTIMADO_MIN] → Ex: R$ 2.300
[TOTAL_ESTIMADO_MAX] → Ex: R$ 2.500
```

#### 🎯 **PLANO E BENEFÍCIOS**

```html
[NOME_PLANO] → Ex: PLANO SILVER, PLANO GOLD
[BENEFICIO_1] → Personalizar conforme necessidade
[BENEFICIO_2] → Personalizar conforme necessidade
... (até 6 benefícios)
```

### Passo 3: Deploy

```bash
# Adicionar ao Git
git add public/proposta-[nome-cliente].html

# Commit
git commit -m "Add proposta comercial para [Nome Cliente]"

# Deploy no Netlify
netlify deploy --prod --dir=public
```

### Passo 4: Compartilhar

O link será:
```
https://alpha-assessoria-dashboard.netlify.app/proposta-[nome-cliente].html
```

---

## 📋 Checklist de Customização

Ao criar uma nova proposta, certifique-se de personalizar:

- [ ] Nome do cliente no header
- [ ] Localização (cidade e estado)
- [ ] Badge de exclusividade (se aplicável)
- [ ] Nome do responsável
- [ ] Faturamento atual
- [ ] Categoria do negócio
- [ ] Potencial de crescimento
- [ ] Nome do plano (Silver, Gold, etc)
- [ ] 6 benefícios principais
- [ ] Valor da gestão mensal
- [ ] Valor do tráfego pago
- [ ] Tabela comparativa
- [ ] Resultados esperados (6 itens)
- [ ] Próximos passos (4 etapas)
- [ ] Texto da observação estratégica
- [ ] Data de geração (footer)

---

## 🎨 Identidade Visual

### Cores Padrão Alpha

```css
--gold: #d4a03a;          /* Dourado principal */
--gold-light: #e6b855;    /* Dourado claro */
--gold-dark: #b8892f;     /* Dourado escuro */

--black: #0C0C0C;         /* Preto principal */
--black-light: #1a1a1a;   /* Preto claro */
--black-lighter: #2a2a2a; /* Preto mais claro */

--success: #2ECC71;       /* Verde (resultados) */
--danger: #E74C3C;        /* Vermelho (urgência) */
--warning: #F39C12;       /* Laranja (avisos) */
--info: #3498DB;          /* Azul (informações) */
```

**NÃO ALTERAR** as cores para manter a identidade visual Alpha consistente.

---

## 📊 Estrutura das Seções

### Seções Obrigatórias (manter sempre):

1. **Header Principal** - Apresentação e cliente
2. **Perfil do Cliente** - Cards com informações-chave
3. **Plano Recomendado** - Benefícios e diferenciais
4. **Investimento** - Valores destacados
5. **Tabela Comparativa** - Planos e economia
6. **Resultados Esperados** - 6 outcomes principais
7. **Próximos Passos** - Timeline de implementação
8. **CTA Final** - Call-to-action forte
9. **Footer** - Marca e observações

### Seções Opcionais (adicionar se necessário):

- Timeline do projeto
- Depoimentos de clientes
- Estudos de caso
- Comparativo com concorrência
- FAQ

---

## 🔧 Manutenção

### Atualizações Globais

Se precisar atualizar algo em TODOS os templates:

1. Edite o arquivo `template-proposta-comercial.html`
2. Documente a mudança neste README
3. Comunique à equipe sobre a atualização

### Versionamento

- **v1.0** - Template base (Stasi Pizzaria) - 29/10/2025

---

## 📝 Exemplos de Uso

### Proposta para Pizzaria
```bash
cp templates/landing-pages/template-proposta-comercial.html public/proposta-pizzaria-bella.html
# Customizar: foco em delivery, ticket médio, cardápio digital
```

### Proposta para Restaurante
```bash
cp templates/landing-pages/template-proposta-comercial.html public/proposta-restaurante-gourmet.html
# Customizar: experiência gastronômica, reservas, eventos
```

### Proposta para Hamburgueria
```bash
cp templates/landing-pages/template-proposta-comercial.html public/proposta-burger-house.html
# Customizar: público jovem, combos, promoções
```

---

## 🎯 Melhores Práticas

1. **Sempre personalize** - Nunca envie um template sem customização completa
2. **Valide os números** - Confira valores e cálculos antes de enviar
3. **Teste mobile** - Abra em dispositivos móveis antes de compartilhar
4. **Nome de arquivo** - Use padrão: `proposta-[nome-cliente].html` (minúsculo, sem espaços)
5. **Backup** - Sempre faça commit no Git antes de fazer deploy
6. **Links** - Teste o link final antes de enviar ao cliente

---

## 📞 Suporte

Dúvidas sobre os templates? Entre em contato com a equipe de desenvolvimento.

---

**Template criado e mantido por:** Alpha Assessoria
**Última atualização:** 29/10/2025
**Versão:** 1.0
