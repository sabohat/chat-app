const router = require('express').Router()
const fs = require('fs').promises
const path = require('path')
const fileUpload = require('express-fileupload')


router.get('/', async (req, res) => {
    let photosPath = path.join(__dirname, 'public', 'photos', `photo.jpg`)

    res.render('index', {photo: photosPath})
})
router.post('user/photo', fileUpload(), async (req, res) => {

    if(req?.files?.photo) {
        let extension = req.files.photo.mimetype.split('/')[1]

        let photosPath = path.join(__dirname, 'public', 'photos', `photo.jpg`)

        await fs.writeFile(photosPath, req?.files?.photo?.data, function(err, result) {
            if(err)     ('error', err);
          })
    }

    res.send({
        ok: true 
    })
})  

module.exports = {
    path: '/user', 
    router
}