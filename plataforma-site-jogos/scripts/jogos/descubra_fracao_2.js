const fracoesContainer = document.querySelectorAll('.fracao-container');
const vitoriaContainer = document.querySelector('.vitoria-container');
const setasContainer = document.querySelectorAll('.setas-container')

const prontoBtn = document.querySelector('.finalizar');
const lixoBtn = document.querySelector('.lixo');
const resetBtn = document.querySelector('.reset');
const resetParabenizacaoBtn = document.querySelector('.reset-parabenizacao');
const fecharParabenizacaoBtn = document.querySelector('.botao-fechar-parabenizacao');

let cores = ['azul', 'roxo', 'rosa', 'amarelo', 'laranja'];

let circulos = []

let cx = 110; // Centro X
let cy = 110; // Centro Y
let r = 100; // Raio

lixoBtn.addEventListener('click', () => resetarLadosCirculos());
prontoBtn.addEventListener('click', () => checarRespostas());
fecharParabenizacaoBtn.addEventListener('click', () => { vitoriaContainer.close(); });

resetBtn.addEventListener('click', () => {
    resetarInputs();
    circulos = []
    for (const f of fracoesContainer) {
        f.removeChild(f.firstElementChild);
    }
    criarFracoes();
    criarNumerosNasFracoes();
    vitoriaContainer.close();
})

function addEventosModificarCirculos() {
    setasContainer.forEach((container, i) => {
        const setaCima = container.querySelector('.triangulo_cima');
        const setaBaixo = container.querySelector('.triangulo_baixo');

        setaCima.addEventListener('click', () => {
            modificarLadosCirculoCustomizavel('aumentar', circulos[i]);
        })

        setaBaixo.addEventListener('click', () => {
            modificarLadosCirculoCustomizavel('diminuir', circulos[i]);
        })
    })
}

function resetarCirculos() {
    
    for (const f of fracoesContainer) {
        f.removeChild(f.firstElementChild);
    }

    criarFracoes();
}

resetParabenizacaoBtn.addEventListener('click', () => {
   
    resetarInputs();
    circulos = []
    for (const f of fracoesContainer) {
        f.removeChild(f.firstElementChild);
    }
    criarFracoes();
    criarNumerosNasFracoes();
    vitoriaContainer.close();
    
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

function modificarLadosCirculoCustomizavel(op, cir) {
    operacoes = { 'aumentar': 1, 'diminuir': -1 }

    cir.lados += operacoes[op]
    if (cir.lados < 2) {
        cir.lados++
    }

    cir.div.querySelector('.quantidade-container').innerHTML = cir.lados;

    let qtd = cir.lados;
    let angulo = 360 / qtd;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");

    const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);

    svg.appendChild(circle);

    for (let x = 0; x < qtd; x++) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');

        path.classList.add('area');
        path.classList.add('vazio');
        path.classList.add('podePintar');

        pintar(path, cir.cor)

        path.setAttribute('d', `M${cx},${cy} \n
        L${cx + r * Math.cos((Math.PI * angulo / 180) * x)},${cy + r * Math.sin((Math.PI * angulo / 180) * x)} \n 
        A ${r},${r} 0,0,1 \n
        ${cx + r * Math.cos((Math.PI * angulo / 180) * (x + 1))},${cy + r * Math.sin((Math.PI * angulo / 180) * (x + 1))} \n
        L${cx},${cy}`);

        svg.appendChild(path)
    }
    cir.div.firstElementChild.replaceWith(svg);
};

function resetarInputs() {
    for (const f of fracoesContainer) {
        let numerador = f.querySelector('.numerador');
        let denominador = f.querySelector('.denominador');
        numerador.classList.remove('certo', 'errado');
        denominador.classList.remove('certo', 'errado');
    };
}

function pintar(lado, cor) {
    lado.addEventListener('click', () => {
        lado.classList.toggle('preenchido');
        lado.classList.toggle('vazio');
        lado.classList.toggle(cor);
    })
}

// Reseta lados dos círculos
function resetarLadosCirculos() {
    for (const f of fracoesContainer) {
        const svg = f.querySelector('svg');
        if (!svg) continue;

        // Guarda os paths para não mecher no original enquanto itera
        const paths = Array.from(svg.querySelectorAll('path'));

        for (const p of paths) {
            const tinhaPintavel = p.classList.contains('podePintar');
            const novo = p.cloneNode(false);
            novo.className.baseVal = 'area vazio' + (tinhaPintavel ? ' podePintar' : '');
            svg.replaceChild(novo, p);
            
            if (tinhaPintavel) {
                // encontra o objeto circulo correspondente a este container
                const cir = circulos.find(c => c.div === f);
                const cor = cir ? cir.cor : cores[0];
                pintar(novo, cor);
            }
        }
    }
}

function criarFracoes() {
    for (const f of fracoesContainer) {

        let cor = cores[Math.floor(Math.random() * cores.length)];

        let qtd = Math.floor(Math.random() * 8 + 2);
        f.querySelector('.quantidade-container').innerHTML = qtd;

        let angulo = 360 / qtd;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");

        const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);

        svg.appendChild(circle);

        let c = 0
        circulos.push({
            lados: qtd,
            cor: cor,
            div: f
        })
        for (let x = 0; x < qtd; x++) {
            const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            path.classList.add('area');

            let rng = Math.floor(Math.random() * 6 + 1);
            if (f.classList.contains('pintado') && (rng > 4 || (x == qtd - 1 && c == 0))) {
                path.classList.add(cor);
                path.classList.add('preenchido');
                c++
            } else {
                path.classList.add('vazio');
            };
            if (f.classList.contains('pintavel')) {
                path.classList.add('podePintar');
                pintar(path, cor)
                              
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

function criarNumerosNasFracoes() {
    for (const f of fracoesContainer) {

        let numerador = f.querySelector('.numerador');
        let denominador = f.querySelector('.denominador');

        let numeradorValue = Math.floor(Math.random() * 15 + 1)
        let denominadorValue = Math.floor(Math.random() * 20 + 1)

        while (denominadorValue < numeradorValue) {
            numeradorValue = Math.floor(Math.random() * 15 + 1)
        }

        numerador.value = numeradorValue;
        denominador.value = denominadorValue;

    }
}

criarFracoes()
criarNumerosNasFracoes()
addEventosModificarCirculos()

// <path d="M115,115 L115,5 A110,110 1 0,1 100,30 z"></path>
