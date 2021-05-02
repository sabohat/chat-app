const { fileLoader } = require('ejs')
const express = require('express')
app = express()
// const generateID = require('./modules/uuid')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const PORT = process.env.PORT

const AuthMiddleware = require('./middlewares/auth')
const cookieParser = require('cookie-parser')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(cookieParser())
app.use(AuthMiddleware)
/* Routes */

const RoutesPath = path.join(__dirname, "routes")

fs.readdir(RoutesPath, (err, files) => {
    for(let file of files){
        const filePath = path.join(__dirname, 'routes', file)
        const route = require(filePath)
        if(route.path && route.router){
            app.use(route.path, route.router)
        }
    }
})

app.listen(PORT, ()=>{console.log('starting on port ', PORT)})

  