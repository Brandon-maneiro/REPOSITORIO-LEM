module.exports = class Usuario {
    constructor() {
        this.nome = ""
        this.senha = ""
        this.email = ""
        this.permissao = ""
    };

    inserir(conexao) {
        const sql = "insert into usuario (nome, email, senha, permissao) values (?, ?, ?, ?)";
        conexao.query(sql,
            [this.nome, this.email, this.senha, this.permissao],
            function (err, result) {
                if (err) throw err;
            }
        );
    };

    listar(conexao, callback) {
        const sql = "select * from usuario";
        conexao.query(sql,
            function (err, result) {
                if (err) throw err;
                return callback(result);
            }
        );
    };

    listarParaMaratona(conexao, callback) {
        conexao.query('SELECT * FROM usuario, pontuacao \
                        WHERE pontuacao.usuarioId = usuario.id \
                        AND pontuacao.jogoNome = "caixas" \
                        ORDER BY pontuacao.pontuacao * 1 DESC', (err, result) => {
            if (err) throw err;
            return callback(result);
        });
    };

    getUsuario(conexao, id, callback) {
        conexao.query('select * from usuario where id = ?', [id], (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    getLogin(conexao, callback) {
        conexao.query('SELECT * FROM usuario WHERE email = ? AND senha = ?', [this.email, this.senha], (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    getEmail(conexao , callback) {
        conexao.query('SELECT * FROM usuario WHERE email = ?', [this.email], (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    getId(conexao, callback) {
        conexao.query('SELECT id FROM usuario WHERE email = ? AND nome = ?', [this.email, this.nome], (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    setEmail(e){
        this.email = e
    }
    setNome(n){
        this.nome = n
    }
    setSenha(s){
        this.senha = s
    }
}