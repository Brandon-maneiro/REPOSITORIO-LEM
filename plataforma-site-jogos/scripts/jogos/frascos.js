const frascos = document.getElementsByClassName('frasco');

const mais = document.querySelector('.mais');
const menos = document.querySelector('.menos');
const nivelAtual = document.querySelector('.atual');
const iniciarBtn = document.querySelector('.iniciar');
const continuarBtn = document.querySelector('.continuar-button');
const recomecarBtn = document.querySelector('.recomecar-button');
const vitoriaContainer = document.querySelector('.vitoria-container');
const botaoFecharParabenizacao = document.querySelector('.botao-fechar-parabenizacao');

nivelAtual.innerText = frascos.length;

const cores = ['vermelho', 'amarelo', 'lima', 'ciano', 'azul', 'roxo', 'rosa', 'laranja', 'verde'];

mais.addEventListener('click', () => {
    if (nivelAtual.innerText < cores.length + 2) nivelAtual.innerText++;
})

menos.addEventListener('click', () => {
    if (nivelAtual.innerText > 5) nivelAtual.innerText--;    
})

continuarBtn.addEventListener('click', () => {    
    if (nivelAtual.innerText < cores.length + 2) {
        nivelAtual.innerText++;
        vitoriaContainer.close();
        zerarFrascos();
        gerarFrascos();
    };
    
})

botaoFecharParabenizacao.addEventListener('click', () => {
    vitoriaContainer.close();
});

recomecarBtn.addEventListener('click', () => {
    vitoriaContainer.close();
    zerarFrascos();
    gerarFrascos();
})


// CRIAR AS BOLAS E ADICIONA OS EVENTOS
function gerarFrascos() {
    let bolas = [];
    let coresCopia = [...cores];
    for (let f = 0; f < frascos.length - 2; f++) {
        let rng = Math.floor(Math.random() * coresCopia.length)
        for (let x = 0; x < 4; x++) {
            let bola = document.createElement('div');
            bola.classList.add('bola', coresCopia[rng])
            bolas.push(bola)
        }
        coresCopia.splice(rng, 1);
    };
    shuffleArray(bolas);

    for (let f = 0; f < frascos.length - 2; f++) {
        for (let x = 0; x < 4; x++) {
            frascos[f].appendChild(bolas[x + (f*4)]);
        };
    };

    for (const frasco of frascos) {
        frasco.addEventListener('click', () => {
            main(frasco)
        })
    }
};

function zerarFrascos() {
    let parent = frascos[0].parentElement;
    while (frascos[0]) {
        parent.removeChild(frascos[0]);
    };
    for (let x = 0; x < nivelAtual.innerText; x++) {
        let frasco = document.createElement('div');
        frasco.classList.add('frasco');
        parent.appendChild(frasco);
    }
}

// REINICIA O JOGO AO CLICAR EM INICAR
iniciarBtn.addEventListener('click', () => {
    zerarFrascos();
    gerarFrascos();
})

// FUNÇÃO PARA ALEATORIZAR ARRAY
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

gerarFrascos()

function checkWin() {
    let win = true;
    for (const f of frascos) {
        if (f.firstElementChild) {
            if (f.querySelectorAll('.' + f.firstElementChild.classList[1]).length != 4) {
                win = false;
                break;
            }
        }        
    }
    if (win) {
         vitoriaContainer.showModal();
    }
    return
}

function main(f) {
    const selecionado = document.querySelector('.selecionado');
    if (selecionado) {
        if (f.firstElementChild == null) {
            f.appendChild(selecionado);
            checkWin();
        } else if (f.firstElementChild.classList[1] == selecionado.classList[1] && f.firstElementChild != selecionado && f.children.length < 4) {
            f.insertBefore(selecionado, f.children[0]);
            checkWin();
        }
        selecionado.classList.toggle('selecionado');
    } else if (f.firstElementChild) {        
        f.firstElementChild.classList.toggle('selecionado');
    }
}