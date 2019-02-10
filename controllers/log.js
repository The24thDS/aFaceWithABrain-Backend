const fs = require('fs')
const log = fs.createWriteStream("logs/errors.log", {flags:'a'})

const logError = (callingFile, error) => {
    log.write(`In ${callingFile} at ${new Date().toISOString()}: ${error} \n`)
}
module.exports = {
    logError
}