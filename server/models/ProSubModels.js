const mongoose = require('mongoose');
const { proSubSchema } = require('../schemas/proSubSchema');

const ProSubModel = mongoose.model('ProSub', proSubSchema); // Registering the proSubSchema with mongoose

module.exports = {
    ProSubModel,
};
