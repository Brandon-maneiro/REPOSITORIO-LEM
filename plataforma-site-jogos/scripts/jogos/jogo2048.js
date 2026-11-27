const pontos = document.getElementById('pontos');
const moves = document.getElementById('moves');
const rows = document.getElementsByClassName('rows');
const fimContainer = document.getElementById('fim-container');
const jogarNovamenteBtn = document.getElementById('jogar-novamente');

var vitoria = false;
var playing = true;
var total = 0;
var movimentos = 0;
var timerId;

function getArrayRows(){
    let newArray = new Array();
    for (const y of rows){
        let arr = new Array();
        for (const x of y.children){
            arr.push(x);
        }
        newArray.push(arr);
    }
    return newArray;
}

function resetGrid() {
    playing = true;
    for (const y of rows){
        for (const x of y.children){
            x.className = ''
            x.innerText = ''
            x.classList.add('bloco')
        }        
    }
    addRandom()
    addRandom()
}

function setRowsCollection(array){
    let blocos = 0
    let y = 0
    for (const row of rows){
        let x = 0
        for (let bloco of row.children){
            if (!vitoria) {
                if (array[y][x].innerText && array[y][x].classList.contains('n2048')){
                    vitoria = true;
                    fimContainer.querySelector('#fim-titulo').innerText = 'Parabéns!';
                    fimContainer.querySelector('#movimentos').innerText = movimentos;
                    fimContainer.querySelector('#pontos').innerText = total;
                    fimContainer.style['display'] = 'flex';                    
                    salvarPontuacao();
                }
            }            
            if (array[y][x].className != 'bloco'){
                blocos++;
            }
            bloco = array[y][x];
            x++;
        }
        y++;
    }
    if (blocos == 16){
        playing = false;
    } else {
        playing = true;
    }
    pontos.innerText = total;
}

const controls = {
    'ArrowRight': moveRight,
    'ArrowLeft': moveLeft,
    'ArrowDown': moveDown,
    'ArrowUp': moveUp
}

addEventListener('keydown', (e) => {
    if (e.key in controls){ 
        e.preventDefault();
    }
})

addEventListener('keyup', (e) => {
    if (e.key in controls){
        if (playing){
            movimentos++;
            moves.innerText = movimentos;
            if (timerId) {
                clearInterval(timerId);
                timerId = undefined;
            }
        } else {
            if (!timerId) {
                timerId = setInterval(() => {
                    if (!playing && !vitoria) {
                        vitoria = true;
                        fimContainer.querySelector('#fim-titulo').innerText = 'Tente Novamente!';
                        fimContainer.querySelector('#movimentos').innerText = movimentos;
                        fimContainer.querySelector('#pontos').innerText = total;
                        fimContainer.style['display'] = 'flex';
                        salvarPontuacao();
                    }
                }, 4000);
            };
        }
        controls[e.key]();
        addRandom();
    }
})

jogarNovamenteBtn.addEventListener('click', () => {
    resetGrid();
    fimContainer.style['display'] = 'none';
    total = 0;
    pontos.innerText = total;
    movimentos = 0;
    moves.innerText = movimentos;
})

function salvarPontuacao() {
    const data = {
        jogo: '2048',
        pontuacao: total,
        total: movimentos
    }
    fetch('inserirPontuacaoSimples', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

function random(n){
    return (Math.floor(Math.random() * n));
}

function addRandom(){
    const newArray = getArrayRows();

    let newY = random(4);
    let newX = random(4);

    while (newArray[newY][newX].className != 'bloco'){
        newY = random(4);
        newX = random(4);
        if (!playing){            
            break;
        }
    }

    if (playing){
        newArray[newY][newX].className = 'bloco n2 number';
        newArray[newY][newX].innerText = '2';
        setRowsCollection(newArray);
    }
}

function checkCollision(array, reverse){
    const newArray = new Array();
    let c = 0;
    array.forEach((bloco, index) => {
        if (c == 0){            
            if (array[index+1] && bloco[0].split(' ')[1] == array[index+1][0].split(' ')[1]){                
                let ran = Math.floor(Math.random() * 2);
                let sum = parseInt(bloco[0].split(' ')[1].replace('n', '')) + parseInt(array[index+1][0].split(' ')[1].replace('n', ''));
                total += sum;
                if (ran == 0){
                    newArray.push(['bloco n' + sum + " number", sum]);
                } else {
                    newArray.push(['bloco n' + sum + " number small",
                    "2^" + Math.log(sum) / Math.log(2)]);
                }
                
                c = -2;
            } else {
                newArray.push(bloco);
            }                
            
        }
        if (c < 0){
            c++;
        }
    })
    return newArray.reverse()
}

function moveRight(){
    const newArray = getArrayRows()
    newArray.forEach((y, indexY) => {
        let moved = []
        y.forEach((x, indexX) => {
            if (x.className != 'bloco'){
                moved.push([x.className, x.innerText])
                x.innerText = ''
                x.className = 'bloco'
            }
        })
        moved = checkCollision(moved)
        moved.forEach((item, index) => {
            y[y.length - (index + 1)].className = item[0]
            y[y.length - (index + 1)].innerText = item[1]
        })
    })    
    setRowsCollection((newArray))
}

function moveLeft(){
    const newArray = getArrayRows()
    newArray.forEach((y, indexY) => {
        let moved = []
        y.forEach((x, indexX) => {
            if (x.className != 'bloco'){
                moved.unshift([x.className, x.innerText])
                x.innerText = ''
                x.className = 'bloco'
            }
        })
        moved = checkCollision(moved)
        moved.forEach((item, index) => {
            y[index].className = item[0]
            y[index].innerText = item[1]
        })
    })
    setRowsCollection((newArray))
}

function moveDown(){
    const newArray = getArrayRows()
    newArray.forEach((y, indexY) => {
        let moved = []
        y.forEach((x, indexX) => {            
            if (newArray[indexX][indexY].className != 'bloco'){
                moved.push([newArray[indexX][indexY].className, newArray[indexX][indexY].innerText])
                newArray[indexX][indexY].innerText = ''
                newArray[indexX][indexY].className = 'bloco'
            }
        })
        moved = checkCollision(moved)
        moved.forEach((item, index) => {
            newArray[newArray.length - (index + 1)][indexY].className = item[0]
            newArray[newArray.length - (index + 1)][indexY].innerText = item[1]
        })
    })
    setRowsCollection((newArray))
}

function moveUp(){
    const newArray = getArrayRows()
    newArray.forEach((y, indexY) => {
       let moved = []
        y.forEach((x, indexX) => {            
            if (newArray[indexX][indexY].className != 'bloco'){
                moved.unshift([newArray[indexX][indexY].className, newArray[indexX][indexY].innerText])
                newArray[indexX][indexY].innerText = ''
                newArray[indexX][indexY].className = 'bloco'
            }
        })        
        moved = checkCollision(moved)
        moved.forEach((item, index) => {
            newArray[index][indexY].className = item[0]
            newArray[index][indexY].innerText = item[1]
        })
    })
    setRowsCollection((newArray))
}

addRandom()
addRandom()