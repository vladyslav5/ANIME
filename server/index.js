const express = require('express')
const {json} = require("express");
const app = express()
const cors = require("cors")

const fileUpload =require("express-fileupload")

require('dotenv').config()

const path = require("path")

const PORT = process.env.PORT

const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL

const router = require('./routers/index')

const errorHandler = require("./middleware/ErrorHandingMiddleware")

app.use(cors())
app.use(json())
app.use(express.static(path.resolve(__dirname,"static")))
app.use(fileUpload({}))
app.use(router)
app.get('/', (req, res) => {
    res.json("server working!")
})
app.use(errorHandler)
const Start = async () => {
    await mongoose.connect(DB_URL, {useNewUrlParser: true}).then(() => {
        console.log('MongoDB connected!!');
    }).catch(err => {
        console.log('Failed to connect to MongoDB', err);
    })
    app.listen(PORT, (err) => {
        if (err) console.log(err.message)
        console.log(`Server listening on ${PORT} successfully`);
    })
}

Start()