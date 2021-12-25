const jwt = require("jsonwebtoken");

function verificaToken(req, res, next) {
  console.log(req.headers);
  const token = req.headers["x-access-token"];
  console.log("TOKE-------", token);
  if (!token) {
    console.log("Não tem token");
    return res.status(401).json({ msg: "Não autorizado  1" });
  }
  try {
    const decoded = jwt.verify(token, "senhadoemajuniplac");
    //console.log("decoded", decoded.user);
    var userdotoken = decoded;
    console.log("Usuario da Soliciação------", userdotoken);
    next();
  } catch (err) {
    console.log("err", err);
    return res.status(401).json({ msg: "Não autorizado 2" });
  }
}
module.exports = verificaToken;
