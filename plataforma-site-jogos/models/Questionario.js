module.exports = class Questionario {
    constructor () {
        this.nome = ''
        this.autor = ''
        this.descricao = ''
        this.perguntas = {}
    }

    inserir(conexao) {
        conexao.query('insert into questionarios (nome_questionario, descricao, autor, perguntas) values (?, ?, ?, ?)', [this.nome, this.descricao, this.autor, [this.perguntas]], (err) => {
            if (err) throw err;            
        })
    }


    listar(conexao, callback) {
        conexao.query('select * from questionarios', (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    getQuiz(conexao, index, callback) {
        conexao.query('select * from questionarios where id = ?', [index], (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    atualizarQuiz(conexao, index, callback) {
        conexao.query('UPDATE questionarios SET nome_questionario = ?, descricao = ?, autor = ?, perguntas = ? WHERE id = ?', [this.nome, this.descricao, this.autor, this.perguntas, index], (err, result) => {
            if (err) throw err;
            return callback(result)
        })
    }

    removerQuiz(conexao, index) {
        conexao.query('DELETE FROM questionarios WHERE id = ?', [index], (err) => {
            if (err) throw err;
        })
    }

}