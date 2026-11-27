const fracoesContainer = document.querySelectorAll('.fracao-container');
const vitoriaContainer = document.querySelector('.vitoria-container');

const prontoBtn = document.querySelector('.finalizar');
const lixoBtn = document.querySelector('.lixo');
const resetBtn = document.querySelector('.reset');
const resetParabenizacaoBtn = document.querySelector('.reset-parabenizacao');
const fecharParabenizacaoBtn = document.querySelector('.botao-fechar-parabenizacao');


let cores = ['azul', 'roxo', 'rosa', 'amarelo', 'laranja'];

let cx = 110; // Centro X
let cy = 110; // Centro Y
let r = 100; // Raio

lixoBtn.addEventListener('click', () => resetarInputs());
prontoBtn.addEventListener('click', () => checarRespostas());
fecharParabenizacaoBtn.addEventListener('click', () => {vitoriaContainer.close(); });

resetBtn.addEventListener('click', () => {
   
    resetarInputs();
    for (const f of fracoesContainer) {
        f.removeChild(f.firstElementChild);
    }

    vitoriaContainer.close();
    criarFracoes();
})

resetParabenizacaoBtn.addEventListener('click', () => {
   
    resetarInputs();
    for (const f of fracoesContainer) {
        f.removeChild(f.firstElementChild);
    }

    vitoriaContainer.close();
    criarFracoes();
})

function checarRespostas() {
    // Primeiro remova estados anteriores em todos os inputs
    for (const f of fracoesContainer) {
        const numerador = f.querySelector('.numerador');
        const denominador = f.querySelector('.denominador');
        if (numerador) numerador.classList.remove('certo', 'errado');
        if (denominador) denominador.classList.remove('certo', 'errado');
    }

    // Em seguida verifique cada fração e marque como 'certo' ou 'errado'
    for (const f of fracoesContainer) {
        const numerador = f.querySelector('.numerador');
        const denominador = f.querySelector('.denominador');
        const preenchidos = f.querySelectorAll('.preenchido').length;
        const vazios = f.querySelectorAll('.vazio').length;

        if (!numerador || !denominador) continue;

        // Se algum campo estiver vazio, considere errado
        if (!numerador.value || !denominador.value) {
            numerador.classList.add('errado');
            denominador.classList.add('errado');
            continue;
        }

        const esquerda = preenchidos / (preenchidos + vazios);
        const direita = Number(numerador.value) / Number(denominador.value);

        if (esquerda.toPrecision(6) != direita.toPrecision(6)) {
            numerador.classList.add('errado');
            denominador.classList.add('errado');
        } else {
            numerador.classList.add('certo');
            denominador.classList.add('certo');
        }
    }

    // verifica se existe algum 'errado' nos numeradores/denominadores
    let temErrado = false;
    for (const f of fracoesContainer) {
        const numerador = f.querySelector('.numerador');
        const denominador = f.querySelector('.denominador');
        if (!numerador || !denominador) continue;
        if (numerador.classList.contains('errado') || denominador.classList.contains('errado')) {
            temErrado = true;
            break;
        }
    }

    if (temErrado) {
        console.log('Ainda não acertou tudo');
        return;
    }

    vitoriaContainer.showModal();
}


function resetarInputs() {
    for (const f of fracoesContainer) {
        let numerador = f.querySelector('.numerador');
        let denominador = f.querySelector('.denominador');
        numerador.classList.remove('certo', 'errado');
        numerador.value = '';
        denominador.classList.remove('certo', 'errado');
        denominador.value = '';
        
    };
}

function criarFracoes() {
    for (const f of fracoesContainer) {

        let cor = cores[Math.floor(Math.random() * cores.length)];

        let qtd = Math.floor(Math.random() * 10 + 2);
        let angulo = 360 / qtd;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");

        const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);

        svg.appendChild(circle);

        let c = 0
        for (let x = 0; x < qtd; x++) {
            const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            let rng = Math.floor(Math.random() * 6 + 1);
            path.classList.add('area');
            if (rng > 2 || (x == qtd - 1 && c == 0)) {
                path.classList.add(cor);
                path.classList.add('preenchido');
                c++
            } else {
                path.classList.add('vazio');
            };

            path.setAttribute('d', `M${cx},${cy} \n
                L${cx + r * Math.cos((Math.PI * angulo / 180) * x)},${cy + r * Math.sin((Math.PI * angulo / 180) * x)} \n 
                A ${r},${r} 0,0,1 \n
                ${cx + r * Math.cos((Math.PI * angulo / 180) * (x + 1))},${cy + r * Math.sin((Math.PI * angulo / 180) * (x + 1))} \n
                L${cx},${cy}`);
            svg.appendChild(path);
        }

        f.prepend(svg);
    }
}

criarFracoes()

// <path d="M115,115 L115,5 A110,110 1 0,1 100,30 z"></path>