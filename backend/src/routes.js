const express = require("express");
const verificaToken = require("./funcoes/verificatoken");
const LoginController = require("./controllers/LoginController");
const uploadController = require("./controllers/UploadController");
const UserController = require("./controllers/UserController");
const { router } = require("./server_emaj");
const routes = express.Router();

//const UserController = require('./controllers/UserController');

//routes.get('/users', UserController.index);
//routes.post('/users', UserController.store);
routes.post("/login", LoginController.login);
routes.post("/recuperaUsuario", LoginController.repucuperaDadosUsuario);

routes.get(
  "/user/listatodosusuarios",
  verificaToken,
  UserController.listaTodosUsuarios
);
routes.post("/user/buscausuarioporid", UserController.buscaUsuarioPorId);
routes.post("/user/cadastrausuario", UserController.cadastraUsuario);
routes.post("/user/verificasenha", UserController.verificasenha);

routes.post("/upload", uploadController.single("file"), (req, res) => {
  res.send("File uploaded successfully");
});
module.exports = routes;
