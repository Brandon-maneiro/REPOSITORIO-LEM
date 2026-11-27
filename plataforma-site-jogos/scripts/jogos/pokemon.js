const opcoes = document.querySelectorAll('.opcao');

const mainContainer = document.querySelector('.main-pokemon-container');

const inimigoVida = document.querySelector('.inimigo-vida');
const inimigoImg = document.querySelector('.inimigo-img');
const jogadorVida = document.querySelector('.jogador-vida');
const jogadorImg = document.querySelector('.jogador-img');

const opcoesContainer = document.querySelector('.opcoes-container');
const textoDescricaoContainer = document.querySelector('.texto-descricao-container');
const ataquesContainer = document.querySelector('.ataques-container');
const ataqueStatusContainer = document.querySelector('.ataque-status-container');

for (const op of opcoes) {
    op.addEventListener('click', () => {
        if (op.classList.contains('lutar')) {
            opcoesContainer.classList.toggle('invisivel');
            textoDescricaoContainer.classList.toggle('invisivel');
            ataquesContainer.classList.toggle('invisivel');
            ataqueStatusContainer.classList.toggle('invisivel');
        };
    });
};

mainContainer.oncontextmenu = (e) => {
    opcoesContainer.classList.remove('invisivel');
    textoDescricaoContainer.classList.remove('invisivel');
    ataquesContainer.classList.add('invisivel');
    ataqueStatusContainer.classList.add('invisivel');
    e.preventDefault()
};