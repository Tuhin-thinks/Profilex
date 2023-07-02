const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isGuest: {
        type: Boolean,
        required: true,
        default: false,
    },
});

module.exports = {
    UserSchema: userSchema,
};
