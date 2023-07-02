const express = require('express');
const router = express.Router();

const authRouter = require('./authRouter');
const resumeRouter = require('./resumeAnalyzeRouter');

// create a default route
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API' });
});

router.use('/auth', authRouter);
router.use('/resume', resumeRouter);

module.exports = router;
