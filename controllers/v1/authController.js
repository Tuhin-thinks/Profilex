const passport = require('passport');

const authGoogle = passport.authenticate('google', {
    scope: ['profile', 'email'],
});

GOOGLE_AUTH_SUCCESS_MESSAGE = 'Google authentication successful';
GOOGLE_AUTH_FAILURE_MESSAGE = 'Google authentication failed';

const authGoogleCallback = passport.authenticate('google', {
    failureRedirect: '/api/v1/auth/google/failure',
    successRedirect: '/api/v1/auth/google/success',
});

const authGoogleSuccess = (req, res) => {
    // get the user from req.user
    const { user } = req;
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

module.exports = {
    authGoogle,
    authGoogleCallback,
    authGoogleSuccess,
    authGoogleFailure,
};
