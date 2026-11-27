const jogos = document.querySelectorAll('.jogo');
const pesquisaInput = document.querySelector('#pesquisar-input');

console.log(pesquisaInput)

if (pesquisaInput) {
    pesquisaInput.addEventListener('input', (e) => {
        if (pesquisaInput.value == ""){
            for (const jogo of jogos){
                jogo.style.display = "block"
            }
        } else {
            for (const jogo of jogos){
                if (!jogo.querySelector('.titulo').innerHTML.toLocaleLowerCase().includes(pesquisaInput.value.toLocaleLowerCase())){
                    jogo.style.display = "none"
                } else {
                    jogo.style.display = "block"
                }
            }
        }        
    })
}