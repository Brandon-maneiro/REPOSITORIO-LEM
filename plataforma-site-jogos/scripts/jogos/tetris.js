const canvas = document.getElementById('tetris-canvas');
const ctx = canvas.getContext('2d');

canvas.height = 400;
canvas.width = 200;

const proximoSlot = document.getElementById('proximo-container').getElementsByClassName('slot')[0];
const proximoLongSlot = document.getElementById('proximo-container').getElementsByClassName('long-slot')[0];
const holdSlot = document.getElementById('segurar-container').getElementsByClassName('slot')[0];
const pontosDiv = document.getElementById('pontos');
const jogarNovamente = document.getElementById('jogar-novamente');
const fimContainer = document.getElementById('fim-container');

class Player {
    constructor(game) {

        this.game = game;
        this.key = null;
        this.hold = '';
        this.canChange = true;
        this.next = [];
        this.pieceColor = '';
        this.positions = [];
        this.initialPosition = [0, 4];
        this.moveSpeed = 8;
        this.moveSpeedTick = 8;
        this.collided = false;
        this.alive = true;
        this.isPaused = false;

        this.controls = {
            'arrowright': this.moveRight,
            'arrowleft': this.moveLeft,
            'arrowup': this.rotate,
            'c': this.switchHold,
        }

        addEventListener('keydown', (e) => {
            let key = e.key.toLocaleLowerCase();


            if (key === 'arrowup') {
                if (!this.isPaused && this.alive) {
                    this.rotate();
                }
                e.preventDefault(); 
                return;
            }

            this.key = key;

            if (this.key in this.controls || this.key == 'arrowdown') {
                e.preventDefault();
            }
            
            if (e.key == 'p') {
                this.pause();
            }
        })

        addEventListener('keyup', (e) => {
            this.key = null
        })
    }

    update() {

        if (!this.isPaused) {

            this.collided = false;

            if (this.moveSpeed == this.moveSpeedTick) {
                if (this.key in this.controls) {
                    if (this.key == 'c' && this.canChange) {
                        this.controls[this.key].call(this)
                    } else if (this.key != 'c') {
                        this.controls[this.key].call(this)
                    }
                    this.moveSpeed = 0

                } else if (this.key == 'arrowdown') {
                    this.game.speed += 5
                }

            } else {
                this.moveSpeed++
            }

            if (this.game.speed >= this.game.tickSpeed) {
                this.moveDown()
                if (this.collided) {
                    this.changeToNextPiece()
                    this.canChange = true
                }
            }
        }
    }

    unDraw() {
        for (const piece of this.positions) {
            if (piece != '') this.game.grid[piece[0]][piece[1]] = '';
        }
    }

    draw() {
        for (const piece of this.positions) {
            if (piece != '') this.game.grid[piece[0]][piece[1]] = this.pieceColor;
        }
    }

    rotate() {
        if (this.pieceColor != 'y' && this.pieceColor != 'c') {
            this.unDraw()
            const pattern = [
                [0, 2], [1, 1], [2, 0],
                [-1, 1], [0, 0], [1, -1],
                [-2, 0], [-1, -1], [0, -2],
            ]

            let testArray = []
            let canRotate = true
            this.positions.forEach((item, index) => {
                let testItem = [...item]
                if (testItem != '') {
                    testItem[0] += pattern[index][0]
                    testItem[1] += pattern[index][1]
                    if (this.game.grid[testItem[0]] == undefined || this.game.grid[testItem[0]][testItem[1]] == undefined || this.game.grid[testItem[0]][testItem[1]] != '') {
                        canRotate = false
                        return
                    }
                }
                testArray.push(testItem)
            })

            if (canRotate) {
                this.positions = testArray
                this.positions = [
                    this.positions[6], this.positions[3], this.positions[0],
                    this.positions[7], this.positions[4], this.positions[1],
                    this.positions[8], this.positions[5], this.positions[2],
                ]
            }
        } else if (this.pieceColor == 'c') {
            this.unDraw()
            const pattern = [
                [0, 3], [1, 2], [2, 1], [3, 0],
                [-1, 2], [0, 1], [1, 0], [2, -1],
                [-2, 1], [-1, 0], [0, -1], [1, -2],
                [-3, 0], [-2, -1], [-1, -2], [0, -3],
            ]

            let testArray = []
            let canRotate = true
            this.positions.forEach((item, index) => {
                let testItem = [...item]
                if (testItem != '') {
                    testItem[0] += pattern[index][0]
                    testItem[1] += pattern[index][1]
                    if (this.game.grid[testItem[0]] == undefined || this.game.grid[testItem[0]][testItem[1]] == undefined || this.game.grid[testItem[0]][testItem[1]] != '') {
                        canRotate = false
                        return
                    }
                }
                testArray.push(testItem)
            })

            if (canRotate) {
                this.positions = testArray
                this.positions = [
                    this.positions[12], this.positions[8], this.positions[4], this.positions[0],
                    this.positions[13], this.positions[9], this.positions[5], this.positions[1],
                    this.positions[14], this.positions[10], this.positions[6], this.positions[2],
                    this.positions[15], this.positions[11], this.positions[7], this.positions[3],
                ]
            }
        }
    }

    moveRight() {
        let canMove = false
        for (const pos of this.positions) {
            if (pos != '') {
                let testPos = [pos[0], pos[1] + 1]
                if (this.game.grid[pos[0]][pos[1] + 1] != undefined && this.game.grid[pos[0]][pos[1] + 1] == '') {
                    canMove = true
                } else if (!JSON.stringify(this.positions).includes(testPos)) {
                    canMove = false
                    return
                }
            }
        }
        if (canMove) {
            this.unDraw()
            this.positions.forEach(item => { if (item != '') item[1]++ })
        }
    }

    moveDown() {
        let canMove = false
        for (const piece of this.positions) {
            if (piece != '') {
                if (this.game.grid[piece[0] + 1] && this.game.grid[piece[0] + 1][piece[1]] == '') {
                    canMove = true
                } else if (!JSON.stringify(this.positions).includes([piece[0] + 1, piece[1]])) {
                    this.collided = true
                    canMove = false
                    return
                }
            }

        }
        if (canMove) {
            this.unDraw()
            for (const piece of this.positions) {
                if (piece != '') piece[0] += 1;
            }
        }
    }

    moveLeft() {
        let canMove = false
        for (const pos of this.positions) {
            if (pos != '') {
                let testPos = [pos[0], pos[1] - 1]
                if (this.game.grid[pos[0]][pos[1] - 1] != undefined && this.game.grid[pos[0]][pos[1] - 1] == '') {
                    canMove = true
                } else if (!JSON.stringify(this.positions).includes(testPos)) {
                    canMove = false
                    return
                }
            }
        }
        if (canMove) {
            this.unDraw()
            this.positions.forEach(item => { if (item != '') item[1]-- })
        }
    }

    switchHold() {
        const div1 = document.createElement('div');
        div1.classList.add(this.pieceColor + '1', 'piece');
        const div2 = document.createElement('div');
        div2.classList.add(this.pieceColor + '2', 'piece');

        const pieceContainer = document.createElement('div');
        pieceContainer.classList.add('piece-container')
        pieceContainer.append(div1, div2)

        holdSlot.innerHTML = ''
        holdSlot.append(pieceContainer)

        this.unDraw()
        if (this.hold == '') {
            this.hold = this.pieceColor
            this.changeToNextPiece()
        } else {
            let oldColor = this.hold
            this.hold = this.pieceColor
            this.changePiece(this.game.tetris.formats[this.game.tetris.colorToFormat[oldColor]])
        }

        this.canChange = false
    }

    pause() {
        if (this.isPaused) {
            this.isPaused = false
        } else {
            this.isPaused = true
        }
    }

    addPiece(piece) {
        if (this.positions.length == 0) {
            this.changePiece(piece)
        } else {
            let color = ''
            for (const row of piece) {
                for (const item of row) {
                    if (item != '') {
                        color = item
                        break
                    }
                }
            }

            const div1 = document.createElement('div');
            div1.classList.add(color + '1', 'piece');
            const div2 = document.createElement('div');
            div2.classList.add(color + '2', 'piece');

            const pieceContainer = document.createElement('div');
            pieceContainer.classList.add('piece-container')
            pieceContainer.append(div1, div2)

            if (this.next.length == 0) {
                proximoSlot.append(pieceContainer)
            } else {
                proximoLongSlot.append(pieceContainer)
            }

            this.next.push(piece)
        }
    }

    changeToNextPiece() {
        this.changePiece(this.next[0])
        proximoSlot.innerHTML = ''
        proximoSlot.append(proximoLongSlot.children[0])
        this.next.shift()
        this.addPiece(this.game.tetris.getRandomFormat())
    }

    changePiece(p) {
        this.game.checkScore()
        this.positions = []
        const piece = p
        let canCreate = true
        piece.forEach((row, indexY) => {
            row.forEach((item, indexX) => {
                if (item != '') {
                    if (this.game.grid[this.initialPosition[0] + indexY][this.initialPosition[1] + indexX] != '') {
                        canCreate = false
                        return
                    }
                    this.pieceColor = item
                    this.positions.push([this.initialPosition[0] + indexY, this.initialPosition[1] + indexX])
                } else {
                    this.positions.push('')
                }
            })
        })
        if (!canCreate) {
            this.alive = false
            this.game.saveScore();
            fimContainer.querySelector('#pontos').innerText = this.game.pontos;
            fimContainer.style['display'] = 'flex';
        }
    }
}

class Tetris {
    constructor() {
        this.colors = {
            y: 'yellow',
            o: 'orange',
            g: 'green',
            p: 'purple',
            r: 'red',
            b: 'blue',
            c: 'cyan'
        }

        this.colorToFormat = {
            y: 'o',
            o: 'l',
            g: 's',
            p: 't',
            r: 'z',
            b: 'j',
            c: 'i'
        }

        this.formats = {
            l: [['', 'o', ''],
            ['', 'o', ''],
            ['', 'o', 'o']],

            j: [['', 'b', ''],
            ['', 'b', ''],
            ['b', 'b', '']],

            t: [['', '', ''],
            ['', 'p', ''],
            ['p', 'p', 'p']],

            i: [['', 'c', '', ''],
            ['', 'c', '', ''],
            ['', 'c', '', ''],
            ['', 'c', '', '']],

            z: [['', '', ''],
            ['r', 'r', ''],
            ['', 'r', 'r']],

            s: [['', '', ''],
            ['', 'g', 'g'],
            ['g', 'g', '']],

            o: [['y', 'y'],
            ['y', 'y']],

        }
    }
    getRandomFormat() {
        const keys = Object.keys(this.formats);
        return this.formats[keys[Math.floor(Math.random() * keys.length)]]
    }
}

class Game {
    constructor() {
        this.player = new Player(this)
        this.tetris = new Tetris()

        this.grid;

        this.tileHeight = 20
        this.tileWidth = 20
        this.gridColumns = 10
        this.gridRows = 20

        this.speed = 0
        this.tickSpeed = 90
        this.pontos = 0;
        this.totalLinhas = 0;
        this.nivel = 1;

        jogarNovamente.addEventListener('click', () => {
            this.createGrid();
            proximoLongSlot.innerText = '';
            proximoSlot.innerText = '';
            holdSlot.innerText = '';
            this.pontos = 0;
            pontosDiv.innerText = 0;
            this.nivel = 1;
            this.totalLinhas = 0;
            this.tickSpeed = 90;

            this.player = new Player(this);
            fimContainer.style['display'] = 'none'
            for (let x = 0; x < 5; x++) {
                this.player.addPiece(this.tetris.getRandomFormat());
            }
        })

        this.createGrid();

        for (let x = 0; x < 5; x++) {
            this.player.addPiece(this.tetris.getRandomFormat())
        }
    }

    createGrid() {
        let grid = []
        for (let y = 0; y < this.gridRows; y++) {
            let column = []
            for (let x = 0; x < this.gridColumns; x++) {
                column.push('')
            }
            grid.push(column)
        }
        this.grid = grid
    }

    checkScore() {
    let deletions = []
    this.grid.forEach((row, indexY) => {
        let check = 0
        row.forEach((item, indexX) => {
            if (item != '') {
                check++
            }
            if (check == row.length) {
                deletions.push(indexY)
            }
        })
    })

    if (deletions.length > 0) {
        this.pontos = this.pontos + (deletions.length * 100) + ((deletions.length * 100) - 100);
        pontosDiv.innerText = this.pontos;

        this.totalLinhas += deletions.length;
        const novoNivel = Math.floor(this.totalLinhas / 10) + 1;

        if (novoNivel > this.nivel) {
            this.nivel = novoNivel;
            this.tickSpeed = Math.max(2, 90 - (this.nivel * 11));
        }
    }

    deletions.forEach(item => {
        this.grid.splice(item, 1);
        this.grid.unshift(Array(10).fill(''))
    })
}

    saveScore() {
        const data = {
            jogo: 'tetris',
            pontuacao: this.pontos,
        }
        fetch('/inserirPontuacaoSimples', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    draw() {
        ctx.lineWidth = 1
        ctx.strokeStyle = "#2f2f2f"

        if (this.player.alive) this.player.draw();

        this.grid.forEach((column, indexY) => {
            column.forEach((item, indexX) => {
                if (item != '') {
                    ctx.beginPath()
                    ctx.fillStyle = this.tetris.colors[item]
                    ctx.fillRect(indexX * this.tileWidth, indexY * this.tileHeight, this.tileWidth, this.tileHeight)
                }
                ctx.beginPath()
                ctx.lineTo(indexX * this.tileWidth + this.tileWidth, 0)
                ctx.lineTo(indexX * this.tileWidth + this.tileWidth, canvas.height)
                ctx.stroke()
            })
            ctx.beginPath()
            ctx.lineTo(0, indexY * this.tileHeight)
            ctx.lineTo(canvas.width, indexY * this.tileHeight)
            ctx.stroke()
        })
    }

    update() {
        if (this.player.alive) {
            this.player.update();
        };

        if (this.speed >= this.tickSpeed) {
            this.speed = 0
        } else {
            this.speed++
        };
    }
}

const game = new Game();

function run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update()
    game.draw(ctx)
    requestAnimationFrame(run)
}

run()