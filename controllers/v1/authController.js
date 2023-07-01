const passport = require('passport');
const { User } = require('../../models/UserModel');

const authGoogle = passport.authenticate('google', {
    scope: ['profile', 'email'],
});

GOOGLE_AUTH_SUCCESS_MESSAGE = 'Google authentication successful';
GOOGLE_AUTH_FAILURE_MESSAGE = 'Google authentication failed';

/**
 * This function is called when the user is redirected back to the application from Google.
 * Typically, this endpoint should be hit when user click on the "Sign in with Google" button.
 */
const authGoogleCallback = passport.authenticate('google', {
    failureRedirect: '/api/v1/auth/google/failure',
    successRedirect: '/api/v1/auth/google/success',
});

/**
 * This function is called when the user is successfully authenticated by Google.
 * @param {Object} req
 * @param {Object} res
 */
const authGoogleSuccess = async (req, res) => {
    // get the user from req.user
    const { user } = req;

    // save the user in the database
    await saveUser(user);

    // create a token
    const token = user.generateAuthToken();
    // set the token in a cookie
    res.cookie('jwt', token, { httpOnly: true });
    // send the user as response
    res.status(200).json({ user, message: GOOGLE_AUTH_SUCCESS_MESSAGE });
};

const authGoogleFailure = (req, res) => {
    console.warn(GOOGLE_AUTH_FAILURE_MESSAGE);
    res.status(401).json({ message: GOOGLE_AUTH_FAILURE_MESSAGE });
};

// ------------------------------ Helper functions ------------------------------
/**
 * Saves the user in the database.
 * @param {Object} user - The user object returned by Google OAuth.
 */
const saveUser = async (user) => {
    const exitingUser = await User.findOne({ email: user.email }); // TODO: check if this works, or findOne supports chaining using .then() or we need .exec().
    if (!exitingUser) {
        // save the user in the database
        const newUser = new User({
            name: user.name,
            email: user.email,
            googleId: user.googleId,
        });
        await newUser.save();

        console.log('New user created: ', newUser); // TODO: remove this once testing is done.
    }
};

module.exports = {
    authGoogle,
    authGoogleCallback,
    authGoogleSuccess,
    authGoogleFailure,
};
