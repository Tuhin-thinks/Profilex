const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');

// create a default route
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API' });
});

router.use('/users', userRouter);

module.exports = router;
