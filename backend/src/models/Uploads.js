const { Sequelize, DataTypes } = require("sequelize");
const dbmysql = require("../funcoes/database");

const uploads = dbmysql.define(
  "uploads",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_arquivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caminho_arquivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_arquivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tamanho_arquivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_upload: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
//uploads.sync({ force: false });
//uploads.sync({ alter: true });
module.exports = uploads;
