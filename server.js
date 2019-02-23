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
  res.header('Access-Control-Allow-Origin', 'https://the24thds.github.io')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', '*')
  // CORS on steroids
  if(req.headers.origin !== 'https://the24thds.github.io') //change this in production to match your origin
    res.status(403).json(`${req.get('host')} is not allowed to access this resource`)
  else
    next()
}

app.get('/', (req, res) => {res.redirect("https://documenter.getpostman.com/view/6749839/S11GQzPj")})
app.use(cors)
app.post('/clarifai', clarifai.handleImage(db))
app.post('/register', register.handleRegister(db, bcrypt))
app.post('/signin', signin.handleLogin(db, bcrypt))
app.get('/entries', async (req, res) => {
    const { email } = req.body
    try {
    const queryResult = await db('users').select('entries').where({email})
    const { entries } = queryResult[0]
    res.status(200).json({
      status: "Success",
      response: {
        entries
      }
    })
  } catch(err) {
    res.status(400).json({
      status: "Error"
    })
  }
})
app.get('/log', (req, res) => {
  if(req.body.email === "davidsima@windowslive.com")
    res.status(200).sendFile('logs/errors.log', {root: __dirname})
  else
  res.status(403).json("not allowed")
})

app.listen(process.env.PORT || 3000)