const combinarContainer = document.getElementById('combinar-container');
const respostasDiv = document.getElementById('respostas-div');
const combinarDiv = document.getElementById('combinar-div');
const respostas = document.getElementsByClassName('resposta');
const respostasSlots = document.getElementsByClassName('resposta-slot');
const finalizarBtn = document.getElementById('finalizar');
const perguntas = document.getElementsByClassName('perguntas');
const resultadoContainer = document.getElementById('resultado-container');

let quiz = [];

let request = async () => {
    const response = await fetch('/getCombinacao/' + window.location.href.split('/').at(-1), {
        method: 'GET'
    });
    const data = await response.json();
    quiz = JSON.parse(data[0].perguntas);
    console.log(quiz)
    createQuiz()
}
request()



let res = []

let playing = true;

function createQuiz() {
    // CRIA AS PERGUNTAS
    for (const q of quiz) {
        // GUARDA AS RESPOSTAS
        res.push(q.resposta);

        const pergunta = document.createElement('div');
        pergunta.classList.add('perguntas');

        const perguntaSlot = document.createElement('div');
        perguntaSlot.classList.add('resposta-slot');

        const perguntaText = document.createElement('div');
        perguntaText.classList.add('pergunta-text');
        perguntaText.innerText = q.pergunta;

        pergunta.append(perguntaSlot, perguntaText);
        combinarDiv.appendChild(pergunta);
    }

    // ALEATORIZA AS RESPOSTAS
    res.sort(() => Math.random() - 0.5);

    // CRIA AS RESPOSTAS
    for (const r of res) {
        const resposta = document.createElement('div');
        resposta.classList.add('resposta');

        resposta.innerText = r;
        respostasDiv.appendChild(resposta);
    };

    let mouse = {
        x: 0,
        y: 0
    };

    // PEGA A POSIÇÃO DO MOUSE NA TELA
    addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    let moving = false;
    let movingPiece;
    let moveEvent;
    let upEvent;

    // LOOP INICIAL QUE ADICIONA OS EVENTOS
    for (const p of respostas) {
        // CHECA SE O MOUSE FOI PRESSINADO ACIMA DE UMA RESPOSTA
        p.addEventListener('mousedown', () => {
            if (playing) {
                if (p.classList.contains('respondido')) {
                    // CRIA UMA DIV TEMPORARIA
                    let newSlot = document.createElement('div');
                    newSlot.classList.add('resposta-slot');
                    p.replaceWith(newSlot);
                    respostasDiv.appendChild(p);
                    p.classList.remove('respondido');
                    p.style = '';
                    return
                }
                // CONFIGURAÇÕES INICIAIS
                moving = true;

                movingPiece = p;

                let initialScroll = window.scrollY;

                let placeholderDiv = document.createElement('div');
                movingPiece.parentElement.insertBefore(placeholderDiv, p);

                movingPiece.style['z-index'] = '2';
                movingPiece.style['position'] = 'absolute';
                let rect = movingPiece.getBoundingClientRect();

                movingPiece.style['left'] = mouse.x - rect.left - (rect.width / 2) + 'px';
                movingPiece.style['top'] = mouse.y - rect.top - (rect.height / 2) - (initialScroll - window.scrollY) + 'px';

                // EVENTO QUE OCORRE QUANDO O MOUSE SE MOVE
                moveEvent = () => {
                    let newRect = movingPiece.getBoundingClientRect();

                    movingPiece.style['left'] = mouse.x - rect.left - (rect.width / 2) + 'px';
                    movingPiece.style['top'] = mouse.y - rect.top - (rect.height / 2) - (initialScroll - window.scrollY) + 'px';

                    for (const s of respostasSlots) {
                        slotRect = s.getBoundingClientRect();

                        if (newRect.x < slotRect.x + slotRect.width && newRect.x + newRect.width > slotRect.x &&
                            newRect.y < slotRect.y + slotRect.height && newRect.y + newRect.height > slotRect.y) {
                            s.classList.add('selected');
                        } else {
                            s.classList.remove('selected');
                        }
                    }
                }

                addEventListener('mousemove', moveEvent);

                // EVENTO QUE OCORRE QUANDO O MOUSE É LEVANTADO
                upEvent = () => {
                    let selected = document.getElementsByClassName('selected');

                    // CHECA SE A RESPOSTA RESPONDEU MAIS DE UMA PERGUNTA
                    if (selected.length > 0) {
                        if (!selected[0].classList.contains('respondido')) {
                            selected[0].replaceWith(movingPiece);
                            if (selected.length > 0) {
                                for (const s of selected) s.classList.remove('selected');
                            }
                            movingPiece.classList.add('respondido');
                            placeholderDiv.remove();
                        }
                    } else {
                        placeholderDiv.replaceWith(movingPiece);
                    }

                    movingPiece.style['z-index'] = '';
                    movingPiece.style['position'] = 'relative';
                    movingPiece.style['left'] = '';
                    movingPiece.style['top'] = '';
                    moving = false;

                    // REMOVE OS EVENTOS PARA NÃO ACUMULAREM
                    removeEventListener('mousemove', moveEvent);
                    removeEventListener('mouseup', upEvent);
                }

                addEventListener('mouseup', upEvent);
            }
        });
    }

    finalizarBtn.addEventListener('click', () => {
        if (combinarDiv.children.length == combinarDiv.querySelectorAll('.respondido').length) {
            let acertos = 0
            quiz.forEach((q, i) => {
                if (q.pergunta == perguntas[i].children[1].innerText && q.resposta != perguntas[i].children[0].innerText) {
                    perguntas[i].children[0].style['background-color'] = 'red';
                } else {
                    acertos++
                    perguntas[i].children[0].style['background-color'] = 'green';
                }
                perguntas[i].children[0].style['color'] = 'white';
            })

            resultadoContainer.querySelector('#pontos').innerText = acertos;
            resultadoContainer.querySelector('#total').innerText = combinarDiv.children.length;
            resultadoContainer.style['display'] = 'flex';
        } else {
            for (const r of respostasSlots) {
                r.style['background-color'] = 'yellow';
            }
        }
    })
}
