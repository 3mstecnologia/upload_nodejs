var Sequelize = require("sequelize");

const dbmysql = new Sequelize("emaj_teste", "api", "Dunhill20*20!@#UniVMW", {
  host: "api.uniplaclages.edu.br",
  port: 3306,
  dialect: "mysql",
  //operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
dbmysql
  .authenticate()
  .then(() => {
    console.log("conectado ao banco de dados com sucesso");
  })
  .catch((err) => {
    console.error("Nao foi possivel se conectar ao banco de dados", err);
  });
module.exports = dbmysql;
