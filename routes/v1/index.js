const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');

router.use('/', (req, res) => {
    res.status(200).json({ message: 'Connected to API!' });
});

router.use('/users', userRouter);

module.exports = router;
