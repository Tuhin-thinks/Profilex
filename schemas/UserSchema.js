const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    sub: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    email_verified: {
        type: Boolean,
        required: true,
    },
    given_name: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    locale: {
        type: String,
        required: false,
    },
    picture: {
        type: String,
        required: false,
    },
});

module.exports = {
    UserSchema: userSchema,
};
