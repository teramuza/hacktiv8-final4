const jwt = require("jsonwebtoken");
require('dotenv').config();

function generateToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return token;
}

function verifyToken(token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
}

module.exports = {
    generateToken,
    verifyToken
}