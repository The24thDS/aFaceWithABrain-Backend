const log = require('./log')
const validation = require('./validation')

const handleLogin = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body
    if(!validation.email(email) || !validation.password(password)){
        res.status(400).json({
            status: "Error",
            message: "🤚 Bad credentials 🛑"
        }) 
    }
    db('login')
    .select('password')
    .where({email})
    .then(array => {
        if(bcrypt.compareSync(password, array[0].password))
            res.status(200).json(json({
                status: "Success",
                message: "You have successfully logged in 👍"
            }))
        else
            res.status(400).json({
                status: "Error",
                message: "🤚 Wrong credentials 🛑"
            }) 
    })
    .catch(err => {
        log.logError(__filename, err)
        console.log("Error: AI is taking over the world")
    })
}

module.exports = {
    handleLogin
}