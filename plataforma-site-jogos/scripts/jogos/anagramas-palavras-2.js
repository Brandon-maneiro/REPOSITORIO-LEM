// Configurações e Dados do Jogo
let wordDatabase = {};

// Estado do Jogo
let gameState = {
    level: 1,
    score: 0,
    lives: 3,
    currentWord: "",
    letterCounts: {},    
    correctAnswer: 0     
};

function carregarPalavras() {
    return fetch('/scripts/jogos/anagramas-palavras-2.json')
        .then(resp => {
            if (!resp.ok) throw new Error("Erro na rede/caminho");
            return resp.json();
        })
        .catch(err => {
            console.error("Erro ao carregar palavras:", err);
            // Fallback de segurança para o jogo não travar se o arquivo falhar
            return {
                easy: ["ERRO"], 
                medium: ["ERRO"], 
                hard: ["ERRO"], 
                expert: ["ERRO"]
            }; 
        });
}


// Seleciona a palavra baseada no nível
function generateWord() {
    // 1. Verificação de segurança (banco vazio)
    if (!wordDatabase.easy) {
        console.error("Banco de dados vazio!");
        return; 
    }

    let listSource = [];
    const level = gameState.level;

    // 2. Seleção da Lista (Regras de Nível)
    if (level <= 4) {
        // Easy
        listSource = wordDatabase.easy;
    } 
    else if (level <= 8) {
        // Medium
        listSource = wordDatabase.medium;
    } 
    else if (level <= 12) {
        // Hard + Medium
        listSource = wordDatabase.hard.concat(wordDatabase.medium);
    } 
    else {
        // Expert + Hard
        listSource = wordDatabase.expert.concat(wordDatabase.hard);
    }

    // 3. Sorteio com Proteção contra Repetição Imediata
    let newWord = "";

    // Se a lista tiver apenas 1 item (ou 0), não dá para trocar, pegamos o que tem.
    if (listSource.length <= 1) {
        newWord = listSource[0] || "ERRO"; 
    } else {
        // Loop "do-while": Executa pelo menos uma vez e repete enquanto a condição for verdadeira
        do {
            const randomIndex = Math.floor(Math.random() * listSource.length);
            newWord = listSource[randomIndex];
            
            // O loop continua rodando SE a nova palavra for igual à palavra atual armazenada no gameState
        } while (newWord === gameState.currentWord);
    }

    // 4. Aplica a nova palavra
    gameState.currentWord = newWord;
    analyzeLetters();
}

function analyzeLetters() {
    gameState.letterCounts = {};
    
    const wordForMath = gameState.currentWord
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();

    // Acima limpa os acentos, e deixamos maisculos em caso de erro humano, só então fazemos a contagem abaixo.
    for (let char of wordForMath) {
        gameState.letterCounts[char] = (gameState.letterCounts[char] || 0) + 1;
    }
}

// Função: Fatorial
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Calcula a resposta correta usando permutação com repetição
function calculateSolution() {
    const totalLetters = gameState.currentWord.length;
    
    // 1. Numerador: Fatorial do total de letras (P = n!)
    let numerator = factorial(totalLetters);
    
    // 2. Denominador: Produto dos fatoriais das repetições (n1! * n2! ...)
    let denominator = 1;
    for (let letter in gameState.letterCounts) {
        const count = gameState.letterCounts[letter];
        if (count > 1) {
            denominator *= factorial(count);
        }
    }

    gameState.correctAnswer = numerator / denominator;
}


function generateTileHTML(char) {
    return `
        <li class="letter-item">
            <div class="letter-tile"> 
                ${char.toUpperCase()}
            </div>
        </li>
    `;
}


function renderGame() {

    // Atualiza status básico
    document.getElementById('level-display').innerText = gameState.level;
    document.getElementById('score-display').innerText = gameState.score;

    // Atualiza Vidas com Corações
    const hearts = '❤'.repeat(gameState.lives);
    document.getElementById('lives-display').innerText = hearts;

    // Renderiza a Palavra (Tiles)
    const lettersList = document.getElementById('letters-list');
    if (lettersList) {
        // Separa a string em array de chars e mapeia
        lettersList.innerHTML = gameState.currentWord
            .split('')
            .map(char => generateTileHTML(char))
            .join('');
    }

    // Renderiza a Análise (Repetições) - O Card "Detalhes"
    const repeatDisplay = document.getElementById('repeat-display');
    if (repeatDisplay) {
        const counts = gameState.letterCounts;
        let htmlContent = [];
        let hasRepeats = false;

        for (let char in counts) {
            if (counts[char] > 1) {
                htmlContent.push(`<span class="text-danger border px-2 rounded bg-white shadow-sm">${char}: ${counts[char]}x</span>`);
                hasRepeats = true;
            }
        }

        if (hasRepeats) {
            repeatDisplay.innerHTML = htmlContent.join('');
        } else {
            repeatDisplay.innerHTML = '<span class="text-success small">Nenhuma repetição encontrada (n!)</span>';
        }
    }

    // Reseta Inputs
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

    // ACERTOU
    if (userVal === gameState.correctAnswer) {
        feedback.innerText = "CORRETO! Cálculo perfeito.";
        feedback.style.color = "green";
        gameState.score += (15 * gameState.level); // Pontuação um pouco maior pois é matemática
        
        document.getElementById('btn-check').style.display = 'none';
        document.getElementById('btn-next').style.display = 'inline-block';
    
    // ERROU
    } else {
        gameState.lives--;
        renderGame(); // Atualiza corações
        
        if (gameState.lives <= 0) {
            triggerGameOver();
        } else {
            feedback.innerText = `ERROU! A resposta certa era ${gameState.correctAnswer}.`;
            feedback.style.color = "red";
        }
    }
}

function startRound() {
    generateWord();        
    calculateSolution();    
    renderGame();          
}

function triggerGameOver() {
    document.getElementById('final-level').innerText = gameState.level;
    document.getElementById('final-score').innerText = gameState.score;
    
    const overlay = document.getElementById('game-over-overlay');
    overlay.style.display = 'flex'; 
}

function resetGame() {
    gameState.level = 1;
    gameState.score = 0;
    gameState.lives = 3;
    
    document.getElementById('game-over-overlay').style.display = 'none';
    startRound();
}

// --- INICIALIZAÇÃO ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Configura Botões e Inputs
    const btnCheck = document.getElementById('btn-check');
    if (btnCheck) btnCheck.addEventListener('click', handleCheck);
    
    const btnNext = document.getElementById('btn-next');
    if (btnNext) btnNext.addEventListener('click', () => {
        gameState.level++;
        startRound();
    });

    const btnRestart = document.getElementById('btn-restart');
    if (btnRestart) btnRestart.addEventListener('click', resetGame);

    // Bloqueio de caracteres (e, ., +, -)
    const inputAnswer = document.getElementById('user-answer');
    if (inputAnswer) {
        inputAnswer.addEventListener('keydown', (evt) => {
            const invalidChars = ["e", "E", ".", ",", "+", "-"];
            if (invalidChars.includes(evt.key)) {
                evt.preventDefault();
            }
        });
    }

    // 2. CARREGA DADOS E INICIA O JOGO
    // O jogo só começa depois que o arquivo JSON for lido
    carregarPalavras().then(data => {
        wordDatabase = data; // Armazena o JSON na variável global
        startRound();        // Só agora inicia a rodada
    });
});