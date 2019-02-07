const express = require('express')
const cors = require('cors')
const clarifai = require('./controllers/clarifai')
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

app.post('/register', (req, res)=>{
    const { username, email, password } = req.body
    const hash = bcrypt.hashSync(password, 15);
    db.transaction(trx => {
        trx('users').insert({
            email: email,
            username: username
        })
        .then( () => {
            return trx('login').insert({
                password: hash,
                email: trx('users').select('email').where({email: email})
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
})

app.listen(3030)