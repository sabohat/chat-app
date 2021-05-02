const { checkToken } = require("../modules/jwt");
const { findUser } = require('../models/UserModel')

module.exports = async function AuthMiddleware (req, res, next) {
    try {
        const user = checkToken(req?.cookies?.token)
        
        if(user){
            req.user = user
        }
    }
    catch (e){
        return false
    }
    finally {
        next()
    }
}