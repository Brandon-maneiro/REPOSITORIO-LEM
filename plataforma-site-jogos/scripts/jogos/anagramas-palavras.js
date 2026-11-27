// Configurações do Jogo
const configuracaoJogo = {
    palavraBase: "NAND", // O Comportamento esperado é ser substituída ao iniciar o jogo
};

// Controle de variáveis
let estado = {
    anagramasPossiveis: [],
    anagramasEncontrados: [],
    totalPossivel: 0
};


// Carrega lista de palavras (JSON)
function carregarPalavras() {
    return fetch('/scripts/jogos/anagramas-palavras.json')
        .then(resp => resp.json())
        .catch(err => {
            console.error("Erro ao carregar palavras:", err);
            return ["NAND"]; // Fallback
        });
}

function gerarPermutacoes(string) {
    if (string.length < 2) return [string];

    let permutacoes = []; 
    
    for (let i = 0; i < string.length; i++) {
        let char = string[i];

        if (string.indexOf(char) !== i) continue;

        let restante = string.slice(0, i) + string.slice(i + 1, string.length);

        for (let subPermutacao of gerarPermutacoes(restante)) {
            permutacoes.push(char + subPermutacao);
        }
    }
    return permutacoes;
}

// --- CONTROLE DE ESTADO ---

function iniciarJogo() {
    // Lógica Matemática
    estado.anagramasPossiveis = gerarPermutacoes(configuracaoJogo.palavraBase);
    estado.totalPossivel = estado.anagramasPossiveis.length;
    estado.anagramasEncontrados = []; // Reset
    
    renderizarInterface();
    
    // Foca no input
    const input = document.getElementById('input-tentativa');
    if(input) {
        input.value = '';
        input.disabled = false;
        input.maxLength = configuracaoJogo.palavraBase.length;
        input.focus();
    }
}

function processarTentativa() {
    const input = document.getElementById('input-tentativa');
    let tentativa = input.value.toUpperCase().trim();

    // Validações
    if (tentativa.length !== configuracaoJogo.palavraBase.length) {
        exibirFeedback(`A palavra deve ter ${configuracaoJogo.palavraBase.length} letras.`, 'erro');
        return;
    }

    if (estado.anagramasEncontrados.includes(tentativa)) {
        exibirFeedback("Você já encontrou este anagrama!", 'aviso');
        input.value = '';
        input.focus();
        return;
    }

    // Verifica Lógica
    if (estado.anagramasPossiveis.includes(tentativa)) {
        // ACERTOU
        estado.anagramasEncontrados.push(tentativa);
        
        // Renderiza apenas a atualização
        renderizarListaAcertos();
        document.getElementById('contador-atual').innerText = estado.anagramasEncontrados.length;
        
        exibirFeedback("Acertou!", 'success');
        input.value = '';
        
        // Verifica Vitória
        if (estado.anagramasEncontrados.length === estado.totalPossivel) {
            finalizarJogo();
        }
    } else {
        // ERROU
        exibirFeedback("Essas letras não formam um anagrama válido de " + configuracaoJogo.palavraBase, 'danger');
    }
    
    input.focus();
}

// --- RENDERIZAÇÃO (VIEW) ---

function renderizarInterface() {
    // Injeta dados nos containers estáticos
    document.getElementById('palavra-display').innerText = configuracaoJogo.palavraBase;
    document.getElementById('total-possivel').innerText = estado.totalPossivel;
    document.getElementById('contador-atual').innerText = estado.anagramasEncontrados.length;
    
    // Limpa UI
    document.getElementById('lista-acertos').innerHTML = '';
    document.getElementById('vitoria-modal').classList.add('d-none');
    document.getElementById('btn-verificar').disabled = false;
    
    const feedback = document.getElementById('mensagem-feedback');
    feedback.innerText = "Escreva um anagrama acima!";
    feedback.className = "alert feedback-placeholder item-novo"; // Reseta classes
}

function renderizarListaAcertos() {
    const lista = document.getElementById('lista-acertos');
    
    // Pega o último item adicionado para animar, ou renderiza tudo se necessário
    // Aqui vamos renderizar o último item adicionado para eficiência visual
    const ultimoAcerto = estado.anagramasEncontrados[estado.anagramasEncontrados.length - 1];
    
    const li = document.createElement('li');
    li.textContent = ultimoAcerto;
    li.className = 'badge bg-light text-dark border p-2 fs-6 item-novo'; // Bootstrap + Animação
    
    lista.appendChild(li);
}

function exibirFeedback(texto, tipo) {
    const el = document.getElementById('mensagem-feedback');
    el.textContent = texto;
    
    // Remove classes anteriores
    el.classList.remove('alert-success', 'alert-danger', 'alert-warning', 'item-novo');
    
    // Adiciona classe base bootstrap
    el.classList.add('alert'); 

    // Mapeia tipos para classes Bootstrap
    if (tipo === 'success') el.classList.add('alert-success');
    else if (tipo === 'danger' || tipo === 'erro') el.classList.add('alert-danger');
    else if (tipo === 'aviso') el.classList.add('alert-warning');
    else el.classList.add('alert-secondary');

    // Força reflow para reativar animação
    void el.offsetWidth; 
    el.classList.add('item-novo');
}

function finalizarJogo() {
    const modal = document.getElementById('vitoria-modal');
    modal.classList.remove('d-none');
    
    document.getElementById('input-tentativa').disabled = true;
    document.getElementById('btn-verificar').disabled = true;
    
    exibirFeedback("JOGO COMPLETO!", "success");
}

// --- INICIALIZAÇÃO E EVENTOS ---

document.addEventListener('DOMContentLoaded', () => {
    // Configura Eventos
    const btn = document.getElementById('btn-verificar');
    const input = document.getElementById('input-tentativa');

    if (btn) btn.addEventListener('click', processarTentativa);
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') processarTentativa();
        });
    }

    // Inicia Ciclo
    carregarPalavras()
        .then(lista => {
            const candidatos = Array.isArray(lista) ? lista : [];
            // Seleciona palavra
            if (candidatos.length > 0) {
                configuracaoJogo.palavraBase = String(candidatos[Math.floor(Math.random() * candidatos.length)]);
            } else {
                configuracaoJogo.palavraBase = "TESTE";
            }
            iniciarJogo();
        });
});