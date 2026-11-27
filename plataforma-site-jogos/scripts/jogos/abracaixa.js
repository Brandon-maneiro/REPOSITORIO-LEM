(async () => {

  const jsonUrl = new URL('./caixas/caixa1.json', import.meta.url).href;

  let perguntasRaw;
  try {
    const res = await fetch(jsonUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`Falha ao carregar JSON: ${res.status} ${res.statusText}`);
    perguntasRaw = await res.json();
  } catch (err) {
    console.error("Erro ao buscar o JSON de perguntas:", err);
    return;
  }

  const perguntas = {};
  Object.keys(perguntasRaw).forEach((k) => {
    const p = perguntasRaw[k] || {};
    perguntas[k] = {
      pergunta: p.pergunta ?? p.question ?? "",
      respostas: p.respostas ?? p.alternativas ?? p.options ?? [],
      resposta: p.resposta ?? p.answer ?? ""
    };
  });

  const caixa = document.getElementById('caixa');
  const fullscreen = document.getElementById('fullscreen');
  const exitFs = document.getElementById('exit-fullscreen');
  const perguntasDivs = document.querySelectorAll('.pergunta-div');
  const capas = document.querySelectorAll('.capa');
  const voltarIcon = document.getElementsByClassName('voltar')[0];

  const perguntasContainer = document.getElementById('perguntas-container');
  const perguntandoContainer = document.getElementById('perguntando-container');
  const resultadoContainer = document.getElementById('resultado-container');

  const acertoSoundEffect = new Audio(new URL('/sounds/stars.wav', import.meta.url).href);
  const erroSoundEffect = new Audio(new URL('/sounds/long_buzz.wav', import.meta.url).href);

  erroSoundEffect.volume = 0.1;
  acertoSoundEffect.volume = 0.3;

  let perguntaAtual = "";
  let click = false;

  function carregarPerguntas() {
    let c = 1;
    for (const p of perguntasContainer.querySelectorAll('.pergunta-div')) {
      if (perguntas[c]) {
        p.querySelector('.pergunta p').innerHTML = perguntas[c].pergunta;
      } else {
        p.querySelector('.pergunta').innerHTML = "";
      }
      c++;
    }
  }

  carregarPerguntas();

  for (const capa of capas) {
    capa.addEventListener('click', (e) => {
      if (!click && capa.classList.contains('fechado')) {
        capa.classList.replace('fechado', 'clicado');
        click = true;
        for (const test of perguntasDivs) {
          if (test.getElementsByClassName('capa')[0] != capa) {
            test.classList.add('invisivel');
          } else {
            perguntaAtual = Array.prototype.indexOf.call(perguntasContainer.children, test) + 1;

            const pObj = perguntas[perguntaAtual];
            if (!pObj) {
              console.error("Pergunta não encontrada:", perguntaAtual);
              return;
            }

            perguntandoContainer.querySelector("#pergunta").innerHTML = "<p>" + pObj.pergunta + "</p>";

            let c = 0;
            for (const alternativa of perguntandoContainer.querySelectorAll('.respostas')) {
              alternativa.innerHTML = pObj.respostas[c] ?? "";
              alternativa.onclick = () => {
                if (alternativa.innerHTML == pObj.resposta) {
                  alternativa.classList.add('certo');
                  perguntasContainer.children[perguntaAtual - 1].getElementsByClassName('capa')[0].classList.replace('clicado', 'certo');
                  acertoSoundEffect.play();
                } else {
                  alternativa.classList.add('errado');
                  perguntasContainer.children[perguntaAtual - 1].getElementsByClassName('capa')[0].classList.replace('clicado', 'errado');
                  erroSoundEffect.play();
                }
              };
              c++;
            }

            test.classList.add('zoom');
            test.addEventListener('animationend', (e) => {
              if (e.animationName == "pergunta-click") {
                perguntasContainer.style.display = "none";
                perguntandoContainer.style.display = "grid";
                voltarIcon.classList.remove('hidden');
              }
            });
          }
        }
      }
    });
  }

  voltarIcon.addEventListener('click', () => {
    click = false;
    for (const pergunta of perguntasDivs) {
      pergunta.className = "pergunta-div";
      pergunta.querySelector('.capa').classList.replace('clicado', 'fechado');
      perguntandoContainer.style.display = "none";
      perguntasContainer.style.display = "flex";
      voltarIcon.classList.add('hidden');
    }
    for (const resposta of perguntandoContainer.querySelectorAll('.respostas')) {
      resposta.classList.remove('errado');
      resposta.classList.remove('certo');
    }
    checarVitoria();
  });

  function checarVitoria() {
    let acertos = perguntasContainer.querySelectorAll('.certo').length;
    let erros = perguntasContainer.querySelectorAll('.errado').length;
    if (acertos + erros == perguntasContainer.children.length) {

      resultadoContainer.querySelector('#acerto').innerHTML = acertos;
      resultadoContainer.querySelector('#total').innerHTML = acertos + erros;
      resultadoContainer.style['display'] = 'flex';

      const data = {
        jogo: 'caixas',
        pontuacao: acertos,
        erros: erros,
        total: acertos + erros,
      };

      fetch('/inserirPontuacaoSimples', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    }
  }

  fullscreen.addEventListener('click', () => {
    caixa.requestFullscreen();
  });

  exitFs.addEventListener('click', () => {
    document.exitFullscreen();
  });

  function checkFullScreen() {
    if (!caixa.matches(':fullscreen')) {
      perguntandoContainer.querySelector('#pergunta').style.fontSize = "1.8vmin";
      for (const pergunta of perguntasContainer.querySelectorAll('.pergunta')) {
        pergunta.style.fontSize = "0.92vmin";
      }
      for (const resposta of perguntandoContainer.querySelectorAll('.respostas')) {
        resposta.style.fontSize = "2.5vmin";
      }
      exitFs.classList.add('hidden');
      fullscreen.classList.remove('hidden');
    } else {
      perguntandoContainer.querySelector('#pergunta').style.fontSize = "2.7vmin";
      for (const pergunta of perguntasContainer.querySelectorAll('.pergunta')) {
        pergunta.style.fontSize = "1.38vmin";
      }
      for (const resposta of perguntandoContainer.querySelectorAll('.respostas')) {
        resposta.style.fontSize = "4.5vmin";
      }
      fullscreen.classList.add('hidden');
      exitFs.classList.remove('hidden');
    }
  }

  setInterval(checkFullScreen, 100);

})();
