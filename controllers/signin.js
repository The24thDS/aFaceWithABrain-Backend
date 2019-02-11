const log = require('./log')
const validation = require('./validation')

const sendInfo = async(db, email, res) =>{
    const queryResult = await db('users').select('username').where({email})
    const {username} = queryResult[0]
    res.status(200).json({
        status: "Success",
        message: "You have successfully logged in 👍",
        response: {
            username
        }
    })
}

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
            sendInfo(db, email, res)
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