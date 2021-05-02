const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('home', {
        page_name: 'home', 
        user: req.user
    })
})

module.exports = {
    path: '/', 
    router
}