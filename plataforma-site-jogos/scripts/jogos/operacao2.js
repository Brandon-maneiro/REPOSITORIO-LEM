const value1Input = document.getElementById('value1');
const operation1Select = document.getElementById('operation1');
const value2Span = document.getElementById('value2');
const operation2Select = document.getElementById('operation2');
const value3Span = document.getElementById('value3');
const finalResultSpan = document.getElementById('finalResult');
const btnConfirmar = document.getElementById('btn-confirmar');


const feedbackModal = new bootstrap.Modal(document.getElementById('feedbackModal'));
const modalMessage = document.getElementById('modalMessage');
const modalBtn = document.getElementById('modalBtn');

let currentB, currentC, currentResult;
let isCorrect = false;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomOperator() {
    const operators = ['+', '-', '*', '/'];
    return operators[Math.floor(Math.random() * operators.length)];
}

function gerarNovaEquacao() {
    let valid = false;
    let A, B, C, op1, op2, res;

    while (!valid) {
        A = getRandomInt(1, 20);
        B = getRandomInt(1, 20);
        C = getRandomInt(1, 20);
        op1 = getRandomOperator();
        op2 = getRandomOperator();

        const expression = `${A} ${op1} ${B} ${op2} ${C}`;
        
        try {
            res = eval(expression);
            
            // Numero válido
            if (Number.isInteger(res) && res >= 0 && res <= 200 && isFinite(res)) {
                valid = true;
            }
        } catch (e) {
            valid = false;
        }
    }

    currentB = B;
    currentC = C;
    currentResult = res;

    // Att valores
    value2Span.innerText = currentB;
    value3Span.innerText = currentC;
    finalResultSpan.innerText = currentResult;
    
    // Reset  inputs
    value1Input.value = '';
    operation1Select.value = '+';
    operation2Select.value = '+';
    
    value1Input.focus();
    
    console.log(`Solution: ${A} ${op1} ${B} ${op2} ${C} = ${res}`);
}

function showModal(message, success) {
    modalMessage.innerText = message;
    const modalContent = document.querySelector('.modal-content');
    
    // Remove previous classes to ensure clean state
    modalContent.classList.remove('bg-success', 'bg-danger', 'bg-dark');
    modalBtn.classList.remove('btn-success', 'btn-danger', 'btn-light', 'text-success', 'text-danger');
    
    if (success) {
        modalContent.classList.add('bg-success');
        modalBtn.classList.add('btn-light', 'text-success', 'fw-bold');
        modalBtn.innerText = 'Próximo Desafio';
    } else {
        modalContent.classList.add('bg-danger');
        modalBtn.classList.add('btn-light', 'text-danger', 'fw-bold');
        modalBtn.innerText = 'Tentar Novamente';
    }
    
    feedbackModal.show();
}

function verificarResposta() {
    const userA = parseFloat(value1Input.value);
    const userOp1 = operation1Select.value;
    const userOp2 = operation2Select.value;

    if (isNaN(userA)) {
        showModal('Por favor, digite um número válido.', false);
        isCorrect = false;
        return;
    }

    const expression = `${userA} ${userOp1} ${currentB} ${userOp2} ${currentC}`;
    let userRes;
    
    try {
        userRes = eval(expression);
    } catch (e) {
        showModal('Erro ao calcular a expressão.', false);
        isCorrect = false;
        return;
    }

    // Resultado
    if (Math.abs(userRes - currentResult) < 0.0001) {
        isCorrect = true;
        showModal('Parabéns! Você acertou!', true);
    } else {
        isCorrect = false;
        showModal(`Resposta incorreta. A expressão resulta em ${parseInt(userRes)}, mas o objetivo é ${currentResult}.`, false);
    }
}

btnConfirmar.addEventListener('click', verificarResposta);

value1Input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        verificarResposta();
    }
});

// close/continue
document.getElementById('feedbackModal').addEventListener('hidden.bs.modal', function () {
    if (isCorrect) {
        gerarNovaEquacao();
    } else {
        value1Input.focus();
        value1Input.select();
    }
});

gerarNovaEquacao();
