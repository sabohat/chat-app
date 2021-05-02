const router = require('express').Router()
const { findUser } = require('../models/UserModel')
const { addMessage } = require('../models/MessageModel')

router.get('/', (req, res) => {
    console.log(Date.now()) 
    res.render('home', {
        page_name: 'home', 
        user: req.user
    })
})

router.post('/send', async(req, res) => {
    const { content } = req.body

    let user = req?.user
    if (!user) throw 'Something went wrong, no user found'

    let message = await addMessage(content, user.name, user.email)

    res.redirect('/')
})

module.exports = {
    path: '/', 
    router
}