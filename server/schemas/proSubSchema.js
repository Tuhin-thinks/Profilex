const mongoose = require('mongoose');

const proSubSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        default: null,
    },
    paymentId: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        required: true,
    },
    paymentPlan: {
        type: String,
        required: true,
    },
    paymentAmount: {
        type: Number,
        required: true,
    },
    paymentCurrency: {
        type: String,
        required: true,
    },
    paymentReceipt: {
        type: String,
        required: true,
    },
});

module.exports = {
    proSubSchema: proSubSchema,
};
