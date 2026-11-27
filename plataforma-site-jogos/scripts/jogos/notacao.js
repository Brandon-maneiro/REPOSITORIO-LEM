const inputs = document.querySelectorAll('input');

const finalizarInput = document.querySelector('.finalizar');
const resetInput = document.querySelector('.repetir');

const perguntasContainers = document.querySelectorAll('.pergunta-container');

const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

finalizarInput.addEventListener('click', () => {
    checkRespostas();
});

resetInput.addEventListener('click', () => {
    randomizarPerguntas();
});

// PERMITE APENAS NÚMEROS
for (const i of inputs) {
    i.addEventListener('keydown', (e) => {
        if (!e.key.match('[^a-zA-Z]') && allowedKeys.indexOf(e.key) == -1) {
            e.preventDefault()
        };
    });
};

// IMPEDE DE EDITAR E CRIA OS VALORES ALEATÓRIOS
function randomizarPerguntas() {
    for (const p of perguntasContainers) {
        let rng = Math.floor(Math.random() * 2);
        let inputsPresos = [];

        for (const x of p.querySelectorAll('input')) {
            x.classList.remove('fixo', 'certo', 'errado');
            x.removeAttribute('readonly');
            x.value = 1;
        };

        if (rng > 0) {
            inputsPresos = p.children[0].querySelectorAll('input');
            inputsPresos[0].value = (Math.floor(Math.random() * 99 + 1) / (10 ** Math.floor(Math.random() * 3))).toLocaleString('pt-br');        
            inputsPresos[1].value = Math.floor(Math.random() * 16 - 8)
        } else {
            inputsPresos.push(p.children[1]);
            inputsPresos[0].value = (Math.floor(Math.random() * 99 + 1) * (10 ** Math.floor(Math.random() * 8))).toLocaleString('pt-br');
        };
        for (const i of inputsPresos) {
            i.setAttribute('readonly', 'readonly');
            i.classList.add('fixo');
        };
    };
};


function checkRespostas() {
    for (const p of perguntasContainers) {
        let base = p.querySelector('.base');
        let expoente = p.querySelector('.expoente');
        let resultado = p.querySelector('.resultado');

        let total = parseFloat(String(base.value).replace(',', '.')) * (10 ** parseInt(expoente.value));

        for (const x of p.querySelectorAll('input')) {
            x.classList.remove('certo', 'errado');
        };

        console.log(total.toLocaleString('pt-br', {maximumSignificantDigits: 15}), (resultado.value).toLocaleString('pt-br', {maximumSignificantDigits: 15}))        

        if (total.toLocaleString('pt-br', {maximumSignificantDigits: 15}) == (resultado.value).toLocaleString('pt-br', {maximumSignificantDigits: 15})) {
            if (!base.classList.contains('fixo')) {
                base.classList.add('certo');
                expoente.classList.add('certo');
            } else {
                resultado.classList.add('certo');
            };
        } else {
            if (!base.classList.contains('fixo')) {
                base.classList.add('errado');
                expoente.classList.add('errado');
            } else {
                resultado.classList.add('errado');
            };
        };
    };
};

randomizarPerguntas()