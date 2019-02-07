const express = require('express')
const cors = require('cors')
const clarifai = require('./controllers/clarifai')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {res.status(200).sendFile('readme.html', {root: __dirname})})
app.post('/clarifai', clarifai.handleImage)

app.listen(3030)