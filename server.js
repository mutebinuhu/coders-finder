const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())
const connectDB = require('./config/db');
connectDB();
app.use(express.json({ extended: false}))
app.use('/api/users', require('./Routes/api/users'));
app.use('/api/posts', require('./Routes/api/posts'));
app.use('/api/profile', require('./Routes/api/profile'));
app.use('/api/auth', require('./Routes/api/auth'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
   console.log(`App runs on port ${PORT}`)
})