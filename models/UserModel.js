const mongoose = require('mongoose');

const { UserSchema } = require('../schemas/UserSchema');

mongoose.model('User', UserSchema);

const User = mongoose.model('User');

module.exports = {
    User,
};
