const express = require('express')
const cors = require('cors')
const clarifai = require('./controllers/clarifai')
const register = require('./controllers/register')
const bcrypt = require('bcryptjs')
const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'open',
      database : 'smartbrain'
    }
})

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {res.status(200).sendFile('readme.html', {root: __dirname})})
app.post('/clarifai', clarifai.handleImage)

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.listen(3030)