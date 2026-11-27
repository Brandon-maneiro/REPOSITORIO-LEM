import { cronometro, cronometro2 } from "./cronometro.js";

const pergunta = document.getElementById('pergunta');
const botoes = document.querySelectorAll('.botao');
const timer = document.getElementById('timer');
const pontos = document.getElementById('pontos');
const erros = document.getElementById('erros');
const resposta = document.getElementById('respostaInput');
const windSoundEffect = new Audio('../sounds/success1.mp3')
const errorSoundEffect = new Audio('../sounds/alarm.wav')

windSoundEffect.volume = 0.3
errorSoundEffect.volume = 0.04

let tabuada = {pergunta: '', resposta: ''}
let jogando = false;

let perguntasFeitas = [];

const desafiosBtn = document.getElementsByClassName('desafio');
const desafiosContainer = document.getElementById('desafios-container');
const comecarBtn = document.getElementById('comecar');

let desafioAtual, tempoIntervalId, tempo;

const resultadoContainer = document.getElementById('resultado-container');

for (const btn of botoes) {
    btn.addEventListener('click', () => {
        if (checarResposta(btn.value)) {
            gerarPergunta()
        }
    })
}

resposta.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {        
        if (checarResposta(resposta.value)) {
            gerarPergunta()
        }
        resposta.value = ''
    }
})

function gerarPergunta() {
    tabuada.pergunta = String(Math.floor(Math.random() * 9 + 1) + '*' + Math.floor(Math.random() * 9 + 1));
    if (perguntasFeitas.includes(tabuada.pergunta)) {
        let c = 0;
        while (perguntasFeitas.includes(tabuada.pergunta)) {
            tabuada.pergunta = String(Math.floor(Math.random() * 9 + 1) + '*' + Math.floor(Math.random() * 9 + 1));
            c++
            if (c > 30) {
                perguntasFeitas = [];
                break
            }
        }
    } else {
        perguntasFeitas.push(tabuada.pergunta);
    };
    tabuada.resposta = eval(tabuada.pergunta);

    pergunta.innerText = tabuada.pergunta.replace('*', 'x');

    gerarRespostas()
}

function gerarRespostas() {
    let respostas = ['', '', '', '']
    respostas[Math.floor(Math.random() * 4)] = tabuada.resposta;
    respostas.forEach((r, i) => {
        if (r == '') {
            r = Math.floor(Math.random() * (tabuada.resposta / 2 - tabuada.resposta * 2)) + tabuada.resposta * 2
            for (let x = 0; x < 10; x++) {
                if (respostas.includes(r) || r > 90) {
                    r = Math.floor(Math.random() * (tabuada.resposta / 2 - tabuada.resposta * 2)) + tabuada.resposta * 2
                } else {
                    break
                }
            }
            respostas[i] = r            
        }
    })
    botoes.forEach((b, i) => {
        b.value = respostas[i];
    })
}

function checarResposta(valor) {
    if (jogando) {
        if (valor == tabuada.resposta) {
            if (desafioAtual) {
                if (desafios[desafioAtual.name].cond(true)) {
                    return true
                }
            } else {
                pontos.innerText++
                windSoundEffect.play()
                windSoundEffect.currentTime = 0
                return true
            }            
            
        } else {
            if (desafioAtual) {
                if (desafios[desafioAtual.name].cond(false)) {
                    return false
                }
            }
            else {
                erros.innerText++
                errorSoundEffect.play()
                errorSoundEffect.currentTime = 0
                return false
            }            
        }        
    }    
}

const desafios = {
    '1min': {
        funct: () => {
            tempo = 60;
            timer.innerText = '01:00';
            tempoIntervalId = setInterval(() => {
                if (tempo > -1) {
                    tempo = cronometro2(tempo, timer, -1);
                }                
            }, 1000);
        }, cond: (acert) => {
            if (tempo > 0) {    
                if (acert) {
                    pontos.innerText++;
                    windSoundEffect.play();
                    windSoundEffect.currentTime = 0;
                    return true;
                } else {
                    erros.innerText++;
                    errorSoundEffect.play();
                    errorSoundEffect.currentTime = 0;
                    return false;
                }            
            } else {
                jogando = false;
                finalizarTabuada();
                return false;
            }            
        }
    },
    '2min': {
        funct: () => {
            tempo = 120;
            timer.innerText = '02:00';
            tempoIntervalId = setInterval(() => {
                if (tempo > -1) {
                    tempo = cronometro2(tempo, timer, -1);
                }                
            }, 1000);
        },
         cond: (acert) => {
            if (tempo > 0) {    
                if (acert) {
                    pontos.innerText++;
                    windSoundEffect.play();
                    windSoundEffect.currentTime = 0;
                    return true
                } else {
                    erros.innerText++;
                    errorSoundEffect.play();
                    errorSoundEffect.currentTime = 0;
                    return false;
                }            
            } else {
                jogando = false;
                finalizarTabuada();
                return false;
            }
         }
    },
    'ilimitado': {
        funct: () => {
            tempo = 1;
            timer.innerText = '00:00';
            tempoIntervalId = setInterval(() => {
                tempo = cronometro2(tempo, timer, 1);
            }, 1000);
        },
        cond: (acert) => {
            if (acert) {
                pontos.innerText++;
                windSoundEffect.play();
                windSoundEffect.currentTime = 0;
                return true;
            } else {
                erros.innerText++
                errorSoundEffect.play();
                errorSoundEffect.currentTime = 0;
                return true;
            } 
        }
    },
    'semErros': {
        funct: () => {
            tempo = 1;
            timer.innerText = '00:00';
            tempoIntervalId = setInterval(() => {
                tempo = cronometro2(tempo, timer, 1);
            }, 1000);
        },
        cond: (acert) => {
            if (acert) {
                pontos.innerText++;
                windSoundEffect.play();
                windSoundEffect.currentTime = 0;
                return true;
            } else {
                jogando = false;                
                errorSoundEffect.play();
                errorSoundEffect.currentTime = 0;
                clearInterval(tempoIntervalId);
                finalizarTabuada();
                return false;
            } 
        }
    },
    '20acertos': {
        funct: () => {
            tempo = 1;
            timer.innerText = '00:00'
            tempoIntervalId = setInterval(() => {
                tempo = cronometro2(tempo, timer, 1);
            }, 1000);
        },
        cond: (acert) => {
            if (acert) {
                pontos.innerText++;
                windSoundEffect.play();
                windSoundEffect.currentTime = 0;
                if (parseInt(pontos.innerText) >= 20) {
                    jogando = false;
                    clearInterval(tempoIntervalId);
                    finalizarTabuada();
                    return false;
                }
                return true;
            } else {
                pontos.innerText = '0';
                erros.innerText++;
                errorSoundEffect.play();
                errorSoundEffect.currentTime = 0;
                return false;
            } 
        }
    },
    '50acertos': {
        funct: () => {
            tempo = 1;
            timer.innerText = '00:00'
            tempoIntervalId = setInterval(() => {
                tempo = cronometro2(tempo, timer, 1);
            }, 1000);
        },
        cond: (acert) => {
            if (acert) {
                pontos.innerText++;
                windSoundEffect.play();
                windSoundEffect.currentTime = 0;
                if (pontos.innerText == '50') {
                    jogando = false;
                    clearInterval(tempoIntervalId);
                    finalizarTabuada();
                    return false;
                }
                return true
            } else {
                pontos.innerText = '0';
                erros.innerText++;
                errorSoundEffect.play();
                errorSoundEffect.currentTime = 0;
                return false;
            } 
        }
    },
    '100acertos': {
        funct: () => {
            tempo = 1;
            timer.innerText = '00:00'
            tempoIntervalId = setInterval(() => {
                tempo = cronometro2(tempo, timer, 1);
            }, 1000);
        },
        cond: (acert) => {
            if (acert) {
                pontos.innerText++;
                windSoundEffect.play();
                windSoundEffect.currentTime = 0;
                if (pontos.innerText == '100') {
                    jogando = false;
                    clearInterval(tempoIntervalId);
                    finalizarTabuada();
                    return false;
                }
                return true
            } else {
                pontos.innerText = '0';
                erros.innerText++;
                errorSoundEffect.play();
                errorSoundEffect.currentTime = 0;
                return false;
            } 
        }
    },
}

gerarPergunta()

function finalizarTabuada() {
    sendResults();
    mostrarPontuacaoFinal();
}

function sendResults() {
    const data = {
        pontos: pontos.innerText,
        erros: erros.innerText,
        tempo: timer.innerText,
        desafio: desafioAtual.value
    }

    fetch('/inserirPontuacaoTabuada', {
        method: 'POST',        
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

const acertosPontos = document.getElementById('acertosPontos');
const errosPontos = document.getElementById('errosPontos');
const tempoFinal = document.getElementById('tempoFinal');

function mostrarPontuacaoFinal() {
    acertosPontos.innerText = pontos.innerText;
    errosPontos.innerText = erros.innerText;
    tempoFinal.innerText = timer.innerText;
    resultadoContainer.style.display = 'flex';
}

for (const btn of desafiosBtn) {
    btn.addEventListener('click', () => {
        let selecionado = desafiosContainer.querySelector('.selecionado');
        if (selecionado) {
            selecionado.classList.toggle('selecionado');
        }
        btn.classList.toggle('selecionado');
    })
}

comecarBtn.addEventListener('click', () => {
    resultadoContainer.style['display'] = 'none'
    jogando = true;
    desafioAtual = desafiosContainer.querySelector('.selecionado');
    if (tempoIntervalId) {
        clearInterval(tempoIntervalId);
    };
    desafios[desafioAtual.name].funct();
    pontos.innerText = '0';
    erros.innerText = '0';
    gerarPergunta()
})