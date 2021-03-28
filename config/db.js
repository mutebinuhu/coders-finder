const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const connectDB = async () =>{
    try {
        await mongoose.connect(db, { useNewUrlParser: true,  useUnifiedTopology: true,   useCreateIndex: true} )
        console.log('connected to database')
    } catch (error) {
        console.log(console.log(error.message))
    }
}
module.exports = connectDB;