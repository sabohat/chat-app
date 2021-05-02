const { Schema } = require('mongoose')
const client = require('../modules/mongo')

const MessageSchema = new Schema({
    content: {
        type: String, 
        required: true,
        minLength: 1,
        maxLength: 1000,
        trim: true,
    },
    authorName: {
        type: String,
        required: true
    },
    authorEmail: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

async function MessageModel () {
     let db = await client()
     return await db.model('messages', MessageSchema)
}


async function addMessage(content, authorName, authorEmail){
    let db = await MessageModel()
    return await db.create({ content, authorName, authorEmail})
}

// async function findMessage(content, author){
//     let db = await MessageModel()
//     return await db.find({ content, author})
// }

module.exports = {
    addMessage
}