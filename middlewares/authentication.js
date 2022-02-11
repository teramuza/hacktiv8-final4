const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

function authentication(req, res, next) {
    try {
        const token = req.get("token");
        const userDecoded = verifyToken(token);
        User.findOne({
            where: {
                id: userDecoded.id,
                email: userDecoded.email
            }
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    name: "Authentication Error",
                    message: `User with email "${userDecoded.email}" not found in database`
                });
            } else {
                res.locals.user = user;
                return next();
            }
        })
        .catch(err => {
            return res.status(401).json(err);
        })
    } catch (err) {
        return res.status(401).json(err);
    }
}

module.exports = authentication