const data = document.getElementById('data');
const perguntas = JSON.parse(data.getAttribute('data-perguntas'));
const id = data.getAttribute('data-quizId');
const pergunta = document.getElementById('pergunta');
const quizContainer = document.getElementById('quiz-container');
const resultadoContainer = document.getElementById('resultado-container');
const contador = document.getElementById('contador');

const letras = ['a', 'b', 'c', 'd', 'e', 'f'];

let level = 0;

let acertos = 0;

let total = Object.keys(perguntas).length;

function runGame() {
    document.querySelectorAll('.resposta').forEach(r => r.remove());
    quizContainer.className = '';

    contador.innerText = (level + 1) + '/' + total
    pergunta.innerText = perguntas[level].pergunta;

    let size = 0;
    perguntas[level].respostas.forEach((r, level) => {
        if (r != '') {
            size++
            let respostaDiv = document.createElement('div');
            respostaDiv.innerText = letras[level].toUpperCase() + '. ' + r
            respostaDiv.classList.add(letras[level], 'resposta');
            respostaDiv.addEventListener('click', () => {
                checkAnswer(respostaDiv);
            })
            quizContainer.appendChild(respostaDiv);
        }
    })

    quizContainer.classList.add('grid' + size);
}

function checkAnswer(div) {
    if (div.innerText.slice(3) == perguntas[level].respostaCerta) {
        acertos++
    };
    if (perguntas[level + 1]) {
        level++
        runGame()
    } else {
        const data = {
            quizId: id,
            pontuacao: acertos,
            total: total
        }
        fetch('/inserirPontuacaoQuestionario', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(result => {
            quizContainer.style['display'] = 'none'
            resultadoContainer.style['display'] = 'flex'
            resultadoContainer.querySelector('#pontos').innerText = result.pontos
            resultadoContainer.querySelector('#total').innerText = result.total
        })
    };
}

runGame()