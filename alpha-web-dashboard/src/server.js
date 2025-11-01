const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configurações WAHA API
const WAHA_API_URL = process.env.WAHA_API_URL;
const WAHA_SESSION = process.env.WAHA_SESSION;
const WAHA_API_KEY = process.env.WAHA_API_KEY;

// Diretório para salvar registros de grupos
const GRUPOS_DIR = path.join(__dirname, '..', 'grupos-criados');
if (!fs.existsSync(GRUPOS_DIR)) {
    fs.mkdirSync(GRUPOS_DIR, { recursive: true });
}

// ============================================
// ROTAS DA API
// ============================================

// Rota: Verificar status da API
app.get('/api/status', async (req, res) => {
    try {
        const response = await axios.get(
            `${WAHA_API_URL}/api/sessions`,
            { headers: { 'X-Api-Key': WAHA_API_KEY } }
        );

        // Procurar pela sessão "default"
        const session = response.data.find(s => s.name === WAHA_SESSION);

        res.json({
            status: 'ok',
            whatsapp: {
                state: session?.status === 'WORKING' ? 'open' : 'close',
                status: session?.status,
                me: session?.me
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Erro ao verificar status do WhatsApp',
            error: error.message
        });
    }
});

// Rota: Obter configuração do time
app.get('/api/config/time', (req, res) => {
    const coordenador = process.env.COORDENADOR_PADRAO || '';
    const equipe = (process.env.EQUIPE_PADRAO || '').split(',').filter(n => n);

    res.json({
        coordenador,
        equipe,
        total: 1 + equipe.length
    });
});

// Rota: Atualizar configuração do time
app.post('/api/config/time', (req, res) => {
    const { coordenador, equipe } = req.body;

    if (!coordenador) {
        return res.status(400).json({ error: 'Coordenador é obrigatório' });
    }

    // Atualizar .env (em produção, usar banco de dados)
    let envContent = fs.readFileSync('.env', 'utf8');
    envContent = envContent.replace(
        /COORDENADOR_PADRAO=.*/,
        `COORDENADOR_PADRAO=${coordenador}`
    );
    envContent = envContent.replace(
        /EQUIPE_PADRAO=.*/,
        `EQUIPE_PADRAO=${equipe.join(',')}`
    );
    fs.writeFileSync('.env', envContent);

    // Atualizar variáveis de ambiente em memória
    process.env.COORDENADOR_PADRAO = coordenador;
    process.env.EQUIPE_PADRAO = equipe.join(',');

    res.json({
        success: true,
        message: 'Configuração atualizada com sucesso'
    });
});

// Rota: Criar grupo para novo cliente
app.post('/api/grupos/criar', async (req, res) => {
    try {
        const { nomeCliente, coordenador, equipe, mensagemPersonalizada } = req.body;

        if (!nomeCliente) {
            return res.status(400).json({ error: 'Nome do cliente é obrigatório' });
        }

        // Usar configuração padrão se não fornecida
        const coordenadorFinal = coordenador || process.env.COORDENADOR_PADRAO;
        const equipeFinal = equipe && equipe.length > 0
            ? equipe
            : (process.env.EQUIPE_PADRAO || '').split(',').filter(n => n);

        // Criar array de participantes no formato WAHA
        const participantes = [coordenadorFinal, ...equipeFinal].map(num => ({
            id: `${num}@c.us`
        }));

        const grupoNome = `🍽️ Alpha | ${nomeCliente}`;

        // Criar grupo via WAHA API
        const createResponse = await axios.post(
            `${WAHA_API_URL}/api/${WAHA_SESSION}/groups`,
            {
                name: grupoNome,
                participants: participantes
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': WAHA_API_KEY
                },
                validateStatus: () => true // Accept all status codes
            }
        );

        console.log('WAHA Response:', createResponse.status, createResponse.data);

        const grupoId = createResponse.data.id || createResponse.data.groupId;

        if (!grupoId) {
            throw new Error('Erro ao criar grupo: ID não retornado');
        }

        // Configurar descrição
        const descricao = `🎯 GRUPO OPERACIONAL - ${nomeCliente}

📋 Propósito:
• Comunicação direta com o cliente
• Alinhamento de estratégias
• Acompanhamento de resultados
• Suporte técnico

👥 Equipe Alpha Assessoria
🚀 Maior assessoria de marketing para restaurantes da América Latina

⚠️ Este é um grupo profissional. Mantenha foco nas atividades do cliente.`;

        await axios.put(
            `${WAHA_API_URL}/api/${WAHA_SESSION}/groups/${grupoId}`,
            {
                description: descricao
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': WAHA_API_KEY
                }
            }
        );

        // Enviar mensagem de boas-vindas
        const mensagem = mensagemPersonalizada || `🎉 *Bem-vindo(a) à Assessoria Alpha!*

Olá time do *${nomeCliente}*!

Este é o grupo oficial de comunicação entre sua equipe e a *Alpha Assessoria*, a maior assessoria de marketing para restaurantes da América Latina! 🚀

👥 *Equipe Alpha dedicada ao seu projeto:*
Coordenador e time operacional já estão no grupo.

📊 *O que faremos aqui:*
✅ Alinhamento de estratégias de marketing
✅ Aprovação de campanhas e criativos
✅ Acompanhamento de métricas e resultados
✅ Suporte rápido e eficiente

💬 *Horário de atendimento:*
Segunda a Sexta: 9h às 18h
Respostas urgentes em até 2 horas

Vamos juntos aumentar o faturamento do seu restaurante através do marketing digital! 💪🍽️`;

        await axios.post(
            `${WAHA_API_URL}/api/sendText`,
            {
                session: WAHA_SESSION,
                chatId: grupoId,
                text: mensagem
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': WAHA_API_KEY
                }
            }
        );

        // Salvar registro
        const timestamp = new Date().toISOString();
        const registro = {
            cliente: nomeCliente,
            grupoNome,
            grupoId,
            coordenador: coordenadorFinal,
            equipe: equipeFinal,
            criadoEm: timestamp,
            criadoPor: req.body.criadoPor || 'Dashboard Web'
        };

        const fileName = `${timestamp.replace(/:/g, '-')}_${nomeCliente.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
        fs.writeFileSync(
            path.join(GRUPOS_DIR, fileName),
            JSON.stringify(registro, null, 2)
        );

        res.json({
            success: true,
            message: 'Grupo criado com sucesso!',
            grupo: registro
        });

    } catch (error) {
        console.error('Erro ao criar grupo:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao criar grupo',
            message: error.message,
            details: error.response?.data
        });
    }
});

// Rota: Listar todos os grupos criados
app.get('/api/grupos/listar', (req, res) => {
    try {
        const arquivos = fs.readdirSync(GRUPOS_DIR)
            .filter(f => f.endsWith('.json'))
            .sort()
            .reverse(); // Mais recentes primeiro

        const grupos = arquivos.map(arquivo => {
            const conteudo = fs.readFileSync(path.join(GRUPOS_DIR, arquivo), 'utf8');
            return JSON.parse(conteudo);
        });

        res.json({
            success: true,
            total: grupos.length,
            grupos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erro ao listar grupos',
            message: error.message
        });
    }
});

// Rota: Adicionar membro a grupo existente
app.post('/api/grupos/adicionar-membro', async (req, res) => {
    try {
        const { grupoId, telefones } = req.body;

        if (!grupoId || !telefones || telefones.length === 0) {
            return res.status(400).json({ error: 'Grupo ID e telefones são obrigatórios' });
        }

        // Converter telefones para formato WAHA
        const participantes = telefones.map(tel => ({
            id: `${tel}@c.us`
        }));

        const response = await axios.post(
            `${WAHA_API_URL}/api/${WAHA_SESSION}/groups/${grupoId}/participants/add`,
            {
                participants: participantes
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': WAHA_API_KEY
                }
            }
        );

        res.json({
            success: true,
            message: 'Membro(s) adicionado(s) com sucesso!',
            data: response.data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erro ao adicionar membro',
            message: error.message
        });
    }
});

// Rota: Estatísticas
app.get('/api/estatisticas', (req, res) => {
    try {
        const arquivos = fs.readdirSync(GRUPOS_DIR).filter(f => f.endsWith('.json'));
        const grupos = arquivos.map(arquivo => {
            const conteudo = fs.readFileSync(path.join(GRUPOS_DIR, arquivo), 'utf8');
            return JSON.parse(conteudo);
        });

        // Grupos criados hoje
        const hoje = new Date().toISOString().split('T')[0];
        const gruposHoje = grupos.filter(g => g.criadoEm.startsWith(hoje));

        // Grupos esta semana
        const umaSemanaAtras = new Date();
        umaSemanaAtras.setDate(umaSemanaAtras.getDate() - 7);
        const gruposSemana = grupos.filter(g => new Date(g.criadoEm) > umaSemanaAtras);

        res.json({
            total: grupos.length,
            hoje: gruposHoje.length,
            semana: gruposSemana.length,
            ultimosGrupos: grupos.slice(0, 5)
        });
    } catch (error) {
        res.status(500).json({
            error: 'Erro ao obter estatísticas',
            message: error.message
        });
    }
});

// Rota raiz - servir interface web
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
    console.log('========================================');
    console.log('  ALPHA ASSESSORIA - DASHBOARD WEB');
    console.log('========================================');
    console.log('');
    console.log(`✅ Servidor rodando em: http://localhost:${PORT}`);
    console.log(`✅ WAHA API: ${WAHA_API_URL}`);
    console.log(`✅ Sessão: ${WAHA_SESSION}`);
    console.log('');
    console.log('Acesse no navegador: http://localhost:3000');
    console.log('========================================');
});
