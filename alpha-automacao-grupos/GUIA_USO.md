# Guia Completo de Uso - Sistema Alpha

## Para Gestores e Coordenadores

Este é o guia completo para usar o sistema de automação de grupos WhatsApp da Assessoria Alpha.

---

## Índice
1. [Primeira Vez Usando](#primeira-vez-usando)
2. [Rotina Diária](#rotina-diária)
3. [Cenários Comuns](#cenários-comuns)
4. [Personalização](#personalização)
5. [FAQ](#faq)

---

## Primeira Vez Usando

### Passo 1: Preparação Única

Abra o Terminal e execute:

```bash
cd /Users/juanminni/meu-repositorio/alpha-automacao-grupos
chmod +x *.sh
```

### Passo 2: Configurar Seu Time

```bash
./config-time.sh
```

Será solicitado:

**1. Número do Coordenador**
Digite o número do WhatsApp da pessoa que gerencia contas de clientes.
- Exemplo: 5547992752697
- Esse número estará em TODOS os grupos de clientes

**2. Quantidade de Membros da Equipe**
Digite quantas pessoas da equipe operacional participam dos grupos.
- Exemplo: 4
- Pode ser de 0 a 10 pessoas

**3. Número de Cada Membro**
Para cada membro, digite o número do WhatsApp.
- Exemplo Membro 1: 5547992212108 (Designer)
- Exemplo Membro 2: 5547991234567 (Social Media)
- Exemplo Membro 3: 5547997654321 (Tráfego)
- Exemplo Membro 4: 5547998765432 (Atendimento)

**Confirme** a configuração e pronto!

### Passo 3: Verificar Configuração

Abra o arquivo `criar-grupo-cliente.sh` e verifique se os números foram salvos corretamente nas linhas:
- `COORDENADOR=...`
- `EQUIPE=(...)`

---

## Rotina Diária

### Criar Grupo para Novo Cliente

Quando fechar com um novo restaurante:

```bash
./criar-grupo-cliente.sh "Nome do Restaurante"
```

**Dicas para o Nome:**
- Use o nome comercial do restaurante
- Adicione localização se houver múltiplas unidades
- Seja específico para fácil identificação

**Exemplos Bons:**
```bash
./criar-grupo-cliente.sh "Pizzaria Bella Italia"
./criar-grupo-cliente.sh "Burger King - Shopping Iguatemi"
./criar-grupo-cliente.sh "Restaurante Japonês Sakura - Asa Sul"
```

**Exemplos Ruins:**
```bash
./criar-grupo-cliente.sh "pizza"  # Muito vago
./criar-grupo-cliente.sh "Cliente 123"  # Não identifica o negócio
```

### O Que Acontece Automaticamente

1. **Grupo Criado** com nome "🍽️ Alpha | Nome do Restaurante"
2. **Time Adicionado** - Coordenador + todos os membros configurados
3. **Descrição Configurada** - Texto profissional sobre o propósito do grupo
4. **Mensagem Enviada** - Boas-vindas automática explicando o funcionamento
5. **Registro Salvo** - Arquivo JSON com informações do grupo

### Verificar no WhatsApp

Depois de executar o comando:
1. Abra WhatsApp no celular ou web
2. Procure pelo grupo "🍽️ Alpha | [Nome]"
3. Confirme que todos os membros foram adicionados
4. Veja a mensagem de boas-vindas enviada

---

## Cenários Comuns

### Cenário 1: Cliente Quer Adicionar Sócio no Grupo

**Situação:** Cliente pediu para adicionar o sócio dele no grupo.

**Solução:**

1. Primeiro, pegue o ID do grupo:
```bash
./listar-grupos.sh
```

2. Localize o grupo do cliente e copie o ID (ex: 120363423504755655@g.us)

3. Adicione o sócio:
```bash
./adicionar-membro.sh "120363423504755655@g.us" "5547999999999"
```

### Cenário 2: Múltiplas Unidades do Mesmo Restaurante

**Situação:** Restaurante tem 3 unidades, quer grupo separado para cada.

**Solução:**

```bash
./criar-grupo-cliente.sh "Pizzaria Bella - Shopping Iguatemi"
./criar-grupo-cliente.sh "Pizzaria Bella - Asa Norte"
./criar-grupo-cliente.sh "Pizzaria Bella - Águas Claras"
```

Cada unidade terá seu grupo independente com todo o time.

### Cenário 3: Cliente VIP Precisa de Atenção Extra

**Situação:** Cliente grande precisa de um atendimento especial.

**Solução:**

1. Crie o grupo normalmente:
```bash
./criar-grupo-cliente.sh "Restaurante VIP Ltda"
```

2. Adicione diretor ou gerente extra:
```bash
./adicionar-membro.sh "GROUP_ID" "5547988888888"
```

3. Mande mensagem personalizada no grupo explicando o diferencial

### Cenário 4: Mudou Designer da Equipe

**Situação:** Designer antigo saiu, entrou um novo.

**Solução:**

1. Atualize a configuração:
```bash
./config-time.sh
```

2. Informe o novo número do designer

3. **Importante:** Grupos antigos mantêm o designer antigo. Para atualizar grupos existentes, você precisará:
   - Remover o antigo manualmente do WhatsApp
   - Adicionar o novo com: `./adicionar-membro.sh`

### Cenário 5: Verificar Todos os Grupos Criados Hoje

**Situação:** Quer ver quantos clientes fecharam hoje.

**Solução:**

```bash
./listar-grupos.sh
```

Veja a lista com datas de criação. Grupos criados hoje aparecerão com a data atual.

---

## Personalização

### Personalizar Mensagem de Boas-Vindas

Para mudar a mensagem enviada automaticamente:

1. Abra o arquivo:
```bash
nano criar-grupo-cliente.sh
```

2. Procure por `MENSAGEM_BOAS_VINDAS`

3. Edite o texto entre aspas

4. Salve (Ctrl+X, Y, Enter)

### Personalizar Descrição do Grupo

1. Abra o arquivo:
```bash
nano criar-grupo-cliente.sh
```

2. Procure por `DESCRICAO`

3. Edite o texto

4. Salve

### Adicionar Logo da Alpha nos Grupos

**Automático (Futuro):** Será implementado em breve.

**Manual (Agora):**
1. Crie o grupo com o script
2. Abra o grupo no WhatsApp
3. Clique em info do grupo
4. Adicione foto da Alpha manualmente

---

## FAQ

### Q: Posso criar grupos sem WhatsApp conectado no celular?

**R:** Não. A Evolution API precisa estar conectada ao WhatsApp. Quando o WhatsApp desconectar, será necessário escanear QR Code novamente.

### Q: Quantos grupos posso criar por dia?

**R:** Teoricamente ilimitado, mas o WhatsApp pode ter limites de segurança. Recomendado: máximo 50 grupos por dia para evitar bloqueios.

### Q: E se eu escrever o nome do restaurante errado?

**R:** O grupo será criado com nome errado. Você pode:
1. Abrir o grupo no WhatsApp
2. Editar o nome do grupo manualmente
3. OU criar novo grupo com nome correto e arquivar o errado

### Q: Posso remover membros do grupo automaticamente?

**R:** Não com o sistema atual. Para remover, faça manualmente no WhatsApp.

### Q: O sistema funciona com WhatsApp Business?

**R:** Sim! Funciona tanto com WhatsApp comum quanto Business.

### Q: Posso usar em múltiplos computadores?

**R:** Sim, mas a Evolution API precisa estar rodando. Você pode:
- Rodar scripts de qualquer computador da rede
- Ou copiar a pasta para outro computador

### Q: O que acontece se Evolution API cair?

**R:** Os grupos existentes continuam funcionando no WhatsApp normalmente. Você só não conseguirá criar novos grupos até a API voltar.

**Para reativar:**
```bash
cd /Users/juanminni/meu-repositorio/evolution-api
npm start
```

### Q: Posso agendar criação de grupos?

**R:** Não nativamente. Mas você pode usar `cron` ou criar um workflow no n8n para isso.

### Q: Como exportar lista de todos os grupos?

**R:** Todos os grupos estão salvos em:
```
/Users/juanminni/meu-repositorio/alpha-automacao-grupos/grupos-criados/
```

Cada arquivo JSON contém:
- Nome do cliente
- ID do grupo
- Data de criação
- Membros adicionados

### Q: Posso criar grupos para outros propósitos (não clientes)?

**R:** Sim! O script funciona para qualquer tipo de grupo. Mas recomendamos criar um script separado para outros propósitos.

---

## Comandos Rápidos (Cheat Sheet)

```bash
# Criar grupo novo cliente
./criar-grupo-cliente.sh "Nome do Restaurante"

# Ver todos os grupos
./listar-grupos.sh

# Adicionar membro
./adicionar-membro.sh "GROUP_ID" "5547999999999"

# Adicionar vários membros
./adicionar-membro.sh "GROUP_ID" "5547991111111,5547992222222"

# Configurar time
./config-time.sh

# Ver diretório atual
pwd

# Listar arquivos
ls -la
```

---

## Fluxo de Trabalho Recomendado

### Ao Fechar Novo Cliente

1. ✅ **Fechar contrato** com restaurante
2. ✅ **Criar grupo** via script
3. ✅ **Verificar** grupo no WhatsApp
4. ✅ **Apresentar time** manualmente (opcional)
5. ✅ **Iniciar onboarding** do cliente

### Semanalmente

1. 📊 **Revisar** lista de grupos criados
2. 🔍 **Verificar** se algum grupo precisa de ajustes
3. 📝 **Atualizar** configuração de time se necessário

### Mensalmente

1. 📈 **Analisar** quantos grupos foram criados
2. 💡 **Identificar** melhorias no processo
3. 🔄 **Atualizar** mensagens e descrições se necessário

---

## Suporte Técnico

### Logs e Debug

Se algo der errado, os logs estão em:
```bash
/Users/juanminni/meu-repositorio/alpha-automacao-grupos/grupos-criados/
```

Cada arquivo JSON contém detalhes do grupo criado.

### Contato

Para suporte técnico ou melhorias:
- Desenvolvedor: Juan Minni
- Projeto: Sistema Alpha Automação de Grupos
- Data: Outubro 2024

---

**Lembre-se:** Este sistema economiza +50 horas por ano da sua equipe! 🚀
