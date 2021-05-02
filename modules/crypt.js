const bcrypt = require('bcrypt')

function generateHash(data){
    let salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(data, salt)
}


function confirmHash(data, hash) {
    try {
        return bcrypt.compare(data, hash)
    }
    catch (e){
        return false
    }
    
}

module.exports = {
    generateHash,
    confirmHash
}