const router = require('express').Router()
const { setUserPhoto, findUser} = require('../models/UserModel')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const path = require('path')


router.get('/', async(req, res) => {
    let user = await findUser(req?.user?.email)
    res.render('account', {
        page_name: 'account', 
        user: user
    })
})
router.post('/setUserPhoto', fileUpload({size: (1024 * 10) * 1024}), async(req, res) => {
    let user = await findUser(req?.user?.email)
    if(req?.files?.photo) {
        let extension = req.files.photo.mimetype.split('/')[1]

        let photosPath = path.join(__dirname, '..', 'public', 'photos', `${user.id}.jpg`)

        await fs.writeFile(photosPath, req?.files?.photo?.data, function(err, result) {
            if(err) console.log('error', err);
          })
        // console.log( __dirname, photosPath)                                                                                                                                                                                                                                                                                      
        console.log("EXTENSION: ")
    }

    res.send({
        ok: true 
    })
})

module.exports = {
    path: '/account', 
    router
}