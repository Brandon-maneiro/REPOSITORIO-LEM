const vitralMainContainer = document.querySelector('#vitral-main-container');
const gridVitral = document.querySelector('.vitral-grid');

let mainWidth = parseInt(getComputedStyle(vitralMainContainer).getPropertyValue('width').split('').slice(0, -2).join(''));
let mainHeight = parseInt(getComputedStyle(vitralMainContainer).getPropertyValue('height').split('').slice(0, -2).join(''));

let linhas;
let colunas;

let vitralLado = 80

let cores = ['vermelho', 'verde', 'amarelo', 'azul', 'ciano', 'laranja', 'roxo', 'marrom'];

let vitralGrid = []

function createGrid() {
    linhas = getComputedStyle(gridVitral).getPropertyValue('--linhas');
    colunas = getComputedStyle(gridVitral).getPropertyValue('--colunas');
    let arr;
    for (let y = 0; y < colunas; y++) {
        arr = []
        for (let x = 0; x < linhas; x++) {
            let gridSlot = document.createElement('div');
            gridSlot.classList.add('grid-slot');
            gridVitral.appendChild(gridSlot);
            arr.push({});
        };
        vitralGrid.push(arr);
    }
};

let mouse = {
    x: 0,
    y: 0
};

// PEGA A POSIÇÃO DO MOUSE NA TELA
addEventListener('mousemove', (e) => {
    if (vitralMainContainer.matches(':hover')) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };
});

function createVitrals() {
    for (let y = 0; y < colunas; y++) {
        for (let x = 0; x < linhas; x++) {
            let vitralSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');        
            vitralSVG.classList.add('vitral');
    
            vitralSVG.style.setProperty('--largura', vitralLado + 'px');
            vitralSVG.style.setProperty('--altura', vitralLado + 'px');
            
            vitralSVG.style.setProperty('left', Math.floor(Math.random() * (mainWidth - vitralLado)) + 'px');
            vitralSVG.style.setProperty('top', Math.floor(Math.random() * (mainHeight - vitralLado)) + 'px');

            let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    
            rect.setAttribute('width', vitralLado + 'px');
            rect.setAttribute('height', vitralLado + 'px');
    
            let centro = vitralLado / 2;
    
            let paths = [`M${centro},${centro} L${0},${vitralLado}          L${0},${0}                   L${centro}, ${centro}`,
                         `M${centro},${centro} L${0},${0}                   L${vitralLado},${0}          L${centro}, ${centro}`,
                         `M${centro},${centro} L${vitralLado},${vitralLado} L${0},${vitralLado}          L${centro}, ${centro}`,
                         `M${centro},${centro} L${vitralLado},${0}          L${vitralLado},${vitralLado} L${centro}, ${centro}`]
    
            paths.forEach((p, i) => {
                let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', p);

                vitralGrid[y][x].svg = vitralSVG;
                
                let existe = false;
                if (vitralGrid[y][x - 1] && i == 0) {
                    vitralGrid[y][x].left = vitralGrid[y][x - 1].right;
                    path.classList.add(vitralGrid[y][x - 1].right)
                    existe = true;
                };
                if (vitralGrid[y - 1] && i == 1) {
                    vitralGrid[y][x].top = vitralGrid[y - 1][x].bottom;
                    path.classList.add(vitralGrid[y - 1][x].bottom);
                    existe = true;
                };
                if (!existe) {
                    let color = cores[Math.floor(Math.random() * cores.length)];

                    switch (i) {
                        case 0:
                            vitralGrid[y][x].left = color;
                        case 1:
                            vitralGrid[y][x].top = color;
                        case 2:
                            vitralGrid[y][x].bottom = color;
                        case 3:
                            vitralGrid[y][x].right = color;
                    }
                    
                    path.classList.add(color)
                }

                vitralSVG.appendChild(path);
            });
    
            vitralSVG.addEventListener('mousedown', () => mouseDownHandler(vitralSVG));
    
            vitralMainContainer.appendChild(vitralSVG);
        };
    }
};

function mouseDownHandler(svg, evt) {

    if (gridVitral.contains(svg)) {
        svg.style['position'] = 'absolute'
    }

    let mainContainerRect = vitralMainContainer.getBoundingClientRect();
    let rectSVG = svg.getBoundingClientRect();

    function mouseMoveHandler() {
        svg.style['left'] = mouse.x - mainContainerRect.left - (rectSVG.width / 2) +  'px';
        svg.style['top'] = mouse.y - mainContainerRect.top - (rectSVG.height / 2) + 'px';
    };

    addEventListener('mousemove', mouseMoveHandler);

    function mouseUpHandler() {

        let moveToGrid = false;
        for (const g of gridVitral.children) {
            let gridRect = g.getBoundingClientRect();

            if (mouse.x > gridRect.left && mouse.x < gridRect.right && mouse.y > gridRect.top && mouse.y < gridRect.bottom && (g.children.length == 0 || g.children[0] == svg)) {
                g.appendChild(svg);
                moveToGrid = true;
                svg.style['position'] = 'relative';
                svg.style['top'] = '';
                svg.style['left'] = '';
                break;
            };
        };

        if (!moveToGrid) {
            gridVitral.parentElement.appendChild(svg);
        }

        checkWin();

        removeEventListener('mousemove', mouseMoveHandler);
        removeEventListener('mouseup', mouseUpHandler);
    };

    addEventListener('mouseup', mouseUpHandler);
}

function checkWin() {
    let c = 0
    let win = true
    vitralGrid.forEach((col) => {
        col.forEach((vit) => {
            if (vit.svg != gridVitral.children[c].firstElementChild) {
                win = false
            };
            c++
        });
    });
    if (win) {
        alert('VENCEU')
    }
}

createGrid()
createVitrals()


