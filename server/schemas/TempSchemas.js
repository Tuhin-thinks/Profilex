const mongoose = require('mongoose');

const TempFileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },

    path: {
        type: String,
        required: true,
    },

    size: {
        type: Number,
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = {
    TempFileSchema,
};
