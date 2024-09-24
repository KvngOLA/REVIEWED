const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const { MONGO_URI, MONGO_DB_DEV, NODE_ENV } = process.env


const connectDb = async() => {
    try{
        let dbUrl;
        if(NODE_ENV == "development") {
            dbUrl = MONGO_DB_DEV;
        }else {
            dbUrl = MONGO_URI
        }
        const connect = await mongoose.connect(dbUrl)
        if(connect) {
            console.log(`Connected to DB at ${connect.connection.host}`)
            console.log(`Connected to status: ${connect.connection.readyState}`)
        }
        console.log('Connected to database successfully')
    }catch(err) {
        console.log(err)
    }
}

module.exports = connectDb