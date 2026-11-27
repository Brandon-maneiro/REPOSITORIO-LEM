module.exports = class Combinar {
    constructor () {
        this.nome = ''
        this.autor = ''
        this.descricao = ''
        this.perguntas = {}
    }

    inserir(conexao) {
        conexao.query('INSERT INTO  combinar (nome, descricao, autor, perguntas) VALUES (?, ?, ?, ?)', [this.nome, this.descricao, this.autor, [this.perguntas]], (err) => {
            if (err) throw err;
        })
    }


    listar(conexao, callback) {
        conexao.query('SELECT * FROM combinar', (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    getById(conexao, index, callback) {
        conexao.query('SELECT * FROM combinar WHERE id = ?', [index], (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    atualizar(conexao, index, callback) {
        conexao.query('UPDATE combinar SET nome = ?, descricao = ?, autor = ?, perguntas = ? WHERE id = ?', [this.nome, this.descricao, this.autor, this.perguntas, index], (err, result) => {
            if (err) throw err;
            return callback(result)
        })
    }

    remover(conexao, index) {
        conexao.query('DELETE FROM combinar WHERE id = ?', [index], (err) => {
            if (err) throw err;
        })
    }

}