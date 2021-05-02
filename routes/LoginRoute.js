const router = require('express').Router()
const Joi = require('joi')
const { findUser } = require('../models/UserModel')
const { confirmHash } = require('../modules/crypt')
const { generateToken } = require('../modules/jwt')

const LoginValidation = Joi.object({
    email: Joi.string().min(5).max(50).required().error(new Error('email incorrect')),
    password: Joi.string().min(4).max(40).required().error(new Error('password incorrect'))
})

router.get('/', (req, res) => {
    res.render('login', {page_name: 'login'})
})

// login a user
router.post('/', async(req,res) => {
    try {
        const { email, password } =  await LoginValidation.validateAsync(req.body);
        
        let user = await findUser(email)
        if(!user) throw 'User not found'

        let isValid = await confirmHash(password, user.password)
        if(!isValid) throw 'Password is incorrect'
        
        let token = generateToken({name: user.name, email: email})
        res
            .cookie('token', token)
            .redirect('/')
    }
    catch (e) {
        res.render('login', {
            page_name: 'login',
            error: e + ""
        })
     }
})

module.exports = {
    path: '/login', 
    router
}