// JSON COM OS JOGOS DO SITE (A REPENSAR)
const jogos = {
    'questionario': {
        nome: 'Questionários',
        imagem: '/imagens/capas/quiz.PNG',
        descricao: 'Responda as perguntas clicando nas alternativas',
        feito: 'João',
        href: 'questoes',
        rank: false,
    },
    'tabuada': {
        nome: 'Tabuada',
        imagem: '/imagens/capas/tabuada.png',
        descricao: 'Acerte o máximo de valores que conseguir da tabuada',
        feito: 'João',
        rank: true,
        href: 'tabuada'
    },    
    'combinar': {
        nome: 'Combinar',
        imagem: '/imagens/capas/combinar.png',
        descricao: '',  
        feito: 'João',
        rank: false,
        href: 'combinar'
    },
    'caixas': {
        nome: 'Caixas',
        imagem: '/imagens/capas/caixas/provas_ifrs.PNG',
        descricao: 'Acerte as perguntas das caixas',
        feito: 'João & Diana',
        rank: false,
        href: 'caixas'
    },
    'maiormenor': {
        nome: 'Maior Menor',
        imagem: '/imagens/capas/maiormenor.png',
        descricao: 'Compare os valores e diga qual é o maior',
        feito: 'João & Diego',
        rank: false,
        href: 'maior-e-menor'
    },
    'fracoes': {
        nome: 'Frações',
        imagem: '/imagens/capas/fracoes/descubra_1.png',
        descricao: '',
        feito: 'João & Diego',
        rank: false,
        href: 'fracoes'
    },
    'notacaocientifica': {
        nome: 'Notação Científica',
        imagem: '/imagens/capas/notacao.PNG',
        descricao: '',
        feito: 'João',        
        href: 'notacao-cientifica'
    },
    'torrehanoi': {
        nome: 'Torre de Hanoi',
        imagem: '/imagens/capas/hanoi.png',
        descricao: 'Mova a torre de um pilar ao outro',
        feito: 'João',
        rank: true,
        href: 'hanoi'
    },    
    'organizefrascos': {
        nome: 'Organize os frascos',
        imagem: '/imagens/capas/organizar_frascos.png',
        descricao: '',
        feito: 'João',
        rank: false,
        href: 'frascos'
    },
    'setgame': {
        nome: 'Set Game',
        imagem: '/imagens/capas/setgame.png',
        descricao: 'Combine padrões com cartas',
        feito: 'João & Diego',
        rank: false,
        href: 'setGame'
    },
    'jogodamemoria': {
        nome: 'Jogo da Memória',
        imagem: '/imagens/capas/memoria/memoria1.png',
        descricao: 'Clique nas cartas iguais',
        feito: 'João',
        rank: false,        
        href: 'memoria'
    },
    'jogo2048': {
        nome: '2048',
        imagem: '/imagens/capas/20482.PNG',
        descricao: 'Tente fazer um bloco com o valor de 2048',
        feito: 'João & Diego',
        rank: true,
        href: '2048'
    },
    
    
    'descubraoperacao': {
        nome: 'Descubra a operação',
        imagem: '/imagens/capas/operacao.PNG',
        descricao: 'Coloque os sinas e os valores que realizam a operação',
        feito: 'João',
        rank: false,
        href: 'operacao'
    },
    'genius': {
        nome: 'Genius',
        imagem: '/imagens/capas/genius.png',
        descricao: 'Memorize o padrão e faça-o novamente',
        feito: 'João',
        rank: true,
        href: 'genius'
    },
    'jogodavelha': {
        nome: 'Jogo da Velha',
        imagem: '/imagens/capas/jogoDaVelha.PNG',
        descricao: 'O primeiro jogador a fazer uma sequência de 3 X ou O ganha',
        feito: 'João',
        href: 'velha'
    },
    'nonogram': {
        nome: 'Nonogram',
        imagem: '/imagens/capas/nonogram/n5x5.jpg',
        descricao: 'Pinte a grid com base nos números a volta',
        feito: 'João',
        rank: true,
        href: 'nonogram'
    },
    'luzes': {
        nome: 'Luzes Apagadas',
        imagem: '/imagens/capas/luzes.png',
        descricao: '',
        feito: 'João',
        rank: false,
        href: 'luzes'
    },
    'vitral': {
        nome: 'Vitral',
        imagem: '/imagens/capas/vitral.png',
        descricao: '',
        feito: 'João',
        rank: false,
        href: 'vitral'
    },
    /* 'encanador': {
        nome: 'Encanador',
        imagem: '../imagens/capas/luzes.png',
        descricao: '',
        feito: 'João',
        rank: false,
        href: 'encanador'
    }, */
    'damas': {
        nome: 'Damas',
        imagem: '/imagens/capas/damas.PNG',
        descricao: 'O jogador que eliminar todas as peças do outro vence',
        feito: 'João',
        rank: false,
        href: 'damas'
    },
    'brickbreaker': {
        nome: 'Brick Breaker',
        imagem: '/imagens/capas/brickBreak.PNG',
        descricao: 'Mova a plataforma e não deixe a bola cair',
        feito: 'João',
        rank: true,
        href: 'brick-breaker'
    },
    'pokemon': {
        nome: 'Jornada Pokemon',
        imagem: '/imagens/capas/snake.PNG',
        descricao: 'Venca as equações utilizando golpes super efetivos',
        feito: 'João & Diego',
        rank: false,
        href: 'pokemon'
    },
    'snake': {
        nome: 'Snake',
        imagem: '/imagens/capas/snake.PNG',
        descricao: 'Coma o máximo que conseguir',
        feito: 'João',
        rank: true,
        href: 'snake'
    },
    'tetris': {
        nome: 'Tetris',
        imagem: '/imagens/capas/tetris.PNG',
        descricao: 'Preencha uma linha por completo para pontuar',
        feito: 'João',
        rank: true,
        href: 'tetris'
    },
    'analisecombinatoria': {
        nome: 'Analise Combinatoria',
        imagem: '/imagens/capas/capa-analise-combinatoria.PNG',
        descricao: 'Jogos de analise combinatória',
        feito: 'Sandro',
        rank: false,
        href: 'analise-combinatoria'
    },
    
}

// MODULO PARA RODAR O SERVIDOR
const express = require('express');
const app = express();

// MODULO QUE PARA ARMAZENAR DADOS GLOBAIS
const session = require('express-session');

// MODULO PARA UTILIZAÇÃO DE IMAGENS
const multer = require('multer');
const forms = multer();

// MODULO QUE PEGA OS DADOS DOS FORMULARIOS
const bodyParser = require('body-parser');

// MODULO QUE FAZ CONEXÃO COM MYSQL
const mysql = require('mysql');

// MODULO QUE MODIFICA ARQUIVOS
const fs = require('fs');

// CRIAÇÃO DA CONEXÃO MYSQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jogosdolem"
});
conexao.connect(function (err) {
    if (err) throw err;
    console.log("Banco de Dados Conectado");
});

// DEFINIÇÃO DAS PÁGINAS PADRÕES PARA EJS
app.set('view engine', 'ejs');

// DEFINE O CAMINHO DOS ARQUIVOS DO SERVIDOR PARA O DIRETÓRIO ATUAL
app.use(express.static(__dirname));

// ADQUIRE MAIS INFORMAÇÕES DO BODY-PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(forms.array());

app.use(express.urlencoded({ extended: true }));

// CHAVE PARA CRIPTOGRAFIA DOS DADOS
app.use(session({secret: 'Mppy46m#KY1CXuOSDm8NlHo9x', resave: false, saveUninitialized: false}));

// DEFINE GLOBALMENTE UM NOME DE USUARIO
app.use((req, res, next) => {
    res.locals.user = req.session.nome;
    next();
})

// INICIA O SERVIDOR NA PORTA 3000
const { exec } = require('child_process');

app.listen(3000, () => {
    exec(`start "" "http://localhost:3000"`)
    console.log('Servidor rodando no endereço: http://localhost:3000');
    //console.log('Servidor rodando no endereço: 10.0.0.213:3000')
})

// IMPORTAÇÃO DOS OBJETOS
const Usuario = require('./models/Usuario.js');
const Questionario = require('./models/Questionario.js');
const Pontuacao = require('./models/Pontuacao.js');
const Tabuada = require('./models/Tabuada.js');
const Nonogram = require('./models/Nonogram.js');
const Combinar = require('./models/Combinar.js');

// --------------------------------------------------------------------------
// FUNÇÕES USUARIO

app.post('/cadastroAction', (req, res) => {
    const u = new Usuario();
    const { nome, email, senha, confirmar_senha } = req.body;

    if (nome == '' || email == '' || senha == '' || confirmar_senha == '') {
        res.render('cadastro', {errormessage: 'Preencha todos os campos.'});
        res.end();
        return
    }

    if (senha != confirmar_senha) {
        res.render('cadastro', {errormessage: 'As senhas estão diferentes.'});
        res.end();
        return
    }

    u.nome = nome;
    u.email = email;
    u.senha = senha;
    u.permissao = 'aluno'

    u.getEmail(conexao, (result) => {
        if (result.length > 0) {
            res.render('cadastro', {errormessage: 'O email digitado já está em uso.'});
            res.end();
            return
        } else {            
            u.inserir(conexao);

            req.session.nome = nome;
            req.session.email = email;

            res.render('login', {successmessage: 'Usuário cadastrado com sucesso!', errormessage: ''});
            res.end();
        }
    })
    
})

app.post('/loginAction', (req, res) => {
    const u = new Usuario();
    const {email, senha} = req.body;

    if (email == '' || senha == '') {
        res.render('login', {successmessage: '', errormessage: 'Preencha todos os campos.'});
        res.end();
        return
    }

    u.email = email;
    u.senha = senha;

    u.getLogin(conexao, (result) => {
        if (result.length > 0) {
            req.session.loggedin = true;
            req.session.nome = result[0].nome;
            req.session.email = email;
            req.session.permissao = result[0].permissao;
            req.session.caixas = 0;
            res.redirect('/');
            res.end();
        } else {
            res.render('login', {successmessage: '', errormessage: 'Conta não existe.'});
            res.end();
        }
    })

})

// --------------------------------------------------------------------------
// FUNÇÕES QUIZ

app.get('/getQuizes', (req, res) => {
    const query = conexao.query('select * from quizes', (err, resJSON) => {
        if (err) throw err;
        res.json(resJSON);
    })
})

app.get('/endQuiz', (req, res) => {
    res.render("jogos/endQuiz", req.query);
})

app.get('/questoes', (req, res) => {
    let q = new Questionario();

    q.listar(conexao, (data) => {
        res.render('jogos/questoes', {quizes: data})
    });
});

app.get('/quiz', (req, res) => {
    res.render('jogos/questoes/quiz');
});

app.get('/questoes/:quizId', (req, res) => {
    let q = new Questionario();

    q.getQuiz(conexao, req.params.quizId, (data) => {
        res.render('jogos/questoes/questionario', {quiz: data[0]})
    });
});

app.post('/criarQuiz', (req, res) => {
    let {nomeQuestionario, descricao, nomeAutor, respostas, respostasCertas, perguntas} = req.body;

    let q = new Questionario();

    const perguntasObj = {};
    if (!Array.isArray(perguntas)) {
        perguntas = [perguntas];
        respostasCertas = [respostasCertas];
    }

    perguntas.forEach((p, index) => {
        let respostasArray = [];
        for (let x = 0; x < 6; x++) {
            respostasArray.push(respostas[(index * 6) + x]);
        }
        perguntasObj[index] = {
            pergunta: p,
            respostas: respostasArray,
            respostaCerta: respostasCertas[index]
        }
    });

    q.nome = nomeQuestionario;
    q.descricao = descricao;
    q.autor = nomeAutor;
    q.perguntas = JSON.stringify(perguntasObj);

    q.inserir(conexao);

    res.redirect('/questoes')
})

app.get('/listarQuizes', (req, res) => {
    const q = new Questionario();

    q.listar(conexao, (result) => {
        res.render('criarJogos/listarQuizes', {quizes: result})
    })
})

app.get('/editarQuiz/:quizId', (req, res) => {
    const q = new Questionario();

    q.getQuiz(conexao, req.params.quizId, (result) => {
        let quiz = result[0]
        quiz.perguntas = JSON.parse(result[0].perguntas)
        res.render('criarJogos/editarQuiz', {quiz: quiz})
        res.end()
    })
})

app.post('/editarQuiz', (req, res) => {
    let {id, nomeQuestionario, descricao, nomeAutor, respostas, respostasCertas, perguntas} = req.body;

    let q = new Questionario();

    const perguntasObj = {};
    if (!Array.isArray(perguntas)) {
        perguntas = [perguntas];
        respostasCertas = [respostasCertas];
    }

    perguntas.forEach((p, index) => {
        let respostasArray = [];
        for (let x = 0; x < 6; x++) {
            respostasArray.push(respostas[(index * 6) + x]);
        }
        perguntasObj[index] = {
            pergunta: p,
            respostas: respostasArray,
            respostaCerta: respostasCertas[index]
        }
    });

    q.nome = nomeQuestionario;
    q.descricao = descricao;
    q.autor = nomeAutor;
    q.perguntas = JSON.stringify(perguntasObj);

    q.atualizarQuiz(conexao, id, (result) => {
        res.redirect('/listarQuizes');
        res.end();
    });
})

app.post('/removerQuiz/:quizId', (req, res) => {
    let q = new Questionario();

    q.removerQuiz(conexao, req.params.quizId);

    res.end();
})

// --------------------------------------------------------------------------
// FUNÇÕES PONTUAÇÃO

app.post('/inserirPontuacaoQuestionario', (req, res) => {
    const {quizId, pontuacao, total} = req.body

    let p = new Pontuacao();

    if (req.session.loggedin) {

        p.jogoId = quizId;
        p.pontuacao = pontuacao;
        p.total = total;
        p.jogoNome = 'questionario';
        
        p.usuario.getId(conexao, [req.session.email, req.session.nome], (result) => {
            p.usuario.id = result[0].id;
            p.inserir(conexao);
            res.json({pontos: pontuacao, total: total});
            res.end();
        })

    } else {
        res.json({pontos: pontuacao, total: total});
        res.end();
    }
    
})

app.post('/inserirPontuacaoTabuada', (req, res) => {    
    const {pontos, erros, tempo, desafio} = req.body;

    let p = new Pontuacao();
    let t = new Tabuada();

    p.pontuacao = pontos;
    p.erros = erros;
    p.tempo = tempo;
    p.jogoNome = 'tabuada';

    t.desafio = desafio;

    if (req.session.loggedin && pontos > 0) {
        p.usuario.getId(conexao, [req.session.email, req.session.nome], (userId) => {
            p.usuario.id = userId[0].id;
            t.getId(conexao, (jogoId) => {
                p.jogoId = jogoId[0].id;
                p.inserir(conexao);
                res.end();
            })
        })
    } else {
        res.end();
    }
})

app.post('/inserirPontuacaoSimples', (req, res) => {
    const {jogo, pontuacao, tempo, erros, total} = req.body;

    let p = new Pontuacao();

    if (req.session.loggedin && pontuacao > 0) {
        p.usuario.getId(conexao, [req.session.email, req.session.nome], (userId) => {    
            p.usuario.id = userId[0].id;
            p.jogoNome = jogo;
            p.tempo = tempo;
            p.erros = erros;
            p.total = total;
            p.jogoId = 1;
            p.pontuacao = pontuacao;
            p.inserir(conexao);
            res.end();
        })
    } else {
        res.end();
    }

})

app.post('/inserirPontuacaoNonogram', (req, res) => {
    const {vitorias, erros, modo} = req.body;

    let p = new Pontuacao();
    let n = new Nonogram();

    n.nome = modo

    if (req.session.loggedin) {
        n.getId(conexao, (nonogramId) => {
            p.usuario.getId(conexao, [req.session.email, req.session.nome], (userId) => {
                p.jogoNome = 'nonogram';
                p.jogoId = nonogramId[0].id;
                p.usuario.id = userId[0].id;
                p.pontuacao = vitorias;
                p.erros = erros;
                p.inserir(conexao)
                res.end()
            })
        })
    } else {
        res.end()
    }
});

app.get('/rank-questionario/:quizId', (req, res) => {   
    let p = new Pontuacao();
    let q = new Questionario();

    const quizId = req.params.quizId;

    q.getQuiz(conexao, quizId, (quiz) => {
        p.usuario.listar(conexao, (usuarios) => {
            p.getPontuacaoDoQuiz(conexao, quizId, (pontuacoes) => {
                res.render('ranks/questionarios', {pontuacoes, usuarios, quiz},);
            });
        });
    })
})

app.get('/ranks/tabuada', (req, res) => {

    let p = new Pontuacao();
    let t = new Tabuada();
    t.listar(conexao, (tabuadas) => {
        p.getPontuacaoTabuada(conexao, (pontuacoes) => {
            res.render('ranks/tabuada', {tabuadas, pontuacoes})
        });
    })
    
})

app.get('/ranks/nonogram', (req, res) => {

    let p = new Pontuacao();
    let n = new Nonogram();

    p.jogoNome = 'nonogram'

    n.listar(conexao, (nonograms) => {
        p.usuario.listar(conexao, (usuarios) => {
            p.getPontuacaoDoJogo(conexao, (pontuacoes) => {
                pontuacoes.sort(function(a, b) {
                    let keyA = parseInt(a.pontuacao);
                    let keyB = parseInt(b.pontuacao);
                    if (keyA > keyB) return -1;
                    if (keyA < keyB) return 1;
                    return 0;
                  });
                res.render('ranks/nonogram', {pontuacoes, nonograms, usuarios});
            })
        })        
    })
})

// --------------------------------------------------------------------------
// FUNÇÕES MULTER

const upload = multer({
    dest: __dirname + '/upload'
})

app.post('/saveImage', upload.single('inputTest'), (req, res) => {
    if (req.file) {
        if (/(jpg|png|JPG|PNG|JPEG|jpeg)$/.test(req.file.originalname)) {
            fs.readFile(req.file.path, function (err, data) {
                if (err) throw err;
                fs.writeFile(__dirname + '/upload/' + req.file.originalname, data, function (err) {
                    if (err) throw err;
                });
            });
        };
        fs.unlink(req.file.path, (err) => {
            if (err) throw err;
        });
    };
    res.redirect('/test');
});

// --------------------------------------------------------------------------
// FUNÇÕES COMBINAÇÃO

app.get('/combinar', (req, res) => {
    let c = new Combinar();

    c.listar(conexao, (result) => {
        res.render('jogos/combinar', {combinacoes: result})
    });
});

app.get('/combinar/:combId', (req, res) => {
    let c = new Combinar();

    c.getById(conexao, req.params.combId, (result) => {
        res.render('jogos/combinar/combinar', {combinacoes: result});
    });
})

app.get('/criarCombinacao', (req, res) => {
    res.render('criarJogos/criarCombinacao');
});

app.post('/criarCombinacao', (req, res) => {
    const {nomeCombinacao, nomeAutor, descricao, perguntas, respostas} = req.body;

    let c = new Combinar();

    c.autor = nomeAutor;
    c.descricao = descricao;
    c.nome = nomeCombinacao;

    const data = []

    if (!Array.isArray(perguntas)) {
        let d = {
            pergunta: perguntas,
            resposta: respostas
        };
        data.push(d)
    } else {
        perguntas.forEach((p, i) => {
            let d = {
                pergunta: p,
                resposta: respostas[i]
            };
            data.push(d)
        })
    }

    c.perguntas = JSON.stringify(data);

    c.inserir(conexao);

    res.redirect('/combinar')
})

app.get('/getCombinacao/:id', (req, res) => {
    const {id} = req.params;
    let c = new Combinar();

    c.getById(conexao, id, (result) => {
        res.json(result)
    });
    
})

app.get('/listarCombinacoes', (req, res) => {
    let c = new Combinar();

    c.listar(conexao, (combinacoes) => {
        res.render('criarJogos/listarCombinacao', {combinacoes})
    })
})

app.get('/editarCombinacao/:id', (req, res) => {
    const {id} = req.params;

    let c = new Combinar();

    c.getById(conexao, id, (result) => {
        const combinacoes = result[0];
        combinacoes.perguntas = JSON.parse(combinacoes.perguntas);
        res.render('criarJogos/editarCombinacao', {combinacoes});
    })
})

app.post('/editarCombinacao', (req, res) => {
    const {id, nomeCombinacao, nomeAutor, descricao, perguntas, respostas} = req.body;

    let c = new Combinar();

    c.autor = nomeAutor;
    c.descricao = descricao;
    c.nome = nomeCombinacao;

    const data = [];

    if (!Array.isArray(perguntas)) {
        let d = {
            pergunta: perguntas,
            resposta: respostas
        };
        data.push(d);
    } else {
        perguntas.forEach((p, i) => {
            let d = {
                pergunta: p,
                resposta: respostas[i]
            };
            data.push(d);
        });
    };

    c.perguntas = JSON.stringify(data);

    c.atualizar(conexao, id, () => {
        res.redirect('/listarCombinacoes');
    });
})

app.post('/removerCombinacao/:id', (req, res) => {
    const {id} = req.params;
    let c = new Combinar();
    c.remover(conexao, id);
})

// --------------------------------------------------------------------------
// FUNÇÕES DE REDIRECIONAMENTO DO SERVIDOR

// FUNÇÃO ESPECIFICA PARA A MARATONA DE 2023
app.get('/maratona', (req, res) => {
    const p = new Pontuacao();
    const t = new Tabuada();
    const q = new Questionario();

    t.listar(conexao, (tabuadas) => {
        q.listar(conexao, (questionarios) => {
            p.listarMaratona(conexao, (result) => {
                res.render('maratona', {data: result, tabuadas, questionarios});
            });
        });
    });    
});

// LISTA COM OS LINKS PARA AS PÁGINAS
const paginasSite = [
    {href: '', objeto: {jogos}, file: 'home.ejs'},
    {href: 'login', objeto: {errormessage: '', successmessage: ''}},
    {href: 'cadastro', objeto: {errormessage: '', successmessage: ''}},
    {href: 'placeholder'},
    {href: 'horarios'},
    {href: 'sobre'},
    {href: 'rank'},
    {href: 'brick-breaker', jogo: true},
    {href: 'setGame', jogo: true},
    {href: 'maior-e-menor', jogo: true, folder: 'maioresmenores', jogos: ['mm1', 'mm2', 'mm3', 'mm4', 'mm5', 'mm6', 'mm7']},
    {href: '2048', jogo: true},
    {href: 'memoria', jogo: true, folder: 'memorias', jogos: ['memoria1']},
    {href: 'genius', jogo: true},
    {href: 'snake', jogo: true},
    {href: 'hanoi', jogo: true},
    {href: 'hanoi2', jogo: true},
    {href: 'operacao', jogo: true},
    {href: 'tabuada', jogo: true},
    {href: 'velha', jogo: true},
    {href: 'muleta', jogo: true},
    {href: 'damas', jogo: true},
    {href: 'pokemon', jogo: true},
    {href: 'caixas', jogo: true, folder: 'caixas', jogos: ['caixa1']},
    {href: 'nonogram', jogo: true},
    {href: 'tangram', jogo: true},
    {href: 'muleta', jogo: true},
    {href: 'tetris', jogo: true},
    {href: 'combinar', jogo: true},
    {href: 'frascos', jogo: true},
    {href: 'fracoes', jogo: true, folder: 'fracoes', jogos: ['descubra-fracoes', 'calcule-fracoes', 'calcule-fracoes-2', 'descubra-fracoes-2']},
    {href: 'notacao-cientifica', jogo: true, folder: 'notacao', jogos: ['descubra-notacao']},
    {href: 'luzes', jogo: true},
    {href: 'encanador', jogo: true},
    {href: 'vitral', jogo: true},
    {href: 'analise-combinatoria', jogo: true, folder: 'analisecombinatoria', jogos: ['anagramas-palavras', 'anagramas-palavras-2', 'contagem-roupas']},
]

// LOOP QUE GERA OS LINKS AUTOMATICAMENTE
for (const page of paginasSite) {
    app.get('/' + page.href, (req, res) => {

        if (page.file) {
            res.render(page.file, page.objeto);
        } else if (page.jogo) {
            res.render('jogos/' + page.href, page.objeto);
        } else {
            res.render(page.href, page.objeto);
        };

        if (page.jogos) {
            for (const j of page.jogos) {
                app.get('/' + j, (req, res) => {
                    res.render('jogos/' + page.folder + '/' + j);
                });
            };
        }        
    });
};

const paginasCriar = {'criarJogos': ['criarCaixa', 'criarQuiz']}
for (const page in paginasCriar) {
    paginasCriar[page].forEach(p => {
        app.get('/' + p, (req, res) => {
            res.render(page + '/' + p);
        });
    });
};

// LOOP PARA AS PÁGINAS QUE CONTÊM RANK
for (const jogo in jogos) {
    if (jogos[jogo].rank) {
        app.get('/ranks/' + jogos[jogo].href, (req, res) => {
    
            let p = new Pontuacao();
        
            p.jogoNome = jogos[jogo].nome;
        
            p.usuario.listar(conexao, (usuarios) => {
                p.getPontuacaoDoJogo(conexao, (pontuacoes) => {
                    res.render('ranks/' + jogos[jogo].href, {usuarios, pontuacoes});
                });
            });
        });
    };
};

app.get('/criarJogos', (req, res) => {
    let message;

    if (req.session.loggedin && req.session.permissao == 'admin') {
        message = 'editando';
    } else {
        message = '';
    };

    res.render('criarJogos/criarJogos', {message: message});
});

/*
const perguntasJSON = require('./scripts/quizes.json')
for (const pergunta in perguntasJSON){
    const perguntaAtual = perguntasJSON[pergunta]
    conexao.query('insert into quizes (pergunta, resposta1, resposta2, resposta3, resposta4, resposta_certa, imagem) values (?, ?, ?, ?, ?, ?, ?)', [
        perguntaAtual.pergunta, perguntaAtual.respostas[0], perguntaAtual.respostas[1], perguntaAtual.respostas[2], perguntaAtual.respostas[3], perguntaAtual.respostaCerta, perguntaAtual.imagem
    ], (err, result) => {
        if (err) throw err;
    })   
}
*/

