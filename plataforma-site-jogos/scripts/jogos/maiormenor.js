const n1 = document.getElementById('numeroEsquerda');
const n2 = document.getElementById('numeroDireita');

const topo = document.getElementById('topo');
const acima = document.getElementById('acima');

const buttonMaior = document.getElementById('maior');
const buttonMenor = document.getElementById('menor');

const duvida = document.getElementById('duvidaDiv');

const rightSoundEffect = new Audio('../sounds/plim.mp3');
const wrongSoundEffect = new Audio('../sounds/fall.wav');

wrongSoundEffect.volume = 0.3

let questao;

let modo = document.querySelector('.modo');

let operacoes = {
    'fracao': changeQuizFracao,
    'divisao': changeQuizDivisao,
    'inteiros': changeQuizInteiros,
    'decimais': changeQuizDecimais,
    'notacao': changeQuizNotacao,
}

questao = changeQuiz;
if (modo.classList[1] in operacoes){
    questao = operacoes[modo.classList[1]];
}

let resposta1, resposta2;

questao()

const rotateBalanceAnimation = [
    [
        {transform: 'rotate(0)'},
        {transform: 'rotate(10deg)'},
        {transform: 'rotate(10deg)'},       
        {transform: 'rotate(0)'}
    ],
    [
        {transform: 'rotate(0)'},
        {transform: 'rotate(-10deg)'},        
        {transform: 'rotate(-10deg)'},
        {transform: 'rotate(0)'}
    ],
]

const rotateBalanceTime = {
    duration: 1000,
    iterations: 1
}

const rotateDuvida = [
    {transform: 'rotate(10deg)'},
    {transform: 'rotate(-20deg)'},
    {transform: 'rotate(20deg)'},
    {transform: 'rotate(-20deg)'},    
    {transform: 'rotate(20deg)'},
    {transform: 'rotate(-10deg)'}
]

const rotateDuvidaTime = {
    duration: 400,
    iterations: 1
}

var animating = false

buttonMaior.onclick = () => {
    if (!animating){
        duvida.innerText = '>'
        checkAnswer('maior')
    }    
}

buttonMenor.onclick = () => {
    if (!animating){
        duvida.innerText = '<'
        checkAnswer('menor')
    }
}

addEventListener('keyup', (e) => {
    if (!animating){
        if (e.key == "ArrowLeft"){
            duvida.innerText = '<'
            checkAnswer('menor')
        } else if (e.key == "ArrowRight") {
            duvida.innerText = '>'
            checkAnswer('maior')
        }
    }    
})

function checkAnswer(answer){
    console.log(resposta1, resposta2)
    if (resposta1 > resposta2){
        if (answer == 'maior'){            
            rightSoundEffect.play()
            rightSoundEffect.currentTime = 0
            animating = true
            let animation = topo.animate(rotateBalanceAnimation[1], rotateBalanceTime)            
            acima.animate(rotateBalanceAnimation[1], rotateBalanceTime)
            animation.onfinish = () => {
                animating = false
                duvida.innerText = '?'                
                questao()                
            }
        } else {
            wrongSoundEffect.play()
            wrongSoundEffect.currentTime = 0
            animating = true
            let animation = duvida.animate(rotateDuvida, rotateDuvidaTime)
            duvida.style.backgroundColor = "red"
            animation.onfinish = () => {
                animating = false
                duvida.innerText = "?"
                duvida.style.backgroundColor = "#4dc269"
            }            
        }
    }
    else {
        if (answer == 'menor'){
            rightSoundEffect.play()
            rightSoundEffect.currentTime = 0
            animating = true
            let animation = topo.animate(rotateBalanceAnimation[0], rotateBalanceTime)            
            acima.animate(rotateBalanceAnimation[0], rotateBalanceTime)
            animation.onfinish = () => {
                animating = false
                duvida.innerText = '?'                
                questao()
            }
            
        } else {
            wrongSoundEffect.play()
            wrongSoundEffect.currentTime = 0
            animating = true
            let animation = duvida.animate(rotateDuvida, rotateDuvidaTime)
            duvida.style.backgroundColor = "red"
            animation.onfinish = () => {
                animating = false
                duvida.innerText = "?"
                duvida.style.backgroundColor = "#4dc269"
            }
        }
    }
}

function changeQuiz(){
    let newN1 = Math.floor(Math.random() * 1000)
    let newN2 = Math.floor(Math.random() * 1000)
    while (newN2 == newN1){
        newN2 = Math.floor(Math.random() * 1000)
    }
    n1.innerText = newN1
    resposta1 = newN1
    n2.innerText = newN2
    resposta2 = newN2
}

function changeQuizInteiros(){
    let newN1 = Math.floor(Math.random() * 1000)
    let newN2 = Math.floor(Math.random() * 1000)
    if (Math.floor(Math.random() * 5) > 1){
        newN1 *= -1
    }
    if (Math.floor(Math.random() * 5) > 1){
        newN2 *= -1
    }
    while (newN2 == newN1){
        newN2 = Math.floor(Math.random() * 1000)
    }
    n1.innerText = newN1;
    resposta1 = newN1;
    n2.innerText = newN2;
    resposta2 = newN2;
}

function changeQuizFracao(){
    let newN1 = Math.floor(Math.random() * 12 + 1)
    let newN2 = Math.floor(Math.random() * 12 + 1)
    let newN3 = Math.floor(Math.random() * newN1 + 1)
    let newN4 = Math.floor(Math.random() * newN2 + 1)
    while (newN3 / newN1 == newN4 / newN2){
        newN1 = Math.floor(Math.random() * 12 + 1)
        newN3 = Math.floor(Math.random() * newN1 + 1)
    }
    let numerador1Div = document.createElement('div');
    numerador1Div.innerText = newN3;
    let denominador1Div = document.createElement('div');
    denominador1Div.innerText = newN1;

    let numerador2Div = document.createElement('div');
    numerador2Div.innerText = newN4;
    let denominador2Div = document.createElement('div');
    denominador2Div.innerText = newN2;

    resposta1 = newN3 / newN1;
    resposta2 = newN4 / newN2;

    n1.replaceChildren(numerador1Div, denominador1Div);
    n2.replaceChildren(numerador2Div, denominador2Div);

    n1.classList.add('fracao');
    n2.classList.add('fracao');
}

function changeQuizDivisao(){
    let newN1 = Math.floor(Math.random() * 12 + 1)
    let newN2 = Math.floor(Math.random() * 12 + 1)
    let newN3 = Math.floor(Math.random() * (newN1 * 3) + 1)
    let newN4 = Math.floor(Math.random() * (newN2 * 3) + 1)
    while (newN3 / newN1 == newN4 / newN2){
        newN1 = Math.floor(Math.random() * 12 + 1)
        newN3 = Math.floor(Math.random() * (newN1 * 3) + 1)
    }
    let numerador1Div = document.createElement('div');
    numerador1Div.innerText = newN3;
    let denominador1Div = document.createElement('div');
    denominador1Div.innerText = newN1;

    let numerador2Div = document.createElement('div');
    numerador2Div.innerText = newN4;
    let denominador2Div = document.createElement('div');
    denominador2Div.innerText = newN2;

    resposta1 = newN3 / newN1;
    resposta2 = newN4 / newN2;

    n1.replaceChildren(numerador1Div, denominador1Div);
    n2.replaceChildren(numerador2Div, denominador2Div);

    n1.classList.add('fracao');
    n2.classList.add('fracao');
}

function changeQuizDecimais() {
    let newN1 = Math.floor(Math.random() * 10 + 1);
    let newN2 = Math.floor(Math.random() * 10 + 1);
    let newN3 = Math.floor(Math.random() * 50 + 1);
    let newN4 = Math.floor(Math.random() * 50 + 1);
    while (newN1 / newN3 == newN2 / newN4){
        newN1 = Math.floor(Math.random() * 10 + 1);
        newN3 = Math.floor(Math.random() * 50 + 1);
    };
    n1.innerText = (newN1 / newN3).toFixed(7).replace('.', ',');
    resposta1 = newN1 / newN3;
    n2.innerText = (newN2 / newN4).toFixed(7).replace('.', ',');
    resposta2 = newN2 / newN4;
};

function changeQuizNotacao() {
    let newN1 = Math.floor(Math.random() * 100 + 1) / 10;
    let newN2 = Math.floor(Math.random() * 100 + 1) / 10;
    let newN3 = Math.floor(Math.random() * 30 + 1);
    let newN4 = Math.floor(Math.random() * 30 + 1);

    if (Math.floor(Math.random() * 5) > 2){
        newN3 *= -1;
    };
    if (Math.floor(Math.random() * 5) > 2){
        newN4 *= -1;
    };

    while (newN1 * 10 ** newN3 == newN2 * 10 ** newN4) {
        newN2 = Math.floor(Math.random() * 100 + 1) / 10;
    };

    let base1Div = document.createElement('span');
    base1Div.innerText = String(newN1).replace('.', ',') + 'x10';    
    let expoente1Div = document.createElement('div');
    expoente1Div.innerText = newN3;
    base1Div.appendChild(expoente1Div);

    let base2Div = document.createElement('span');
    base2Div.innerText = String(newN2).replace('.', ',') + 'x10';    
    let expoente2Div = document.createElement('div');
    expoente2Div.innerText = newN4;
    base2Div.appendChild(expoente2Div);

    resposta1 = newN1 * 10 ** newN3;
    resposta2 = newN2 * 10 ** newN4;

    n1.replaceChildren(base1Div);
    n2.replaceChildren(base2Div);

    n1.classList.add('notacao');
    n2.classList.add('notacao');
}

