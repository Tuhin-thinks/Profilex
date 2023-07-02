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
    if (bearer_token) {
        const decoded = jwt.verify(bearer_token, process.env.JWT_SECRET);
        if (decoded) {
            req.user = decoded;
            return next();
        } else {
            return res
                .status(401)
                .json({ message: 'Unauthorized User Request' });
        }
    }
};

module.exports = currentUser;
