const adicionarButton = document.getElementById('adicionar-img');
const removerButtons = document.getElementsByClassName('remover');
const editarButtons = document.getElementsByClassName('editar');
const telaEdicao = document.getElementById('editar-pergunta-container-combinacao');
const fecharEdicao = document.getElementById('fechar-edicao');
const tabela = document.getElementById('corpo-tabela');

let editando;

// ADICIONAR LINHA NA TABELA
adicionarButton.addEventListener('click', () => {
    // NOVA LINHA NA TABELA
    const tRow = document.createElement('tr');
    const tDataN = document.createElement('td');
    // PRIMEIRA COLUNA COM A PERGUNTA E AS RESPOSTAS INVISIVEIS
    const tData1 = document.createElement('td');
    // SEGUNDA COLUNA COM OS INCONES DE EDIÇÃO
    const tData2 = document.createElement('td');

    tDataN.innerText = tabela.children.length;

    const pergunta = document.createElement('div');
    pergunta.classList.add('pergunta');

    const perguntaDiv = document.createElement('div');
    perguntaDiv.classList.add('perguntaDiv');

    const perguntas = document.createElement('input');
    perguntas.type = 'text';
    perguntas.name = 'perguntas';
    perguntas.classList.add('perguntas', 'invisivel');

    const respostas = document.createElement('input');
    respostas.type = 'text';
    respostas.name = 'respostas';
    respostas.classList.add('respostas', 'invisivel');

    pergunta.append(perguntaDiv, perguntas, respostas);

    tData1.append(pergunta);

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
    btn.addEventListener('click', () => editarPergunta(btn.parentNode.parentNode.parentNode))
}

function adicionarClickOnFocus(div, event) {
    if (event.code == 'Space' || event.code == 'Enter') {
        if (div.matches(':focus')) {
            div.click();
        }
    }
}

adicionarButton.addEventListener('keydown', (e) => {adicionarClickOnFocus(adicionarButton, e)});
removerButtons[0].addEventListener('keydown', (e) => {adicionarClickOnFocus(removerButtons[0], e)});
editarButtons[0].addEventListener('keydown', (e) => {adicionarClickOnFocus(editarButtons[0], e)});

function editarPergunta(btn) {
    editando = btn
    telaEdicao.style['display'] = 'flex';
    telaEdicao.querySelector('#pergunta').value = btn.querySelector('.pergunta').innerText;  
    telaEdicao.querySelector('#resultado').value = btn.querySelector('.respostas').value;
}

fecharEdicao.addEventListener('click', () => {     
    telaEdicao.style['display'] = 'none';
    editando.querySelector('.perguntaDiv').innerText = telaEdicao.querySelector('#pergunta').value;
    editando.querySelector('.perguntas').value = telaEdicao.querySelector('#pergunta').value;
    editando.querySelector('.respostas').value = telaEdicao.querySelector('#resultado').value;    
})
