const router = require('express').Router()
const { generateHash } = require('../modules/crypt')
const { generateToken } = require('../modules/jwt')
const Joi = require('joi')
const { addUser } = require('../models/UserModel')

// Joi validation schema
const schema = Joi.object({
    name: Joi.string().min(4).max(30).trim().required().error(new Error('name incorrect')),
    email: Joi.string().min(5).max(50).required().error(new Error('email incorrect')),
    password: Joi.string().min(4).max(40).required().error(new Error('password incorrect'))
})

router.get('/', (req, res) => {
    res.render('register', {page_name: 'register'})
})

// registering a new user
router.post('/', async (req, res) => {
    try {
        const { name, email, password } =  await schema.validateAsync(req.body);

        let user = await addUser(name, email, generateHash(password))
        
        let token = generateToken({name: name, email: email})
        res
            .cookie('token', token)
            .redirect('/')
    }
    catch (e) {
        if(String(e).includes("duplicate key")){
            e = "Email already exists"
        }
        res.render('register', {
            page_name: 'register',
            error: e + ""
        })
     }

})

module.exports = {
    path: '/register', 
    router
}