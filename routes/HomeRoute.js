const router = require('express').Router()
const { findUser } = require('../models/UserModel')
const { addMessage, showMessages } = require('../models/MessageModel')

router.get('/', async(req, res) => { 
    let messagesArray = await showMessages()
    res.render('home', {
        page_name: 'home', 
        user: req.user, 
        messages: messagesArray
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