const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).sendFile('readme.html', {root: __dirname})
})

app.listen(3001)