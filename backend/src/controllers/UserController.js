const dbmysql = require("../funcoes/database");
const crypto = require("crypto");
const verificaSenha = require("../funcoes/verificaSenha");
//const Users = require("../models/Users");

module.exports = {
  async listaTodosUsuarios(req, res) {
    const users = await dbmysql.query(
      `
              SELECT id, cpf, nome, username, salt FROM Users
              `,
      { type: dbmysql.QueryTypes.SELECT }
    );

    return res.json(users);
  },

  async buscaUsuarioPorId(req, res) {
    const userid = req.body.id;
    const users = await dbmysql.query(
      `
      SELECT id, nome, username, categoria, salt FROM Users WHERE id = ${userid}
              `,
      { type: dbmysql.QueryTypes.SELECT }
    );

    return res.json(users);
  },

  async cadastraUsuario(req, res) {
    var { nome, cpf, username, categoria, password } = req.body;

    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");

    password = hash;

    const datetime = Date.now();

    const user = await dbmysql.query(
      `
        INSERT INTO Users
        (nome, username, password, cpf, salt, categoria, createdAt)
        VALUES('${nome}', '${username}', '${password}', '${cpf}', '${salt}','${categoria}', '${datetime}');
        `,
      { type: dbmysql.QueryTypes.INSERT }
    );

    return res.json({ nome, categoria });
  },

  async verificasenha(req, res) {
    //console.log(req.body)
    var userid = req.body.id;
    var passwordEnviado = req.body.passwordEnviado;

    var user = await dbmysql.query(
      `
        SELECT nome, username, password, categoria, salt FROM Users WHERE id = ${userid}
                `,
      { type: dbmysql.QueryTypes.SELECT }
    );
    user = user[0];
    console.log("dados recuperados: ", user);

    var senhaOK = verificaSenha(user, passwordEnviado);

    return res.json({ senhaOK });
  },
};
