const jwt = require('jsonwebtoken');

/**
 * This middleware checks if the user is logged in or not, by using the session object.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const currentUser = (req, res, next) => {
    const bearer_token = req.headers.authorization;
    jwt.verify(bearer_token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .json({ message: 'Unauthorized User Request' });
        }
        req.user = decoded;
    });

    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized User Request' });
    }
    next();
};

module.exports = currentUser;
