module.exports = class Nonogram{
    constructor() {
        this.nome;
    }
    getId(conexao, callback) {
        conexao.query('SELECT id FROM nonogram WHERE nome = ?', [this.nome], (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }
    listar(conexao, callback) {
        conexao.query('SELECT * FROM nonogram', (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }
}