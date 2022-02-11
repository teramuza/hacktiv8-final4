const bcrypt = require("bcrypt");

function hashPassword(userPassword) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(userPassword, salt);
    return hash;
}

function comparePassword(userPassword, hashedPassword) {
    const compare = bcrypt.compareSync(userPassword, hashedPassword);
    return compare;
}

module.exports = {
    hashPassword,
    comparePassword
}