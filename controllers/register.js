
const validateEmail = (email) => {
    const regex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    return regex.test(email)
}

const validatePassword = (password) => {
    const regex = new RegExp(/^(?=.*\d)(?=.*[.,<>?'"[\]{}`~!@#$%^&*()\-+_/\\])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,35}$$/) // eg: testPassword.1
    return regex.test(password)
}

const handleRegister = (req, res, db, bcrypt) => {
    const { username, email, password } = req.body
    if(!validateEmail(email))
    {
        res.status(400).json({
            status: "Error",
            message: "This email is not valid 😫"
        })
        return 1
    }
    if(!validatePassword(password))
    {
        res.status(400).json({
            status: "Error",
            message: "This password is not valid 😫"
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
        .then(()=>{
            res.status(200).json({
                status: "Success",
                message: "You have successfully registered 👍"
            }) //everything was inserted
        })
        .catch(trx.rollback)
    }).catch(err => {
        let msg = ``;
        if(err.constraint === 'users_email_key')
            msg = 'This email is already registered 🤔'
        res.status(400).json({
            status: "Error",
            message: msg
        })
    })
}

module.exports = {
    handleRegister: handleRegister
}