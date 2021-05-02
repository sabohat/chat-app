const mongoose = require('mongoose')

async function client () {
    let server = await mongoose.connect(`mongodb://localhost/chat-app`, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return server
}


module.exports = client
