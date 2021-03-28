const mongoose = require('mongoose');
const userSchema = new mongoose({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
      type: Date,
      default: Date.now  
    }
});
module.exports = User = mongoose.Schema('user', userSchema);