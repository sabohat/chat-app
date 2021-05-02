const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('account', {
        page_name: 'account', 
        user: req.user
    })
})

module.exports = {
    path: '/account', 
    router
}