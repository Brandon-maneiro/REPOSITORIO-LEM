module.exports = class Tabuada {
    constructor() {
        this.desafio = ''
    }

    getId(conexao, callback) {
        conexao.query('SELECT id FROM tabuada WHERE desafio = ?', [this.desafio], (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }
    listar(conexao, callback) {
        conexao.query('SELECT * FROM tabuada', (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }
}