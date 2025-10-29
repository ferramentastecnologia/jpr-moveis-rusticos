# ⚡ GUIA RÁPIDO - CRIAR NOVA PROPOSTA

## 🚀 3 Passos Simples

### 1️⃣ COPIAR TEMPLATE
```bash
cp templates/landing-pages/template-proposta-comercial.html public/proposta-[cliente].html
```

### 2️⃣ BUSCAR E SUBSTITUIR (Ctrl+F)

Abra o arquivo e substitua:

| Buscar | Substituir por |
|--------|---------------|
| `Stasi Pizzaria` | Nome do cliente |
| `Sandro` | Nome do responsável |
| `Ilha do Governador` | Cidade do cliente |
| `Rio de Janeiro - RJ` | Estado completo |
| `R$ 20k` | Faturamento atual |
| `Pizzaria` | Tipo de negócio |
| `ALTO` | Potencial (ALTO/MÉDIO/BAIXO) |
| `R$ 1.500` | Valor da gestão |
| `R$ 200-250` | Valor do tráfego |
| `SILVER` | Nome do plano |

### 3️⃣ DEPLOY
```bash
git add public/proposta-[cliente].html
git commit -m "Add proposta para [Cliente]"
netlify deploy --prod --dir=public
```

## 🔗 LINK FINAL
```
https://alpha-assessoria-dashboard.netlify.app/proposta-[cliente].html
```

---

## ✅ CHECKLIST ANTES DE ENVIAR

- [ ] Nome do cliente correto em todos os lugares
- [ ] Valores calculados corretamente
- [ ] Benefícios personalizados
- [ ] Data atualizada no footer
- [ ] Testado em mobile
- [ ] Link funcionando

---

## 💡 DICA PRO

Use o Find & Replace do seu editor:
- VS Code: `Ctrl+H` (Windows/Linux) ou `Cmd+H` (Mac)
- Substitua todas as ocorrências de uma vez

---

**Tempo médio:** 10-15 minutos por proposta
