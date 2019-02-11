const log = require('./log')
const Clarifai = require('clarifai')
const app = new Clarifai.App({
    apiKey: '16f06809f7d04ad980c8a0e551499833'
})
const handleImage = db => (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.image
    )
    .then(clarifaiResponse => {
        if(Object.keys(clarifaiResponse.outputs[0].data).length===0)
        {
            res.statusMessage = "The image doesn't contain any faces"
            res.status(400).end()
        }
        else {
            db('users').increment('entries', 1).where({email: req.body.email}).returning('entries').then(data => {
                const entries = data[0]
                res.status(200).json({...clarifaiResponse.outputs[0].data, entries})
            })
            
        }
    })
    .catch(err => {
        log.logError(__filename, err)
        console.log("AI is taking over the world")
    });
}

module.exports = {
    handleImage
}