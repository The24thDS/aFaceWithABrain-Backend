const express = require('express')
const clarifai = require('./controllers/clarifai')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const bcrypt = require('bcryptjs')
const db = require('knex')({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
})

const app = express()

app.use(express.json())

const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://the24thds.github.io/aFaceWithABrain-Frontend/')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', '*')
  // if(req.get('host') !== 'https://the24thds.github.io/aFaceWithABrain-Frontend/')
  //   res.status(403).json(`${req.get('host')} is not allowed`)
  // else
    next()
}

app.use(cors)
app.get('/', (req, res) => {res.status(200).sendFile('readme.html', {root: __dirname})})
app.post('/clarifai', clarifai.handleImage(db))
app.post('/register', register.handleRegister(db, bcrypt))
app.post('/signin', signin.handleLogin(db, bcrypt))
app.post('/entries', async (req, res) => {
    const { email } = req.body
    const queryResult = await db('users').select('entries').where({email})
    const { entries } = queryResult[0]
    res.status(200).json({
      status: "Success",
      response: {
        entries
      }
    })
})
app.get('/log', (req, res) => {res.status(200).sendFile('logs/errors.log', {root: __dirname})})

app.listen(process.env.PORT || 3000)
