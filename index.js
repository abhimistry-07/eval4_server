const express = require('express');
const connection = require('./db');
const Users = require('./routes/userRoute');
const Posts = require('./routes/postRoute');
const auth = require('./middlewares/auth');
const app = express();
require('dotenv').config();

app.use(express.json());

app.post('/', (req, res) => {
    console.log("Hello");
    // res.send('Hello, world')
})

app.use("/users", Users);
app.use("/posts", auth, Posts);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to db");
    } catch (error) {
        console.log(error);
    }
    console.log(`Listening on ${process.env.port}`)
})

module.exports = app;