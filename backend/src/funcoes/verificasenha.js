const crypto = require("crypto");

const verificaSenha = (user, senhaEnviada) => {
    const inputHash = crypto
    .pbkdf2Sync(senhaEnviada, user.salt, 1000, 64, 'sha512')
    .toString('hex')
    console.log(inputHash)
  const passwordsMatch = user.password === inputHash
  return passwordsMatch
}
  module.exports = verificaSenha