const jwt = require('jsonwebtoken')
const generateAccessToken = (payload) => {
    const result = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {
            expriresIn: 2700
        }
    )
    return result
}

const generateRefreshToken = (payload) => {
    const result = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {
            expriresIn: 3600
        }
    )
    return result
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}