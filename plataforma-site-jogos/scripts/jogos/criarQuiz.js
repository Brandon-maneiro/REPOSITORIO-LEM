const adicionarButton = document.getElementById('adicionar-img');
const adicionarRespostaBtn = document.getElementById('adicionar-resposta');
const removerButtons = document.getElementsByClassName('remover');
const editarButtons = document.getElementsByClassName('editar');
const telaEdicao = document.getElementById('editar-pergunta-container');
const fecharEdicao = document.getElementById('fechar-edicao');
const tabela = document.getElementById('corpo-tabela');
const radioBtns = document.querySelectorAll('input[type=radio]');

let editando;

addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
        e.preventDefault();
    };
});

// ADICIONAR LINHA NA TABELA
adicionarButton.addEventListener('click', () => {
    const tRow = document.createElement('tr');
    const tDataN = document.createElement('td');
    const tData1 = document.createElement('td');
    const tData2 = document.createElement('td');

    tDataN.innerText = tabela.children.length;

    const pergunta = document.createElement('div');
    pergunta.classList.add('pergunta');

    const perguntaInput = document.createElement('input');
    perguntaInput.type = 'text';
    perguntaInput.name = 'perguntas';
    perguntaInput.classList.add('invisivel');

    const perguntaDiv = document.createElement('div');
    perguntaDiv.classList.add('perguntaDiv');

    pergunta.append(perguntaInput, perguntaDiv);

    const respostas = document.createElement('div');
    respostas.classList.add('respostas', 'invisivel');

    for (let x = 0; x < 6; x++) {
        let resposta = document.createElement('input');
        resposta.type = 'text';
        resposta.name = 'respostas';
        resposta.classList.add('resposta');
        respostas.append(resposta);
    }

    const respostaCerta = document.createElement('input');
    respostaCerta.type = 'text';
    respostaCerta.name = 'respostasCertas';
    respostaCerta.classList.add('resposta-certa', 'invisivel');

    tData1.append(pergunta, respostas, respostaCerta);

    const lapis = document.createElement('img');
    lapis.src = '../../imagens/icones/lapis2.png';
    lapis.tabIndex = '0';
    lapis.addEventListener('click', () => { editarPergunta(lapis.parentNode.parentNode.parentNode) });
    lapis.addEventListener('keydown', (e) => {adicionarClickOnFocus(lapis, e)});

    const lixo = document.createElement('img');
    lixo.src = '../../imagens/icones/lixo.png';
    lixo.tabIndex = '0';
    lixo.addEventListener('click', () => { removerButton(lixo) });
    lixo.addEventListener('keydown', (e) => {adicionarClickOnFocus(lixo, e)});

    const div = document.createElement('div');
    div.classList.add('img-container');
    div.append(lapis, lixo);

    tData2.append(div);

    tRow.append(tDataN, tData1, tData2);

    tabela.insertBefore(tRow, tabela.children[tabela.children.length - 1]);
})

// EVENTO PARA REMOVER LINHA
for (const btn of removerButtons) {
    btn.addEventListener('click', () => removerButton(btn));
}
function removerButton(btn) {
    if (confirm('Tem certeza?')) btn.parentNode.parentNode.parentNode.remove();
}

// EVENTO PARA EDITAR LINHA
for (const btn of editarButtons) {
    btn.addEventListener('click', () => editarPergunta(btn.parentNode.parentNode.parentNode));
}

function adicionarClickOnFocus(div, event) {
    if (event.code == 'Space' || event.code == 'Enter') {
        if (div.matches(':focus')) {
            div.click();
        }
    }
}

for (const btn of radioBtns) {
    btn.addEventListener('keydown', (e) => {adicionarClickOnFocus(btn, e)});
}

adicionarButton.addEventListener('keydown', (e) => {adicionarClickOnFocus(adicionarButton, e)});
removerButtons[0].addEventListener('keydown', (e) => {adicionarClickOnFocus(removerButtons[0], e)});
editarButtons[0].addEventListener('keydown', (e) => {adicionarClickOnFocus(editarButtons[0], e)});
adicionarRespostaBtn.addEventListener('keydown', (e) => {adicionarClickOnFocus(adicionarRespostaBtn, e)});

function editarPergunta(btn) {
    editando = btn;
    telaEdicao.style['display'] = 'flex';
    telaEdicao.querySelector('#pergunta').value = btn.querySelector('.pergunta').innerText;
    let c = 0;
    let vazio = false;
    for (const r of btn.querySelector('.respostas').children) {
        if (vazio) {
            let newDiv = document.createElement('div');
            telaEdicao.querySelector('#respostas-container').children[c].replaceWith(newDiv);
        } else {
            if (r.value != '') {
                if (!telaEdicao.querySelector('#respostas-container').children[c].querySelector('input[type=text]')) {
                    adicionarResposta();
                }
                if (telaEdicao.querySelector('#respostas-container').children[c].querySelector('input[type=radio]')) {
                    telaEdicao.querySelector('#respostas-container').children[c].querySelector('input[type=radio]').checked = false;
                    if (r.value == btn.querySelector('.resposta-certa').value) {
                        telaEdicao.querySelector('#respostas-container').children[c].querySelector('input[type=radio]').checked = true;
                    }
                }

                telaEdicao.querySelector('#respostas-container').children[c].querySelector('input[type=text]').value = r.value;
            } else if (c > 1) {
                vazio = true;
                let newDiv = document.createElement('div');
                newDiv.appendChild(adicionarRespostaBtn);
                telaEdicao.querySelector('#respostas-container').children[c].replaceWith(newDiv);
            } else {
                telaEdicao.querySelector('#respostas-container').children[c].querySelector('input[type=text]').value = '';
            }
        }
        c++
    }
}

fecharEdicao.addEventListener('click', () => {
    let canClose = false;
    for (const input of telaEdicao.querySelectorAll('input[type=radio]')) {
        if (input.checked) {
            canClose = true;
        }
    }

    if (canClose) {
        telaEdicao.style['display'] = 'none';

        editando.querySelector('.perguntaDiv').innerText = telaEdicao.querySelector('#pergunta').value;
        editando.querySelector('.pergunta').querySelector('input[type=text]').value = telaEdicao.querySelector('#pergunta').value;
        let c = 0;
        for (const r of editando.querySelector('.respostas').children) {
            if (telaEdicao.querySelector('#respostas-container').children[c] && telaEdicao.querySelector('#respostas-container').children[c].querySelector('input[type=radio]') && telaEdicao.querySelector('#respostas-container').children[c].querySelector('input[type=radio]').checked) {
                editando.querySelector('.resposta-certa').value = telaEdicao.querySelector('#respostas-container').children[c].querySelector('input[type=text]').value;
            }
            if (telaEdicao.querySelector('#respostas-container').children[c] && telaEdicao.querySelector('#respostas-container').children[c].querySelector('input[type=text]')) {
                r.value = telaEdicao.querySelector('#respostas-container').children[c].querySelector('input[type=text]').value;
            } else {
                r.value = '';
            }
            c++
        }
    }
})

// EVENTO PARA REMOVER RESPOSTA
const lixo = document.createElement('div');
lixo.classList.add('lixo');
const lixoImg = document.createElement('img');
lixoImg.src = '../../imagens/icones/xis.png';
lixo.appendChild(lixoImg);

lixo.addEventListener('click', () => {
    lixo.parentNode.parentNode.appendChild(document.createElement('div'))
    if (!lixo.parentNode.parentNode.querySelector('#adicionar-resposta')) {
        lixo.parentNode.parentNode.lastChild.appendChild(adicionarRespostaBtn);
    }
    if (lixo.parentNode.previousElementSibling == lixo.parentNode.parentNode.children[1]) {
        lixo.parentNode.remove();
    } else {
        lixo.parentNode.previousElementSibling.appendChild(lixo);
        lixo.parentNode.nextElementSibling.remove();
    }
})

// EVENTO PARA ADICIONAR RESPOSTA
adicionarRespostaBtn.addEventListener('click', () => {
    adicionarResposta();
})

function adicionarResposta() {
    const indexOfButton = Array.from(adicionarRespostaBtn.parentNode.parentNode.children).indexOf(adicionarRespostaBtn.parentNode)

    if (!adicionarRespostaBtn.parentNode.parentNode.querySelector('.lixo')) {
        adicionarRespostaBtn.parentNode.parentNode.appendChild(lixo);
    };

    const respostaId = 'resposta' + (indexOfButton + 1);
    const label = document.createElement('label');
    label.htmlFor = respostaId;
    label.innerText = 'Resposta ' + (indexOfButton + 1);

    const inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.id = respostaId;

    const inputRadio = document.createElement('input');
    inputRadio.type = 'radio';
    inputRadio.name = 'resposta-radio';
    inputRadio.addEventListener('keydown', (e) => {adicionarClickOnFocus(inputRadio, e)})

    adicionarRespostaBtn.parentNode.append(label, lixo, inputText, inputRadio);

    if (adicionarRespostaBtn.parentNode.parentNode.children[indexOfButton + 1]) {
        adicionarRespostaBtn.parentNode.parentNode.children[indexOfButton + 1].append(adicionarRespostaBtn);
    } else {
        adicionarRespostaBtn.remove();
    }
}