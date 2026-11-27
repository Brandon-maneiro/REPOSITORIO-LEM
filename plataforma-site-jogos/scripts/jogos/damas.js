const grid = document.getElementById('damas-grid');
const damasContainer = document.getElementById('damas-container')

const gridWidth = window.getComputedStyle(grid).getPropertyValue('grid-template-columns').split(' ').length
const gridHeight = window.getComputedStyle(grid).getPropertyValue('grid-template-rows').split(' ').length

// Criando a grid

let player = 'branca'

let c = 0
for (const y of Array.from(Array(gridWidth).keys())) {
    for (const x of Array.from(Array(gridHeight).keys())) {
        const tile = document.createElement('div');
        if (c % 2 == 0) {
            tile.classList.add('white');
        } else {
            tile.classList.add('black');
            if (y <= 2) {
                const dama = document.createElement('div');
                dama.classList.add('pedra', 'preta', "y-" + y, "x-" + x);
                tile.appendChild(dama);
            }
            else if (y >= 5) {
                const dama = document.createElement('div');
                dama.classList.add('pedra', 'branca', 'y-' + y, "x-" + x);
                tile.appendChild(dama);
            }
        }
        tile.classList.add('y-' + y, 'x-' + x);
        grid.appendChild(tile)
        c++
    }
    c++
}

damasContainer.querySelector('#rotacao').addEventListener('click', () => {
    grid.classList.toggle('rotate1')
    if (!grid.classList.contains('rotate1')) {
        grid.classList.toggle('rotate2')
    } else if (grid.classList.contains('rotate2')){
        grid.classList.toggle('rotate2')
    }
})

let selected = ''
let pedrasComidas = []

addEventListener('click', (e) => {
    if (e.target.classList.contains('move')) {
        e.target.appendChild(selected)
        if (e.target.classList[1] == 'y-0' && selected.classList[1] == 'branca'){
            selected.classList.add('dama')
        }
        if (e.target.classList[1] == 'y-7' && selected.classList[1] == 'preta'){
            selected.classList.add('dama')
        }
        selected.classList.replace(selected.classList[2], e.target.classList[1])
        selected.classList.replace(selected.classList[3], e.target.classList[2])

        for (const moved of grid.querySelectorAll('.move')) {
            moved.classList.remove('move');
        }

        pedrasComidas.forEach((i) => {
            if (i.tile == e.target) {
                let color = ''
                if (i.pedra.firstChild.classList[1] == 'preta'){
                    color = 'branca'
                } else {
                    color = 'preta'
                }

                i.pedra.innerHTML = ''

                pedrasComidas = []

                const posY = parseInt(selected.classList[2].split('')[2]);
                const posX = parseInt(selected.classList[3].split('')[2]);

                checkTopRight(color, posY, posX, true)
                checkTopLeft(color, posY, posX, true)
                checkBottomRight(color, posY, posX, true)
                checkBottomLeft(color, posY, posX, true)

                return
            }
        });        

        if (pedrasComidas.length > 0) {
            return
        } else {
            selected = ''
            if (player == 'branca') {
                player = 'preta'
                damasContainer.querySelector('#playerPretas').classList.toggle('jogando')
                damasContainer.querySelector('#playerBrancas').classList.toggle('jogando')
            } else {
                player = 'branca'
                damasContainer.querySelector('#playerPretas').classList.toggle('jogando')
                damasContainer.querySelector('#playerBrancas').classList.toggle('jogando')
            }
        }
    }
    if (e.target.classList[0] == 'pedra') {

        pedrasComidas = []

        for (const moved of grid.querySelectorAll('.move')) {
            moved.classList.remove('move');
        }

        selected = e.target;
        const posY = parseInt(selected.classList[2].split('')[2]);
        const posX = parseInt(selected.classList[3].split('')[2]);

        if (selected.classList[1] == 'branca' && player == 'branca') {
            checkTopLeft(selected.classList[1], posY, posX);
            checkTopRight(selected.classList[1], posY, posX);
            if (selected.classList.contains('dama')){
                checkBottomLeft(selected.classList[1], posY, posX);
                checkBottomRight(selected.classList[1], posY, posX);    
            } else {
                checkBottomLeft(selected.classList[1], posY, posX, true);
                checkBottomRight(selected.classList[1], posY, posX, true);
            }
            
        }
        else if (selected.classList[1] == 'preta' && player == 'preta') {
            checkBottomLeft(selected.classList[1], posY, posX);
            checkBottomRight(selected.classList[1], posY, posX);
            if (selected.classList.contains('dama')){
                checkTopLeft(selected.classList[1], posY, posX);
                checkTopRight(selected.classList[1], posY, posX);
            } else {
                checkTopLeft(selected.classList[1], posY, posX, true);
                checkTopRight(selected.classList[1], posY, posX, true);
            }            
        }

        let cancelarMove = []
        let naoCancela = []        
        pedrasComidas.forEach((i) => {
            for (const move of grid.querySelectorAll('.move')) {
                if (i.tile != move && !cancelarMove.includes(move)) {
                    cancelarMove.push(move)
                }
                else if (i.tile == move) {
                    naoCancela.push(move)
                }
            }
        })

        for (const move of cancelarMove){
            if (!naoCancela.includes(move)){
                move.classList.remove('move')
            }
        }
    }
})

function checkTopRight(color, posY, posX, eat = false) {
    const topRight = grid.querySelector(".y-" + (posY - 1) + ".x-" + (posX + 1))
    if (topRight) {
        if (!topRight.querySelector('div')) {
            if (!eat) {
                topRight.classList.add('move');
            }
        } else if (topRight.querySelector('div').classList[1] != color &&
            grid.querySelector(".y-" + (posY - 2) + ".x-" + (posX + 2)) &&
            !grid.querySelector(".y-" + (posY - 2) + ".x-" + (posX + 2)).querySelector('div')) {

            pedrasComidas.push({ tile: grid.querySelector(".y-" + (posY - 2) + ".x-" + (posX + 2)), pedra: topRight })
            grid.querySelector(".y-" + (posY - 2) + ".x-" + (posX + 2)).classList.add('move')
        }
    }
}


function checkTopLeft(color, posY, posX, eat = false) {
    const topLeft = grid.querySelector(".y-" + (posY - 1) + ".x-" + (posX - 1));
    if (topLeft) {
        if (!topLeft.querySelector('div')) {
            if (!eat) {
                topLeft.classList.add('move');
            }
        } else if (topLeft.querySelector('div').classList[1] != color &&
            grid.querySelector(".y-" + (posY - 2) + ".x-" + (posX - 2)) &&
            !grid.querySelector(".y-" + (posY - 2) + ".x-" + (posX - 2)).querySelector('div')) {

            pedrasComidas.push({ tile: grid.querySelector(".y-" + (posY - 2) + ".x-" + (posX - 2)), pedra: topLeft })
            grid.querySelector(".y-" + (posY - 2) + ".x-" + (posX - 2)).classList.add('move')
        }
    }
}

function checkBottomLeft(color, posY, posX, eat = false) {
    const bottomLeft = grid.querySelector(".y-" + (posY + 1) + ".x-" + (posX - 1));
    if (bottomLeft) {
        if (!bottomLeft.querySelector('div')) {
            if (!eat) {
                bottomLeft.classList.add('move');
            }
        } else if (bottomLeft.querySelector('div').classList[1] != color &&
            grid.querySelector(".y-" + (posY + 2) + ".x-" + (posX - 2)) &&
            !grid.querySelector(".y-" + (posY + 2) + ".x-" + (posX - 2)).querySelector('div')) {

            pedrasComidas.push({ tile: grid.querySelector(".y-" + (posY + 2) + ".x-" + (posX - 2)), pedra: bottomLeft })
            grid.querySelector(".y-" + (posY + 2) + ".x-" + (posX - 2)).classList.add('move')
        }
    }
}

function checkBottomRight(color, posY, posX, eat = false) {
    const bottomRight = grid.querySelector(".y-" + (posY + 1) + ".x-" + (posX + 1))
    if (bottomRight) {
        if (!bottomRight.querySelector('div')) {
            if (!eat) {
                bottomRight.classList.add('move');
            }
        } else if (bottomRight.querySelector('div').classList[1] != color &&
            grid.querySelector(".y-" + (posY + 2) + ".x-" + (posX + 2)) &&
            !grid.querySelector(".y-" + (posY + 2) + ".x-" + (posX + 2)).querySelector('div')) {

            pedrasComidas.push({ tile: grid.querySelector(".y-" + (posY + 2) + ".x-" + (posX + 2)), pedra: bottomRight })
            grid.querySelector(".y-" + (posY + 2) + ".x-" + (posX + 2)).classList.add('move')
        }
    }
}

function checkDamaTopRight(color, posY, posX) {

}

function checkDamaTopLeft(color, posY, posX) {

}

function checkDamaBottomLeft(color, posY, posX) {

}

function checkDamaBottomRight(color, posY, posX) {

}