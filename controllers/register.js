const log = require('./log')
const validation = require('./validation')

const handleRegister = (db, bcrypt) => (req, res) => {
    const { username, email, password } = req.body
    if(!validation.email(email))
    {
        res.status(400).json({
            status: "Error",
            message: "This email is not valid 😫"
        })
        return 1
    }
    if(!validation.password(password))
    {
        res.status(400).json({
            status: "Error",
            message: "This password is not valid 😫"
        })
        return 1
    }
    if(!validation.username(username))
    {
        res.status(400).json({
            status: "Error",
            message: "This username is not valid 😫"
        })
        return 1
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx('users').insert({
            email: email,
            username: username
        })
        .then( () => {
            return trx('login').insert({
                password: hash,
                email: trx('users').select('email').where({email: email})  // foreign key
            })
        })
        .then(trx.commit)
        .then(()=>{ //everything was inserted
            res.status(200).json({
                status: "Success",
                message: "You have successfully registered 👍"
            }) 
        })
        .catch(trx.rollback)
    }).catch(err => {
        log.logError(__filename, err)
        if(err.constraint === 'users_email_key') {
            res.status(400).json({
                status: "Error",
                message: 'This email is already registered 🤔'
            })
        }
    })
}

module.exports = {
    handleRegister
}