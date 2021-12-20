const express = require("express");
const multer = require("multer");
const app = express();
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded successfully");
});
app.get("/", (req, res) => {
  res.send("testando server");
});

app.listen(3000, () => {
  console.log("Servidor Rodando na Porta 3000");
});
