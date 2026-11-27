const data = JSON.parse(test);

const resultadosTableTBody = document.querySelector('.resultados');

const pesos = {tabuada: 3.5, questionario: 6.5};

const results = {
    /* { nome,
    pontuacao_tabuada,
    pontuacao_questionario,
    media } */
}

function calcularMediaPonderada(nota1, peso1, nota2, peso2) {
    return ((nota1 * peso1) + (nota2 * peso2)) / (peso1 + peso2);
}

// COLOCA APENAS OS DADOS NECESSARIO EM UM OBJETO
for (const d of data) {    
    if (results[d.usuarioId]) {
        if (results[d.usuarioId]['pontuacao_' + d.jogoNome]) {
            if (parseInt(results[d.usuarioId]['pontuacao_' + d.jogoNome]) < parseInt(d.pontuacao)) {
                results[d.usuarioId]['pontuacao_' + d.jogoNome] = parseInt(d.pontuacao) - Math.floor(d.erros / 2);
            };
        } else {
            results[d.usuarioId]['pontuacao_' + d.jogoNome] = parseInt(d.pontuacao) - Math.floor(d.erros / 2);
        };
    } else {
        if (d.jogoNome == 'tabuada' && d.jogoId == '1') {
            results[d.usuarioId] = {
                nome: d.nome,
                pontuacao_tabuada: parseInt(d.pontuacao) - Math.floor(d.erros / 2),
            }
        } else if (d.jogoNome == 'questionario' && d.jogoId == '27') {
            results[d.usuarioId] = {
                nome: d.nome,
                pontuacao_questionario: d.pontuacao,
            };
        };
    };
};

// CALCULA AS MÉDIAS E INSERE A MEDIA E O ID EM UMA LISTA
for (const u in results) {
    if (results[u].pontuacao_questionario && results[u].pontuacao_tabuada) {
        results[u].media = calcularMediaPonderada(results[u].pontuacao_tabuada, pesos.tabuada, results[u].pontuacao_questionario, pesos.questionario);        
    };
};

// ORGANIZA OS RESULTADOS
const finalResults = Object.values(results).sort((a, b) => {
    if (a.media < b.media) return 1;
    if (a.media > b.media) return -1;
    return 0;
})

for (const pont in finalResults) {
    const tr = document.createElement('tr');
    const tdPos = document.createElement('td');
    const tdNome = document.createElement('td');
    const tdTabuada = document.createElement('td');
    const tdQuestionario = document.createElement('td');
    const tdMedia = document.createElement('td');

    tdPos.innerText = resultadosTableTBody.children.length + 1;
    tdNome.innerText = finalResults[pont].nome;
    tdTabuada.innerText = finalResults[pont].pontuacao_tabuada;
    tdQuestionario.innerText = finalResults[pont].pontuacao_questionario;
    tdMedia.innerText = finalResults[pont].media;

    tr.append(tdPos, tdNome, tdTabuada, tdQuestionario, tdMedia);
    resultadosTableTBody.appendChild(tr)
}




