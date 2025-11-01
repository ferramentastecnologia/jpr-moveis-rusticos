// ============================================
// ALPHA ASSESSORIA - DASHBOARD APP
// ============================================

// Configuração da API Backend
// Em produção, este valor virá de uma variável de ambiente do Netlify
const API_BASE = window.ALPHA_API_URL || window.location.origin;

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    verificarStatus();
    carregarEstatisticas();
    carregarGrupos();
    carregarConfigTime();

    // Atualizar a cada 30 segundos
    setInterval(carregarEstatisticas, 30000);
});

// ============================================
// STATUS
// ============================================

async function verificarStatus() {
    try {
        const response = await fetch(`${API_BASE}/api/status`);
        const data = await response.json();

        const indicator = document.getElementById('statusIndicator');
        const dot = indicator.querySelector('.status-dot');
        const text = indicator.querySelector('.status-text');

        if (data.status === 'ok' && data.whatsapp?.state === 'open') {
            dot.classList.add('online');
            text.textContent = 'WhatsApp Conectado';
        } else {
            dot.classList.add('offline');
            text.textContent = 'WhatsApp Desconectado';
        }
    } catch (error) {
        console.error('Erro ao verificar status:', error);
        const indicator = document.getElementById('statusIndicator');
        const dot = indicator.querySelector('.status-dot');
        const text = indicator.querySelector('.status-text');
        dot.classList.add('offline');
        text.textContent = 'API Offline';
    }
}

// ============================================
// ESTATÍSTICAS
// ============================================

async function carregarEstatisticas() {
    try {
        const response = await fetch(`${API_BASE}/api/estatisticas`);
        const data = await response.json();

        document.getElementById('totalGrupos').textContent = data.total || 0;
        document.getElementById('gruposHoje').textContent = data.hoje || 0;
        document.getElementById('gruposSemana').textContent = data.semana || 0;
    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
    }
}

// ============================================
// CONFIGURAÇÃO DO TIME
// ============================================

async function carregarConfigTime() {
    try {
        const response = await fetch(`${API_BASE}/api/config/time`);
        const data = await response.json();

        document.getElementById('totalTime').textContent = data.total || 0;
    } catch (error) {
        console.error('Erro ao carregar config do time:', error);
    }
}

function abrirConfiguracoes() {
    const modal = document.getElementById('modalConfig');
    modal.classList.add('active');

    // Carregar configuração atual
    fetch(`${API_BASE}/api/config/time`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('coordenadorConfig').value = data.coordenador || '';

            const equipeInputs = document.getElementById('equipeInputs');
            equipeInputs.innerHTML = '';

            if (data.equipe && data.equipe.length > 0) {
                data.equipe.forEach(membro => {
                    const input = document.createElement('input');
                    input.type = 'tel';
                    input.className = 'equipe-input';
                    input.placeholder = '5547999999999';
                    input.value = membro;
                    equipeInputs.appendChild(input);
                });
            } else {
                adicionarMembroInput();
            }
        });
}

function fecharConfiguracoes() {
    document.getElementById('modalConfig').classList.remove('active');
}

function adicionarMembroInput() {
    const equipeInputs = document.getElementById('equipeInputs');
    const input = document.createElement('input');
    input.type = 'tel';
    input.className = 'equipe-input';
    input.placeholder = '5547999999999';
    equipeInputs.appendChild(input);
}

async function salvarConfiguracoes(event) {
    event.preventDefault();

    const coordenador = document.getElementById('coordenadorConfig').value;
    const equipeInputs = document.querySelectorAll('.equipe-input');
    const equipe = Array.from(equipeInputs)
        .map(input => input.value.trim())
        .filter(val => val);

    try {
        const response = await fetch(`${API_BASE}/api/config/time`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coordenador, equipe })
        });

        const data = await response.json();

        if (data.success) {
            mostrarToast('Configuração salva com sucesso!', 'success');
            fecharConfiguracoes();
            carregarConfigTime();
        } else {
            mostrarToast('Erro ao salvar configuração', 'error');
        }
    } catch (error) {
        console.error('Erro ao salvar configurações:', error);
        mostrarToast('Erro ao salvar configuração', 'error');
    }
}

// ============================================
// CRIAR GRUPO
// ============================================

function abrirModalCriar() {
    document.getElementById('modalCriar').classList.add('active');
    document.getElementById('formCriarGrupo').reset();
    document.getElementById('usarTimepadrao').checked = true;
    document.getElementById('timePersonalizado').style.display = 'none';
    document.getElementById('personalizarMensagem').checked = false;
    document.getElementById('mensagemPersonalizada').style.display = 'none';
}

function fecharModalCriar() {
    document.getElementById('modalCriar').classList.remove('active');
}

function toggleTimePersonalizado() {
    const usarPadrao = document.getElementById('usarTimepadrao').checked;
    document.getElementById('timePersonalizado').style.display = usarPadrao ? 'none' : 'block';
}

function toggleMensagemPersonalizada() {
    const personalizar = document.getElementById('personalizarMensagem').checked;
    document.getElementById('mensagemPersonalizada').style.display = personalizar ? 'block' : 'none';
}

async function criarGrupo(event) {
    event.preventDefault();

    const btnCriar = document.getElementById('btnCriar');
    const btnText = btnCriar.querySelector('.btn-text');
    const btnLoading = btnCriar.querySelector('.btn-loading');

    btnCriar.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';

    const nomeCliente = document.getElementById('nomeCliente').value;
    const usarTimePadrao = document.getElementById('usarTimepadrao').checked;
    const personalizarMensagem = document.getElementById('personalizarMensagem').checked;

    const payload = {
        nomeCliente
    };

    if (!usarTimePadrao) {
        payload.coordenador = document.getElementById('coordenadorCustom').value;
        const equipeText = document.getElementById('equipeCustom').value;
        payload.equipe = equipeText.split(',').map(n => n.trim()).filter(n => n);
    }

    if (personalizarMensagem) {
        payload.mensagemPersonalizada = document.getElementById('mensagemCustom').value;
    }

    try {
        const response = await fetch(`${API_BASE}/api/grupos/criar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (data.success) {
            mostrarToast(`Grupo criado com sucesso! 🎉`, 'success');
            fecharModalCriar();
            carregarGrupos();
            carregarEstatisticas();
        } else {
            mostrarToast(data.error || 'Erro ao criar grupo', 'error');
        }
    } catch (error) {
        console.error('Erro ao criar grupo:', error);
        mostrarToast('Erro ao criar grupo. Verifique se a API está rodando.', 'error');
    } finally {
        btnCriar.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

// ============================================
// LISTAR GRUPOS
// ============================================

async function carregarGrupos() {
    const gruposLista = document.getElementById('gruposLista');
    gruposLista.innerHTML = '<div class="loading">Carregando grupos...</div>';

    try {
        const response = await fetch(`${API_BASE}/api/grupos/listar`);
        const data = await response.json();

        if (!data.success || data.grupos.length === 0) {
            gruposLista.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📭</div>
                    <div class="empty-state-text">Nenhum grupo criado ainda</div>
                    <button class="btn btn-primary" onclick="abrirModalCriar()">Criar Primeiro Grupo</button>
                </div>
            `;
            return;
        }

        gruposLista.innerHTML = data.grupos.map(grupo => `
            <div class="grupo-card" data-cliente="${grupo.cliente.toLowerCase()}">
                <div class="grupo-info">
                    <div class="grupo-nome">${grupo.cliente}</div>
                    <div class="grupo-meta">
                        <span>📅 ${formatarData(grupo.criadoEm)}</span>
                        <span>👥 ${1 + (grupo.equipe?.length || 0)} membros</span>
                        <span title="${grupo.grupoId}">🆔 ${grupo.grupoId.substring(0, 15)}...</span>
                    </div>
                </div>
                <div class="grupo-actions">
                    <button class="btn-icon" onclick="copiarGrupoId('${grupo.grupoId}')" title="Copiar ID do grupo">
                        📋
                    </button>
                    <button class="btn-icon" onclick="verDetalhes(${JSON.stringify(grupo).replace(/"/g, '&quot;')})" title="Ver detalhes">
                        👁️
                    </button>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Erro ao carregar grupos:', error);
        gruposLista.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">❌</div>
                <div class="empty-state-text">Erro ao carregar grupos</div>
                <button class="btn btn-secondary" onclick="carregarGrupos()">Tentar Novamente</button>
            </div>
        `;
    }
}

function filtrarGrupos() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const grupos = document.querySelectorAll('.grupo-card');

    grupos.forEach(grupo => {
        const cliente = grupo.getAttribute('data-cliente');
        if (cliente.includes(search)) {
            grupo.style.display = 'flex';
        } else {
            grupo.style.display = 'none';
        }
    });
}

function copiarGrupoId(grupoId) {
    navigator.clipboard.writeText(grupoId)
        .then(() => mostrarToast('ID copiado para área de transferência!', 'success'))
        .catch(() => mostrarToast('Erro ao copiar ID', 'error'));
}

function verDetalhes(grupo) {
    const detalhes = `
Cliente: ${grupo.cliente}
Grupo: ${grupo.grupoNome}
ID: ${grupo.grupoId}
Coordenador: ${grupo.coordenador}
Equipe: ${grupo.equipe?.join(', ') || 'Nenhum'}
Criado em: ${formatarData(grupo.criadoEm)}
Criado por: ${grupo.criadoPor || 'N/A'}
    `.trim();

    alert(detalhes);
}

// ============================================
// UTILITÁRIOS
// ============================================

function formatarData(isoString) {
    const date = new Date(isoString);
    const hoje = new Date();

    const diffTime = hoje - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays} dias atrás`;

    return date.toLocaleDateString('pt-BR');
}

function mostrarToast(mensagem, tipo = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = mensagem;
    toast.className = `toast show ${tipo}`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// ============================================
// ATALHOS DE TECLADO
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl+N ou Cmd+N = Novo grupo
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        abrirModalCriar();
    }

    // ESC = Fechar modal
    if (e.key === 'Escape') {
        fecharModalCriar();
        fecharConfiguracoes();
    }
});
