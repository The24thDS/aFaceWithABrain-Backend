const validation = (input, regex) => regex.test(input)

const username = username => validation(username, new RegExp(/^[a-zA-Z0-9]{5,254}$/))
const email = email => validation(email, new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/))
const password = password => validation(password, new RegExp(/^(?=.*\d)(?=.*[.,<>?'"[\]{}`~!@#$%^&*()\-+_/\\])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,35}$$/)) // eg: testPassword.1


module.exports = {
    username,
    email,
    password
}