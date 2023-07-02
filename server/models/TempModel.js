const mongoose = require('mongoose');
const TempFileSchema = require('../schemas/TempSchemas');

const TempFileModel = mongoose.model('TempFile', TempFileSchema.TempFileSchema); // Registering the TempFileSchema with mongoose

module.exports = {
    TempFileModel,
};
