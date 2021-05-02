const { verify, sign } = require('jsonwebtoken')
const SECRET_WORD = process.env.SECRET_WORD

function generateToken(data) {
    return sign(data, SECRET_WORD)
}

function checkToken(data) {
    try {
        return verify(data, SECRET_WORD)
    }
    catch (e){
        return false
    }
}

module.exports = {
    generateToken, 
    checkToken
}