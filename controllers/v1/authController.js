const { User } = require('../../models/UserModel');

const signup = async (req, res) => {
    const { email, email_verified, given_name, name, locale, picture, sub } =
        req.body;
    const user = {
        sub,
        email,
        email_verified,
        given_name,
        name,
        locale,
        picture,
    };
    const result = await saveUser(user);
    // TODO: Check what is inside the result object
    req.session.user = { ...result, _id: undefined, __v: undefined };

    res.status(200).json({
        message: 'User created successfully',
        user: result,
    });
};

const authUser = async (req, res) => {
    const user = req.user; // obtained from middleware
    res.status(200).json({
        message: 'User authenticated successfully',
        user: user,
    });
};
// ------------------------------ Helper functions ------------------------------
/**
 * Saves the user in the database.
 * @param {Object} user - The user object
 */
const saveUser = async (user) => {
    const existingUser = await User.findOne({ email: user.email }); // TODO: check if this works, or findOne supports chaining using .then() or we need .exec().
    if (!existingUser) {
        // save the user in the database
        const newUser = new User(user);
        const result = await newUser.save();

        console.log('New user created: ', newUser); // TODO: remove this once testing is done.

        return result._doc;
    }

    console.log('User already exists: ', existingUser); // TODO: remove this once testing is done.
    return existingUser._doc;
};

module.exports = {
    signup,
    authUser,
};
