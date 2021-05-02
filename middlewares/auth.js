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
        console.log("Error in authMiddleware: ",e);
    }
    finally {
        next()
    }
}