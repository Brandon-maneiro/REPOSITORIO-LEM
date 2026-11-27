const canvas = document.getElementById('brickBreakCanvas');
const ctx = canvas.getContext('2d');

const topoDiv = document.getElementById('topo');
const pontos = document.getElementById('pontos');
const nivel = document.getElementById('nivel');
const vidas = document.getElementById('vidas');
const brickContainer = document.getElementById('brickbreak-container');

const hitSoundEffect = new Audio('../sounds/wup.wav')
const breakSoundEffect = new Audio('../sounds/piu.wav')
const loseSoundEffect = new Audio('../sounds/fall.wav')

hitSoundEffect.volume = 0.3;
breakSoundEffect.volume = 0.3;
loseSoundEffect.volume = 0.1;

canvas.width = 610;
canvas.height = 420;

topoDiv.style.width = canvas.getBoundingClientRect().width + "px";

addEventListener('resize', () => {
    topoDiv.style.width = canvas.getBoundingClientRect().width + "px";
})

class Bricks {
    constructor(game) {
        this.game = game;
        this.width = 80;
        this.height = 23;
        this.bricks = [];
        this.colors = ['#50fa25', '#298dff', '#7931ff', '#f831ff', 'red', 'orange', 'yellow'];
        this.camadas = this.colors.length;
    }
    createBricks(camadas = this.camadas) {
        this.bricks = [];
        for (let y = 0; y < camadas; y++) {
            let row = [];
            for (let x = 0; x < (this.game.width - 50) / this.width; x++) {
                row.push({ width: this.width, height: this.height, x: x * this.width + 20, y: y * this.height + 20 });
            }
            this.bricks.push(row);
        }
    }
    draw(ctx) {
        this.bricks.forEach((row, index) => {
            row.forEach((brick) => {
                ctx.beginPath();
                ctx.fillStyle = this.colors[index];
                ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
                ctx.beginPath();
                ctx.fillStyle = 'black';
                ctx.rect(brick.x, brick.y, brick.width, brick.height);
                ctx.lineWidth = 2;
                ctx.stroke();
            })
        })
    }
}


class Ball {
    constructor(game) {
        this.game = game;
        this.width = 20;
        this.height = 20;
        this.x = (this.game.width / 2) - (this.width / 2) + (Math.floor(Math.random() * 100) + Math.floor(Math.random() * -100));
        this.y = this.game.height - this.game.player.height - 50 + (Math.floor(Math.random() * 10) + Math.floor(Math.random() * -10));
        this.speed = { x: 0, y: 0 };
    }
    resetPos() {
        this.speed.y = 0;
        this.speed.x = 0;
        this.x = (this.game.width / 2) - (this.width / 2) + (Math.floor(Math.random() * 100) + Math.floor(Math.random() * -100));
        this.y = this.game.height - this.game.player.height - 50 + (Math.floor(Math.random() * 10) + Math.floor(Math.random() * -10));
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.roundRect(this.x, this.y, this.width, this.height, [50]);
        ctx.fill();
    }
    update() {
        if (this.game.player.lives > 0) {
            this.x += this.speed.x;
            this.checkCollisions('x');
            this.y += this.speed.y;
            this.checkCollisions('y');
        }
    }

    checkCollisions(dir) {
        this.checkScreenCollision(dir);
        if (this.y > this.game.height / 2) {
            this.checkPlayerCollision(dir);
        } else {
            this.checkBrickCollision(dir);
        }
    }

    checkPlayerCollision(dir) {
        let player = this.game.player;
        if (this.x + this.width >= player.x + player.move && this.x <= player.x + player.width + player.move &&
            this.y + this.height >= player.y && this.y <= player.y + player.height) {
            hitSoundEffect.play();
            hitSoundEffect.currentTime = 0;
            if (dir == "x") {
                this.speed[dir] *= -1;
                this[dir] += this.speed[dir];
            } else {
                this.speed.y *= -1;
                this.speed.x = ((player.x + player.move + (player.width / 2)) - (this.x + (this.width / 2))) / 6;
            }

        }
    }

    checkScreenCollision(dir) {
        if (dir == "x") {
            if (this.x < 0) {
                this.speed.x *= -1;
                this.x = 0;
                hitSoundEffect.play();
                hitSoundEffect.currentTime = 0;
                return;
            }
            else if (this.x + this.width > this.game.width) {
                this.speed.x *= -1;
                this.x = this.game.width - this.width;
                hitSoundEffect.play();
                hitSoundEffect.currentTime = 0;
                return;
            }
        }
        else if (dir == "y") {
            if (this.y < 0) {
                this.speed.y *= -1;
                this.y = 0;
                hitSoundEffect.play();
                hitSoundEffect.currentTime = 0;
                return;
            }
            else if (this.y + this.height > this.game.height) {
                this.game.player.lives -= 1;
                loseSoundEffect.play();
                vidas.children[vidas.children.length - 1].remove();
                if (this.game.player.lives > 0) {
                    this.resetPos();
                } else {
                    brickContainer.querySelector('#retry-container').style['display'] = 'flex';
                    this.game.salvarPontuacao();
                    this.speed.x = 0;
                    this.speed.y = 0;
                }
                return;
            }
        }
    }

    checkBrickCollision(dir) {
        this.game.bricks.bricks.forEach((row, indexY) => {
            row.forEach((brick, indexX) => {
                if (this.x + this.width >= brick.x && this.x <= brick.x + brick.width &&
                    this.y + this.height >= brick.y && this.y <= brick.y + brick.height) {
                    breakSoundEffect.play();
                    breakSoundEffect.currentTime = 0;
                    this.game.bricks.bricks[indexY].splice(indexX, 1);
                    this.speed[dir] *= -1;
                    this[dir] += this.speed[dir];
                    this.game.pontos = String(this.game.pontos.slice(0, 8 - (parseInt(this.game.pontos) + (10 * parseInt(this.game.nivel))).toString().length)) + (parseInt(this.game.pontos) + (10 * parseInt(this.game.nivel)))
                    pontos.innerText = this.game.pontos
                    brickContainer.querySelector('#retry-pontos').innerText = pontos.innerText;
                    return;
                }
            })
        })
    }
}

class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 20;
        this.lives = 3;
        this.controls_delay = 20;
        this.controls_timer = 0;
        this.x = (this.game.width / 2) - (this.width / 2);
        this.y = this.game.height - this.height - 20;
        this.color = '#d8e0e7';

        this.speed = 5;
        this.move = 0;
        this.key = '';

        this.controls = {
            'ArrowRight': this.moveRight,
            'ArrowLeft': this.moveLeft,
            'ArrowUp': this.startBallMove,
            'f': this.fullscreen,
        }
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    update() {
        if (this.controls_timer < this.controls_delay) {
            this.controls_timer++
        }
        this.move = 0
        if (this.key in this.controls) {
            this.controls[this.key].call(this)
            if (this.checkScreenCollision()) {
                this.move = 0
            }
        }
        this.x += this.move
    }

    checkScreenCollision() {
        if (this.x + this.move + this.width >= this.game.width) {
            return true
        } else if (this.x + this.move <= 0) {
            return true
        }
        return false
    }

    moveLeft() {
        this.move = -this.speed
    }

    moveRight() {
        this.move = this.speed
    }
    startBallMove() {
        if (this.game.ball.speed.x == 0 && this.game.ball.speed.y == 0 && this.lives > 0) {
            this.game.ball.speed.y = -4
            this.game.ball.speed.x = 4
        }
    }
    fullscreen() {
        if (this.controls_timer == this.controls_delay) {
            if (!brickContainer.matches(':fullscreen')) {
                brickContainer.requestFullscreen();
                canvas.style['height'] = "90%"
            } else {
                document.exitFullscreen()
                brickContainer.style['width'] = "35%"
            }
            this.controls_timer = 0
        }
    }
}

class Game {
    constructor() {
        this.width = canvas.width;
        this.height = canvas.height;

        this.player = new Player(this);
        this.ball = new Ball(this);
        this.bricks = new Bricks(this);
        this.pontos = '00000000';
        this.nivel = '1';

        this.bricks.createBricks(3);

        addEventListener('keydown', (evt) => {            
            if (evt.key in this.player.controls) {
                evt.preventDefault();
                this.player.key = evt.key;
            }
        })
        addEventListener('keyup', (evt) => {
            if (this.player.key == evt.key) {
                this.player.key = '';
            }
        })
        brickContainer.querySelector('#retry-button').addEventListener('click', () => {
            this.player = new Player(this);
            this.ball = new Ball(this);
            this.bricks = new Bricks(this);
            this.bricks.createBricks(3);
            for (let x = 0; x < 3; x++) {
                let div = document.createElement('div');
                div.classList.add('vida');
                vidas.appendChild(div);
            }
            this.pontos = "00000000";
            pontos.innerText = this.pontos;
            this.nivel = '1';
            nivel.innerText = this.nivel;
            brickContainer.querySelector('#retry-container').style['display'] = 'none';
        })
    }
    draw(ctx) {
        ctx.fillStyle = '#122231';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.player.draw(ctx);
        this.ball.draw(ctx);
        this.bricks.draw(ctx);
    }
    update() {
        this.player.update();
        this.ball.update();
        this.checkWin();
    }
    salvarPontuacao() {
        const data = {
            jogo: 'brick-breaker',            
            pontuacao: this.pontos,
            total: this.nivel,
        }

        fetch('/inserirPontuacaoSimples', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    checkWin() {
        for (const brick of this.bricks.bricks) {
            if (brick.length != 0) {
                return
            }
        }

        this.ball.resetPos()
        if (3 + parseInt(this.nivel) > this.bricks.colors.length - 1) {
            this.bricks.createBricks(this.camadas);
        } else {
            this.bricks.createBricks(3 + parseInt(this.nivel));
        }
        this.nivel++;
        nivel.innerText = this.nivel;
        brickContainer.querySelector('#retry-nivel').innerText = this.nivel;
        
    }
}


const game = new Game()

function run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.draw(ctx)
    game.update()
    requestAnimationFrame(run)
}
run()
