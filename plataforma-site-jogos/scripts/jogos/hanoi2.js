import { cronometro } from "./cronometro.js";

const timer = document.getElementById('timer');
const passos = document.getElementById('passos');

const hanoiContainer = document.getElementById('hanoi-container');
const pilars = document.querySelectorAll('.pilar');

const resultadoContainer = document.getElementById('resultado-container');
const passosBolha = document.getElementById('passosBolha');
const tempoBolha = document.getElementById('tempoBolha');

let selected;
addEventListener('mouseup', () => {
    for (const pilar of pilars) {
        if (selected && pilar.matches(':hover') && !pilar.contains(selected)) {            
            passos.innerText++
            if (pilar.children[0]) {
                if (pilar.children[0].getBoundingClientRect().width > selected.getBoundingClientRect().width) {
                    pilar.insertBefore(selected, pilar.children[0])
                }
            } else {
                pilar.appendChild(selected)
            }
            selected.style.outline = "none"
            selected = ""
            for (const p of pilars) {
                p.classList.remove('placing')
            }
            if(pilars[1].children.length == 6 || pilars[2].children.length == 6) {
                resultadoContainer.style['display'] = 'flex';
                passosBolha.innerText = passos.innerText;
                tempoBolha.innerText = timer.innerText;
                clearInterval(cronometroIntervalId);
                enviarPontuacao();
            }
            return
        }
        if (pilar.children[0] && pilar.children[0].matches(':hover')) {
            pilar.children[0].style.outline = "3px solid blue"
            selected = pilar.children[0]
            for (const p of pilars) {
                p.classList.add('placing')
            }
            return
        }
        if (pilar == hanoiContainer.lastElementChild && selected) {
            selected.style.outline = "none"
            selected = ""
            for (const p of pilars) {
                p.classList.remove('placing')                
            }
        }
    }    
})

function enviarPontuacao() {
    const data = {
        jogo: 'hanoi',
        pontuacao: passos.innerText,
        tempo: timer.innerText,
    };

    fetch('/inserirPontuacaoSimples', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

let tempo = 0
let cronometroIntervalId = setInterval(() => {
    tempo = cronometro(tempo, timer)
}, 1000)