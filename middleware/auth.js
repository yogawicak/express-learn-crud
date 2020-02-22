const jwt = require('jsonwebtoken')
const secret = require('../secret')

module.exports = {
    checkToken : (req,res,next) => {
        jwt.sign({
            // id: 
        })
    }
}