const dbmysql = require("../funcoes/database");
const crypto = require("crypto");
const verificaSenha = require("../funcoes/verificaSenha");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    console.log("login", req.body);
    console.log("Corpo CPF - ", req.body.cpf);
    console.log("Corpo - passwd ", req.body.passwordEnviado);

    if (!req.body.cpf || !req.body.passwordEnviado) {
      return res.status(401).send({ error: "Dados insuficientes" });
    }
    var { cpf, passwordEnviado } = req.body;

    var userEnviado = await dbmysql.query(
      `
            SELECT id, cpf, nome, username, categoria, salt FROM Users WHERE cpf = '${cpf}'
            `,
      { type: dbmysql.QueryTypes.SELECT }
    );
    //console.log(userEnviado[0]);
    if (userEnviado.length > 0) {
      var userEnviado = userEnviado[0];
      var hash = crypto
        .pbkdf2Sync(passwordEnviado, userEnviado.salt, 1000, 64, "sha512")
        .toString("hex");
      console.log(hash);
      var user = await dbmysql.query(
        `
            select * from Users where cpf = '${cpf}' and password = '${hash}'
            `,
        { type: dbmysql.QueryTypes.SELECT }
      );
      console.log("Usuario =", user);
      user = user[0];
      if (hash === user.password) {
        return res.json({
          token: jwt.sign({ user }, "senhadoemajuniplac", { expiresIn: "12h" }),
          user: {
            id: user.id,
            username: user.username,
            categoria: user.categoria,
            nome: user.nome,
          },
        });
      } else {
        return res.status(401).send("Senha incorreta");
      }
    } else {
      return res.status(401).send.jon({ message: "Usuário não encontrado" });
    }
  },

  async repucuperaDadosUsuario(req, res) {
    const userid = req.body.id;
    const users = await dbmysql.query(
      `
      SELECT id, nome, username, categoria, salt FROM Users WHERE id = ${userid}
              `,
      { type: dbmysql.QueryTypes.SELECT }
    );

    return res.json(users);
  },
};
