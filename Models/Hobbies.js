const mongoose = require('mongoose');
const hobbiesSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    }
});
module.exports = Hobbie = mongoose.model('hobbie', hobbiesSchema );