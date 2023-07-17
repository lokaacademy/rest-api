const express = require('express')
const body_parser = require('body-parser')

const app = express()
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))

const fs = require('fs')

const routes = require('./routes/route.js')(app, fs)

app.listen(3000, () => {
    console.log(`REST API is listening on port 3000`);
})

/*
    desain rest api :
    GET : /users - menampilkan list users
    POST : /user - menambah user baru (Postman)
    data / payload : 
    {
        "name": "nama",
        "password": "password1",
        "profession": "profession",
        "id": id
    }
*/

