const luzesContainer = document.querySelector('#luzes-container');

const linhasInput = document.querySelector('#linhas-input');
const linhasText = document.querySelector('.linhasText');
const colunasInput = document.querySelector('#colunas-input');
const colunasText = document.querySelector('.colunasText');

const movimentosText = document.querySelector('.movimentosText');

const vitoriaContainer = document.querySelector('#vitoria');
const fecharVitoriaContainer = document.querySelector('#fechar-vitoria');

const recomecarInput = document.querySelector('.recomecar-input');
const novoJogoInput = document.querySelector('.novo-jogo-input');

let linhas = 3;
let colunas = 3;

let luzesGrid = [];
let backupGrid = [];

linhasInput.oninput = () => {
    linhasText.innerHTML = linhasInput.value;
    linhas = parseInt(linhasInput.value);
}

colunasInput.oninput = () => {
    colunasText.innerHTML = colunasInput.value;
    colunas = parseInt(colunasInput.value);
}

novoJogoInput.addEventListener('click', () => {
    createGrid();
})

recomecarInput.addEventListener('click', () => {
    movimentosText.innerHTML = '0';
    let c = 0
    for (const y of luzesGrid) {        
        for (const x of y) {
            x.classList = backupGrid[c];
            c++
        }
    }
})

fecharVitoriaContainer.addEventListener('click', () => {
    vitoriaContainer.style['visibility'] = 'hidden';
})

function createGrid() {
    luzesGrid = [];
    backupGrid = [];
    luzesContainer.innerHTML = '';
    luzesContainer.style.setProperty('--colunas', colunas)
    luzesContainer.style.setProperty('--linhas', linhas);
    movimentosText.innerHTML = '0';
    for (let y = 0; y < linhas; y++) {
        let arr = []
        for (let x = 0; x < colunas; x++) {
            let div = document.createElement('div');
            div.classList.add('bloco');
            
            let rng = Math.floor(Math.random() * 10)
            if (rng > 5) {
                div.classList.add('aceso')
            }

            backupGrid.push(div.classList.value)

            div.addEventListener('click', () => {checkClick(x, y)});
    
            luzesContainer.appendChild(div);
            arr.push(div);
        }
        luzesGrid.push(arr);
    };
};

function checkClick(x, y) {
    movimentosText.innerHTML = parseInt(movimentosText.innerHTML) + 1;
    let checagem = [[0, -1], [1, 0], [0, 1], [-1, 0]];

    luzesGrid[y][x].classList.toggle('aceso');

    for (const [posA, posB] of checagem) {
        if (luzesGrid[y + posB] && luzesGrid[y + posB][x + posA]) {
            luzesGrid[y + posB] && luzesGrid[y + posB][x + posA].classList.toggle('aceso');
        };
    };

    checkWin();
};

function checkWin() {
    let acesos = document.querySelectorAll('.aceso');
    if (acesos.length == 0) {
        vitoriaContainer.style['visibility'] = 'visible'
    };
}

createGrid();