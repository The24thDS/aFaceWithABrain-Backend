const username = (username) => {
    const regex = new RegExp(/^[a-zA-Z0-9]{5,254}$/)
    return regex.text(username)
}
const email = (email) => {
    const regex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/)
    return regex.test(email)
}
const password = (password) => { // eg: testPassword.1
    const regex = new RegExp(/^(?=.*\d)(?=.*[.,<>?'"[\]{}`~!@#$%^&*()\-+_/\\])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,35}$$/) 
    return regex.test(password)
}

module.exports = {
    username,
    email,
    password
}