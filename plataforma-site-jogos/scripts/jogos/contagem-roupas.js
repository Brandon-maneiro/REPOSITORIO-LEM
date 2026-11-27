// Configurações do Jogo
const COLORS_PT = ['Azul', 'Vermelho', 'Verde', 'Preto', 'Roxo', 'Laranja'];

// Mapa para traduzir para CSS
const COLOR_MAP = {
    'Azul': '#3498db',    
    'Vermelho': '#e74c3c', 
    'Verde': '#2ecc71',   
    'Preto': '#151b22ff',
    'Roxo': '#9b59b6',
    'Laranja': '#e67e22'
};


// Estado do Jogo
let gameState = {
    level: 1,
    score: 0,
    lives: 3, // NOVO
    shirts: [],
    pants: [],
    shoes: [],
    currentRule: null,
    correctAnswer: 0
};


function getRandomColor() {
    return COLORS_PT[Math.floor(Math.random() * COLORS_PT.length)];
}

// --- NOVA FUNÇÃO AUXILIAR ---
// Esta função embaralha as cores e pega a quantidade que você precisa
function getUniqueColors(amount) {
    // 1. Cria uma cópia do array de cores para não bagunçar o original
    const shuffled = [...COLORS_PT];
    
    // 2. Embaralha a cópia (algoritmo simples de sort aleatório)
    shuffled.sort(() => 0.5 - Math.random());
    
    // 3. Corta o array e retorna apenas a quantidade solicitada
    return shuffled.slice(0, amount);
}


// Gera o inventário de roupas para a rodada
function generateInventory() {
    // 1. Limpa tudo
    gameState.shirts = [];
    gameState.pants = [];
    gameState.shoes = [];

    // --- CONFIGURAÇÃO DE DIFICULDADE ---
    const quantityMultiplier = gameState.level < 10 ? 2 : 4; 
    
    // 2. Define QUANTIDADE de peças
    const numShirts = 2 + Math.floor(Math.random() * quantityMultiplier); 
    const numPants = 2 + Math.floor(Math.random() * quantityMultiplier);

    // 3. Gera Cores ÚNICAS para as Camisetas
    const shirtColors = getUniqueColors(numShirts);
    
    for (let i = 0; i < numShirts; i++) {
        gameState.shirts.push({ 
            id: `C${i}`, 
            type: 'Camiseta', 
            color: shirtColors[i] // Usa a cor da lista única
        });
    }

    // 4. Gera Cores ÚNICAS para as Calças
    const pantColors = getUniqueColors(numPants);

    for (let i = 0; i < numPants; i++) {
        gameState.pants.push({ 
            id: `P${i}`, 
            type: 'Calça', 
            color: pantColors[i] 
        });
    }

    // 5. Gera Sapatos nivel 6 para cima
    if (gameState.level >= 6) {
        const numShoes = 2 + Math.floor(Math.random() * quantityMultiplier);
        
        // Gera Cores ÚNICAS para os Sapatos
        const shoeColors = getUniqueColors(numShoes);

        for (let i = 0; i < numShoes; i++) {
            gameState.shoes.push({ 
                id: `S${i}`, 
                type: 'Sapato', 
                color: shoeColors[i] 
            });
        }
    }
}

// Gera uma regras da rodada
function generateRule() {
    
    const color1 = getRandomColor();
    let color2 = getRandomColor();

    // Garante que as cores não sejam iguais na regra
    while (color1 === color2) {
        color2 = getRandomColor();
    }

    gameState.currentRule = {
        type: 'forbidden_combination',
        desc: `Peças da cor ${color1.toUpperCase()} não podem ser usadas com peças da cor ${color2.toUpperCase()}.`,
        params: [color1, color2]
    };
}


function calculateSolution() {
    let validCombinations = 0;
    
    const hasShoes = gameState.shoes.length > 0;

    gameState.shirts.forEach(shirt => {
        gameState.pants.forEach(pant => {
            
            if (hasShoes) {
                // Nível Difícil: Loop triplo
                gameState.shoes.forEach(shoe => {
                    // Passamos as 3 peças para validar
                    if (isCombinationValid(shirt, pant, shoe)) {
                        validCombinations++;
                    }
                });
            } else {
                // Nível Fácil: Loop duplo (passa null no sapato)
                if (isCombinationValid(shirt, pant, null)) {
                    validCombinations++;
                }
            }
            
        });
    });
    
    gameState.correctAnswer = validCombinations;
}

function isCombinationValid(shirt, pant, shoe) {
    const rule = gameState.currentRule;
    if (!rule) return true;

    if (rule.type === 'forbidden_combination') {
        const [banned1, banned2] = rule.params;
        
        // Coletamos as cores presentes no look atual
        const colorsInLook = [shirt.color, pant.color];
        if (shoe) colorsInLook.push(shoe.color);

        // Verifica se as duas cores proibidas estão presentes na lista de cores do look
        const hasColor1 = colorsInLook.includes(banned1);
        const hasColor2 = colorsInLook.includes(banned2);

        if (hasColor1 && hasColor2) {
            return false;
        }
    }
    return true;
}

// --- FUNÇÃO AUXILIAR DE RENDERIZAÇÃO ---

/**
 * Gera o HTML para um item de roupa (Ícone colorido + Nome da cor)
 * @param {object} item - O objeto da roupa (ex: {type: 'Camiseta', color: 'Azul'})
 * @param {string} iconClass - A classe CSS do ícone (ex: 'icon-shirt')
 */
function generateItemHTML(item, iconClass) {
    const cssColor = COLOR_MAP[item.color] || 'gray';
    
    return `
        <li class="clothing-item">
            <div class="icon-box ${iconClass}" 
                 style="background-color: ${cssColor};" 
                 title="${item.color}"> 
            </div>
        </li>
    `;
}

// --- FUNÇÕES DE INTERFACE (DOM) ---

function renderGame() {

    // Atualiza status básico
    document.getElementById('level-display').innerText = gameState.level;
    document.getElementById('score-display').innerText = gameState.score;

    // --- NOVO: Atualiza Vidas com Corações ---
    const hearts = '❤'.repeat(gameState.lives); // Cria string "❤❤❤"
    document.getElementById('lives-display').innerText = hearts;

    // Atualiza status
    document.getElementById('level-display').innerText = gameState.level;
    document.getElementById('score-display').innerText = gameState.score;

    // Renderiza Camisetas
    const shirtsList = document.getElementById('shirts-list');
    if (shirtsList) {
        shirtsList.innerHTML = gameState.shirts
            .map(s => generateItemHTML(s, 'icon-shirt')) // Usa a nova função
            .join('');
    }

    // Renderiza Calças
    const pantsList = document.getElementById('pants-list');
    if (pantsList) {
        pantsList.innerHTML = gameState.pants
            .map(p => generateItemHTML(p, 'icon-pants')) // Usa a nova função
            .join('');
    }

    // Renderiza Sapatos
    const shoesContainer = document.getElementById('shoes-container');
    const shoesList = document.getElementById('shoes-list');
    
    if (shoesContainer && shoesList) {
        if (gameState.shoes.length > 0) {
            shoesContainer.style.display = 'block';
            shoesList.innerHTML = gameState.shoes
                .map(s => generateItemHTML(s, 'icon-shoe')) // Usa a nova função
                .join('');
        } else {
            shoesContainer.style.display = 'none';
            shoesList.innerHTML = '';
        }
    }

    // Renderiza Regra
    if (gameState.currentRule) {
        document.getElementById('rule-display').innerText = gameState.currentRule.desc;
    }

    // Garante que inputs estão limpos
    document.getElementById('user-answer').value = '';
    document.getElementById('feedback-msg').innerText = '';
    document.getElementById('btn-check').style.display = 'inline-block';
    document.getElementById('btn-next').style.display = 'none';
}

function handleCheck() {
    const userVal = parseInt(document.getElementById('user-answer').value);
    const feedback = document.getElementById('feedback-msg');

    if (isNaN(userVal)) {
        feedback.innerText = "Por favor, digite um número.";
        return;
    }

    // Cálculo do Total Matemático para feedback
    let totalMath = gameState.shirts.length * gameState.pants.length;
    if (gameState.shoes.length > 0) {
        totalMath = totalMath * gameState.shoes.length;
    }

    // ACERTOU
    if (userVal === gameState.correctAnswer) {
        feedback.innerText = "CORRETO! Você analisou bem as possibilidades.";
        feedback.style.color = "green";
        gameState.score += (10 * gameState.level); // Pontuação escala com nível
        
        document.getElementById('btn-check').style.display = 'none';
        document.getElementById('btn-next').style.display = 'inline-block';
    
    // ERROU
    } else {
        gameState.lives--; // Perde uma vida
        renderGame(); // Atualiza os corações na tela
        
        // Verifica se morreu
        if (gameState.lives <= 0) {
            triggerGameOver(); // CHAMA O FIM DE JOGO
        } else {
            // Se ainda tem vidas feedback
            feedback.innerText = `ERROU! Menos uma vida. A resposta certa era ${gameState.correctAnswer}.`;
            feedback.style.color = "red";
        }
    }
}

function startRound() {
    generateInventory();
    generateRule();
    calculateSolution();
    renderGame();
}

function triggerGameOver() {
    // 1. Preenche os dados no modal
    document.getElementById('final-level').innerText = gameState.level;
    document.getElementById('final-score').innerText = gameState.score;

    // 2. Mostra o overlay (usando flex para centralizar)
    const overlay = document.getElementById('game-over-overlay');
    overlay.style.display = 'flex'; 
}

function resetGame() {
    // 1. Reseta o estado
    gameState.level = 1;
    gameState.score = 0;
    gameState.lives = 3;
    
    // 2. Esconde o overlay
    document.getElementById('game-over-overlay').style.display = 'none';

    // 3. Começa do zero
    startRound();
}


// --- INICIALIZAÇÃO ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Botão de Verificar Resposta
    const btnCheck = document.getElementById('btn-check');
    if (btnCheck) btnCheck.addEventListener('click', handleCheck);
    
    // 2. Botão de Próxima Rodada
    const btnNext = document.getElementById('btn-next');
    if (btnNext) btnNext.addEventListener('click', () => {
        gameState.level++;
        startRound();
    });

    // 3. Botão de Tentar Novamente (ESTAVA FALTANDO ISSO)
    const btnRestart = document.getElementById('btn-restart');
    if (btnRestart) btnRestart.addEventListener('click', resetGame);

    // Começa o jogo
    startRound();
});