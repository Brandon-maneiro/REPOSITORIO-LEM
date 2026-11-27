const Usuario = require('./Usuario.js');

module.exports = class Pontuacao {
    constructor() {
        this.usuario = new Usuario();
        this.jogoId = 0;
        this.jogoNome = '';
        this.pontuacao = '';
        this.total = '';
        this.tempo = '';  
        this.erros = 0;      
    };

    inserir(conexao) {
        conexao.query('INSERT INTO pontuacao (usuarioId, jogoId, pontuacao, total, tempo, erros, jogoNome) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            this.usuario.id, this.jogoId, this.pontuacao, this.total, this.tempo, this.erros, this.jogoNome
        ], (err) => {
            if (err) throw err;
        });
    };

    listar(conexao, callback) {
        conexao.query('SELECT * FROM pontuacao', (err, result) => {
            if (err) throw err;
            return callback(result);
        });
    };

    listarMaratona(conexao, callback) {
        conexao.query('SELECT * FROM pontuacao, usuario \
                        WHERE pontuacao.usuarioId = usuario.id \
                        AND (pontuacao.jogoNome = "tabuada" OR pontuacao.jogoNome = "questionario" \
                        OR pontuacao.jogoNome = "caixas" OR pontuacao.jogoNome = "maior-menor") \
                        ORDER BY pontuacao.pontuacao * 1 DESC', (err, result) => {

            if (err) throw err;
            return callback(result);
        });
    };

    getPontuacao(conexao, [usuarioId, jogoId, jogoNome], callback) {
        conexao.query('SELECT * FROM pontuacao \
                        WHERE usuarioId = ? AND jogoId = ? AND jogoNome = ?', [usuarioId, jogoId, jogoNome], (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    getPontuacaoDoQuiz(conexao, id, callback) {
        conexao.query('SELECT * FROM pontuacao WHERE jogoId = ? AND jogoNome = ? ORDER BY pontuacao.pontuacao * 1 DESC', [id, 'questionario'], (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    getPontuacaoDoJogo(conexao, callback) {
        conexao.query('SELECT * FROM pontuacao WHERE jogoNome = ? ORDER BY pontuacao.pontuacao * 1 DESC', [this.jogoNome], (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    getPontuacaoTabuada(conexao, callback) {
        conexao.query('SELECT * FROM pontuacao, usuario \
             WHERE pontuacao.jogoNome = "tabuada" \
             AND pontuacao.usuarioId = usuario.id ORDER BY pontuacao.pontuacao * 1 DESC', (err, result) => {
                if (err) throw err;
                return callback(result);
             })
    }
}