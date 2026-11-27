const fracoesContainer = document.querySelectorAll('.fracao-container');
const vitoriaContainer = document.querySelector('.vitoria-container');
const resetParabenizacaoBtn = document.querySelector('.reset-parabenizacao');
const fecharParabenizacaoBtn = document.querySelector('.botao-fechar-parabenizacao');

const prontoBtn = document.querySelector('.finalizar');
const lixoBtn = document.querySelector('.lixo');
const resetBtn = document.querySelector('.reset');

const quantidadeContainer = document.querySelector('.quantidade-container');
const setaCima = document.querySelector('.triangulo_cima');
const setaBaixo = document.querySelector('.triangulo_baixo');

const duvidaContainer = document.querySelector('.duvida-container');
const duvidaTexto = document.querySelector('.duvida-texto');
const fecharDuvidaContainer = document.querySelector('.fechar');

let cores = ['azul', 'roxo', 'rosa', 'amarelo', 'laranja'];

let fecharDuvidaBool = false;

let circuloCustomizavel = {
    cor: cores[Math.floor(Math.random() * cores.length)],
    lados: 0,
    div: '',
};

let pintaveis;

let cx = 110; // Centro X
let cy = 110; // Centro Y
let r = 100; // Raio

setaCima.addEventListener('click', () => modificarLadosCirculoCustomizavel('aumentar'));
setaBaixo.addEventListener('click', () => modificarLadosCirculoCustomizavel('diminuir'));
duvidaContainer.addEventListener('click', () => fecharDuvida());
fecharDuvidaContainer.addEventListener('mouseover', () => fecharDuvidaBool = true);
lixoBtn.addEventListener('click', () => resetarInputs());
prontoBtn.addEventListener('click', () => checkRespostas());
fecharParabenizacaoBtn.addEventListener('click', () => { vitoriaContainer.close(); });

function fecharDuvida() {
    if (fecharDuvidaBool) {
        duvidaTexto.style['visibility'] = 'hidden';
        fecharDuvidaBool = false;
    } else {
        duvidaTexto.style['visibility'] = 'visible';
    }
}

resetBtn.addEventListener('click', () => {
    resetarInputs();
    for (const f of fracoesContainer) {
        f.removeChild(f.firstElementChild);
    }
    criarFracoes();
})

resetParabenizacaoBtn.addEventListener('click', () => {
    resetarInputs();
    for (const f of fracoesContainer) {
        f.removeChild(f.firstElementChild);
    }
    criarFracoes();
    vitoriaContainer.close();   
})

function resetarInputs() {
    for (const f of fracoesContainer) {
        let numerador = f.querySelector('.numerador');
        let denominador = f.querySelector('.denominador');
        numerador.classList.remove('certo', 'errado', 'meio-certo');
        numerador.value = '';
        denominador.classList.remove('certo', 'errado', 'meio-certo');
        denominador.value = '';
    };
}

function pintar(lado) {
    lado.addEventListener('click', () => {
        lado.classList.toggle('preenchido');
        lado.classList.toggle('vazio');
        lado.classList.toggle(circuloCustomizavel.cor);
    })
}

function fracaoEquivalente() {
    for (const f of fracoesContainer) {
        let superior = f.querySelector('.equivalente-superior');
        let inferior = f.querySelector('.equivalente-inferior');

        let divisores = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]

        superior.addEventListener('click', () => {
            let numerador = f.querySelector('.numerador');
            let denominador = f.querySelector('.denominador');
            let preenchidos = f.querySelectorAll('.preenchido').length;
            let vazios = f.querySelectorAll('.vazio').length;

            let numeradorValue = parseInt(numerador.value);
            let denominadorValue = parseInt(denominador.value);

            let divisaoCirculo = parseFloat((preenchidos / (preenchidos + vazios)).toPrecision(6));
            let divisaoFracao = parseFloat((numeradorValue / denominadorValue).toPrecision(6));

            let divisivel = false
            if (divisaoCirculo == divisaoFracao) {
                for (const x of divisores) {
                    while (numeradorValue % x == 0 && denominadorValue % x == 0) {
                        numeradorValue /= x;
                        denominadorValue /= x;
                        divisivel = true;
                    }                    
                }
                if (divisivel) {
                    numerador.value = parseInt(numerador.value) + numeradorValue;
                    denominador.value = parseInt(denominador.value) + denominadorValue;                    
                } else {                    
                    numerador.value = numeradorValue * 2;
                    denominador.value = denominadorValue * 2;                    
                }
                circuloEquivalente(f, numerador.value, denominador.value);
            }
        })

        inferior.addEventListener('click', () => {
            let numerador = f.querySelector('.numerador');
            let denominador = f.querySelector('.denominador');
            let preenchidos = f.querySelectorAll('.preenchido').length;
            let vazios = f.querySelectorAll('.vazio').length;

            let numeradorValue = parseInt(numerador.value);
            let denominadorValue = parseInt(denominador.value);

            let divisaoCirculo = parseFloat((preenchidos / (preenchidos + vazios)).toPrecision(6));
            let divisaoFracao = parseFloat((numeradorValue / denominadorValue).toPrecision(6));

            let divisivel = false;
            if (divisaoCirculo == divisaoFracao) {
                for (const x of divisores) {
                    while (numeradorValue % x == 0 && denominadorValue % x == 0) {
                        numeradorValue /= x;
                        denominadorValue /= x;
                        divisivel = true;                        
                    }                    
                }
                if (divisivel) {
                    divisivel = false;
                    numerador.value = parseInt(numerador.value) - numeradorValue;
                    denominador.value = parseInt(denominador.value) - denominadorValue;
                    circuloEquivalente(f, numerador.value, denominador.value);
                }
            }
        })
    }
}

function circuloEquivalente(f, numValue, denValue) {

    let qtd = denValue;

    let angulo = 360 / qtd;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");

    const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);

    svg.appendChild(circle);

    let svgs = f.querySelector('svg');

    let c = 0
    for (const x of svgs.children) {        
        if (x.classList.contains('preenchido')) {
            for (let y = 0; y < numValue; y++) {
                const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');

                path.classList = x.classList

                path.setAttribute('d', `M${cx},${cy} \n
                L${cx + r * Math.cos((Math.PI * angulo / 180) * c)},${cy + r * Math.sin((Math.PI * angulo / 180) * c)} \n 
                A ${r},${r} 0,0,1 \n
                ${cx + r * Math.cos((Math.PI * angulo / 180) * (c + 1))},${cy + r * Math.sin((Math.PI * angulo / 180) * (c + 1))} \n
                L${cx},${cy}`);

                svg.appendChild(path)
                c++
            }
            for (let y = 0; y < denValue - numValue; y++) {
                const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');

                path.classList.add('vazio')
                path.classList.add('area')

                path.setAttribute('d', `M${cx},${cy} \n
                L${cx + r * Math.cos((Math.PI * angulo / 180) * c)},${cy + r * Math.sin((Math.PI * angulo / 180) * c)} \n 
                A ${r},${r} 0,0,1 \n
                ${cx + r * Math.cos((Math.PI * angulo / 180) * (c + 1))},${cy + r * Math.sin((Math.PI * angulo / 180) * (c + 1))} \n
                L${cx},${cy}`);

                svg.appendChild(path)
                c++
            }
            break
        }        
    }
    f.firstElementChild.replaceWith(svg);
}

function modificarLadosCirculoCustomizavel(op) {
    operacoes = { 'aumentar': 1, 'diminuir': -1 }

    circuloCustomizavel.lados += operacoes[op]
    if (circuloCustomizavel.lados < 2) {
        circuloCustomizavel.lados++
    }

    quantidadeContainer.innerHTML = circuloCustomizavel.lados;

    let qtd = circuloCustomizavel.lados;
    let angulo = 360 / qtd;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");

    const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);

    svg.appendChild(circle);

    for (let x = 0; x < qtd; x++) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');

        path.classList.add('area');
        path.classList.add('vazio');
        path.classList.add('podePintar');

        pintar(path)

        path.setAttribute('d', `M${cx},${cy} \n
        L${cx + r * Math.cos((Math.PI * angulo / 180) * x)},${cy + r * Math.sin((Math.PI * angulo / 180) * x)} \n 
        A ${r},${r} 0,0,1 \n
        ${cx + r * Math.cos((Math.PI * angulo / 180) * (x + 1))},${cy + r * Math.sin((Math.PI * angulo / 180) * (x + 1))} \n
        L${cx},${cy}`);

        svg.appendChild(path)
    }
    document.querySelector('.pintavel').firstElementChild.replaceWith(svg);
};

function checkRespostas() {

    let respostas = []

    let ultimo = false;

    for (const f of fracoesContainer) {
        let preenchidos = f.querySelectorAll('.preenchido').length;
        let vazios = f.querySelectorAll('.vazio').length;
        let numerador = f.querySelector('.numerador');
        let denominador = f.querySelector('.denominador');

        let numeradorValue = parseInt(numerador.value);
        let denominadorValue = parseInt(denominador.value);

        numerador.classList.remove('certo', 'errado', 'meio-certo');
        denominador.classList.remove('certo', 'errado', 'meio-certo');

        let divisaoCirculo = parseFloat((preenchidos / (preenchidos + vazios)).toPrecision(8));
        let divisaoFracao = parseFloat((numeradorValue / denominadorValue).toPrecision(8));
        let escolha;

        if (preenchidos > 0) {
            escolha = divisaoCirculo;
        } else {
            escolha = divisaoFracao;
        }

        if (f != circuloCustomizavel.div) {

            if (divisaoCirculo == divisaoFracao) {
                numerador.classList.add('certo');
                denominador.classList.add('certo');
            } else {
                numerador.classList.add('errado');
                denominador.classList.add('errado');
            }

            if (f != fracoesContainer[fracoesContainer.length - 1]) {
                respostas.unshift(escolha);
            } else {
                respostas.push(escolha);
            }
        }
        if (f == circuloCustomizavel.div) {
            if (f == fracoesContainer[fracoesContainer.length - 1]) {                
                ultimo = true;
                let total = 0
                for (const x of respostas) {                    
                    total += x                    
                };
                if (parseFloat(divisaoFracao.toFixed(6)) == parseFloat(total.toFixed(6))) {
                    numerador.classList.add('meio-certo');
                    denominador.classList.add('meio-certo');
                    if (divisaoCirculo == divisaoFracao || numeradorValue > denominadorValue) {
                        numerador.classList.add('certo');
                        denominador.classList.add('certo');
                        numerador.classList.remove('meio-certo');
                        denominador.classList.remove('meio-certo');
                    }
                } else {
                    numerador.classList.add('errado');
                    denominador.classList.add('errado');
                }
            }
        }
    };

    if (!ultimo) {
        let preenchidos = circuloCustomizavel.div.querySelectorAll('.preenchido').length;
        let vazios = circuloCustomizavel.div.querySelectorAll('.vazio').length;
        let numerador = circuloCustomizavel.div.querySelector('.numerador');
        let denominador = circuloCustomizavel.div.querySelector('.denominador');

        let numeradorValue = parseInt(numerador.value);
        let denominadorValue = parseInt(denominador.value);

        let divisaoCirculo = parseFloat((preenchidos / (preenchidos + vazios)).toPrecision(6));
        let divisaoFracao = parseFloat((numeradorValue / denominadorValue).toPrecision(6));

        respostas.unshift(divisaoFracao);

        let total = 0
        respostas.forEach((x, i) => {
            if (i == respostas.length - 1) {
                if (parseFloat(total.toFixed(6)) == parseFloat(x.toFixed(6))) {
                    numerador.classList.add('meio-certo');
                    denominador.classList.add('meio-certo');
                    if (divisaoCirculo == divisaoFracao || numeradorValue < 0 || numeradorValue > denominadorValue) {
                        numerador.classList.add('certo');
                        denominador.classList.add('certo');
                        numerador.classList.remove('meio-certo');
                        denominador.classList.remove('meio-certo');
                    }
                } else {
                    numerador.classList.add('errado');
                    denominador.classList.add('errado');
                }
            }
            total += x;
        });
    }

    // Verifica se tudo está correto
    let temErrado = false;
    for (const f of fracoesContainer) {
        const num = f.querySelector('.numerador');
        const den = f.querySelector('.denominador');
        if (num.classList.contains('errado') || den.classList.contains('errado')) {
            temErrado = true;
            break;
        }
    }

    if (!temErrado) {
        vitoriaContainer.showModal();
    }

}

function criarFracoes() {
    for (const f of fracoesContainer) {

        let cor = cores[Math.floor(Math.random() * cores.length)];

        let qtd = Math.floor(Math.random() * 9 + 2);

        let angulo = 360 / qtd;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");

        const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);

        svg.appendChild(circle);

        let c = 0
        for (let x = 0; x < qtd; x++) {
            const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            path.classList.add('area');

            let rng = Math.floor(Math.random() * 6 + 1);
            if (f.classList.contains('pintado') && (rng > 4 || (x == qtd - 1 && c == 0))) {
                path.classList.add(cor);
                path.classList.add('preenchido');
                c++
            } else {
                path.classList.add('vazio');
            };
            if (f.classList.contains('pintavel')) {
                path.classList.add('podePintar');
                pintar(path)
                circuloCustomizavel.lados = qtd;
                circuloCustomizavel.div = f;
                quantidadeContainer.innerHTML = qtd;
            };
            path.setAttribute('d', `M${cx},${cy} \n
                L${cx + r * Math.cos((Math.PI * angulo / 180) * x)},${cy + r * Math.sin((Math.PI * angulo / 180) * x)} \n 
                A ${r},${r} 0,0,1 \n
                ${cx + r * Math.cos((Math.PI * angulo / 180) * (x + 1))},${cy + r * Math.sin((Math.PI * angulo / 180) * (x + 1))} \n
                L${cx},${cy}`);
            svg.appendChild(path);
        }
        f.prepend(svg);
    }
}

criarFracoes()
fracaoEquivalente()

// <path d="M115,115 L115,5 A110,110 1 0,1 100,30 z"></path>