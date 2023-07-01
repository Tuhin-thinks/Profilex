const express = require('express');
const router = express.Router();

const authRouter = require('./authRouter');

// create a default route
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API' });
});

router.use('/auth', authRouter);

module.exports = router;
