const router = require('express').Router()

router.get('/', (req, res) => {
    req.cookies = null
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = {
    path: '/logout',
    router
}