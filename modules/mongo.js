const mongoose = require('mongoose')
const CONNECTION_STRING = process.env.CONNECTION_STRING
async function client () {
    let server = await mongoose.connect(CONNECTION_STRING, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return server
}


module.exports = client
