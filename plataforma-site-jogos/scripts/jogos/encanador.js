const gameGrid = document.querySelector('.game-grid');

let linhas = 5;
let colunas = 5;

const direcoes = ['baixo', 'esquerda', 'cima', 'direita'];

let imagesCanos = {1: '../../imagens/icones/canos/cano.png', 2: '../../imagens/icones/canos/.png'}

let grid = [];

for (let y = 0; y < linhas; y++) {
    grid.push([]);
    for (let x = 0; x < colunas; x++) {
        grid[y].push({tipo: 'cano'});
    };
};

for (let x = 0; x < Math.floor(Math.random() * 8 + 2); x++) {
    let rngX = Math.floor(Math.random() * colunas);
    let rngY = Math.floor(Math.random() * linhas);
    grid[rngY][rngX] = {tipo: 'vazio'}
};

for (let x = 0; x < 4; x++) {
    let rngX = Math.floor(Math.random() * colunas);
    let rngY = Math.floor(Math.random() * linhas);
    let rngDir = Math.floor(Math.random() * 4);

    grid[rngY][rngX] = {tipo: 'valvula', direcao: direcoes[rngDir]}
};

grid.forEach((y, indexY) => {
    y.forEach((x, indexX) => {
        let div = document.createElement('div');
        div.classList.add('bloco')
        let imgCano = document.createElement('img');
        imgCano.classList.add('rotate');

        let lados = 0;
        if (x.tipo == 'vazio') {

        } else {
            if (x.tipo == 'valvula') {
                imgCano.src = '../../imagens/icones/canos/valvula.png';
            } else {
                if (grid[indexY - 1] && grid[indexY - 1][indexX] && grid[indexY - 1][indexX].tipo != "vazio") {
                    lados++;
                };
                if (grid[indexY][indexX + 1] && grid[indexY][indexX + 1].tipo != "vazio") {
                    lados++;
                };
                if (grid[indexY + 1] && grid[indexY + 1][indexX] && grid[indexY + 1][indexX].tipo != "vazio") {
                    lados++;
                };
                if (grid[indexY][indexX - 1] && grid[indexY][indexX - 1].tipo != "vazio") {
                    lados++;
                };
                if (lados == 0) {
                    imgCano.src = "../../imagens/icones/canos/cano_1.png";
                } else {
                    imgCano.src = "../../imagens/icones/canos/cano_" + lados + ".png";
                }                 
            };
            
            div.appendChild(imgCano);
            div.addEventListener('click', () => {rotatePeca(imgCano)});            
        }
        gameGrid.appendChild(div);
    })
})

function rotatePeca(img) {
    let imgComponent = window.getComputedStyle(img);
    let deg = imgComponent.getPropertyValue('--rotation');
    let degArray = deg.split('');
    degArray.splice(degArray.length - 3, 3);
    let rotation = parseInt(degArray.join('')) + 90;
    img.style.setProperty('--rotation', rotation + 'deg');
    
};