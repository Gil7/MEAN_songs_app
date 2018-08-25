const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const users_router = require('./api/routes/users')
const artists_router = require('./api/routes/artist')
const albums_router = require('./api/routes/album')
const songs_router = require('./api/routes/song')
//body parser config

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false, parameterLimit: 10000 }));

app.use('/uploads/users', express.static('uploads/users'))

//headers configuration
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use('/api/users', users_router)
app.use('/api/artists', artists_router)
app.use('/api/albums', albums_router)
app.use('/api/songs', songs_router)
module.exports = app