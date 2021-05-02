const { Schema, model } = require('mongoose')
const client = require('../modules/mongo')

const UserSchema = new Schema({
    name: {
        type: String, 
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true,
        
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
})

async function UserModel () {
     let db = await client()
     return await db.model('users', UserSchema)
}


async function addUser(name, email, password){
    let db = await UserModel()
    return await db.create({ name, email, password})
}

async function findUser(email){
    let db = await UserModel()
    return await db.findOne({ email: email })
}

// async function setName(email, name) {
//     let db = await UserModel()
//     return await db.updateOne({ email }, { name })
// }

module.exports = {
    addUser,
    findUser
}