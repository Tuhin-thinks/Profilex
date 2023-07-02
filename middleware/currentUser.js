/**
 * This middleware checks if the user is logged in or not, by using the session object.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const currentUser = (req, res, next) => {
    if (!req.session?.user) {
        return res.status(401).json({ message: 'Unauthorized User Request' });
    }
    req.user = req.session.user;
    next();
};

module.exports = currentUser;
