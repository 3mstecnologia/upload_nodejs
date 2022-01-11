const express = require("express");
var cors = require("cors");
const routes = require("./routes");

const https = require("https");

//var cors = require("cors");

const app = express();

app.all("*", function (req, res, next) {
  console.log("req.headers", req.headers);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "false");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With",
    "Content - Type, Access - Control - Request - Method, Access - Control - Request - Headers"
  );
  next();
});
app.use(cors());

app.use(express.json());
app.use(routes);

const httpsServer = https.createServer({}, app);
httpsServer.listen(3002, () => {
  console.log("HTTPS Server running on port 3002");
});

app.listen(3001, () => {
  console.log("HTTPS Server running on port 3001");
});

module.exports = app;
